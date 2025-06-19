const REDIRECT_URL = "https://fowl.linkpc.net/";
const LEFT_CLICK_REDIRECT_URL = "https://feederowl.com/01000011%2001001000";
const FALLBACK_URL = "http://fowl.linkpc.net:8000/";
const PRESS_DURATION = 1100;
const START_DELAY = 555;
const FALLBACK_TIMEOUT = 5000; // 5 segundos para fallback

let pressTimer;
let delayTimeout;
const timerDiv = document.querySelector('.scroll-timer');
let currentIframe = null;
let audioElement = document.getElementById('myAudio');

// Bloqueia menu de contexto e atalhos
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    const warn = document.createElement('div');
    document.body.appendChild(warn);
    setTimeout(() => warn.remove(), 2000);
}, true);

document.addEventListener('keydown', function(e) {
    if (e.shiftKey && e.key === 'F10') e.preventDefault();
    if (e.ctrlKey && e.key.toUpperCase() === 'U') e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'I') e.preventDefault();
    if (e.key === 'F12' || (e.shiftKey && e.key === 'F10')) e.preventDefault();
});

// Função principal para criar iframe
function createIframe(url) {
    if (audioElement) audioElement.pause();
    if (currentIframe) document.body.removeChild(currentIframe);

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    // Verificação especial para mobile na URL principal
    if (isMobile && url === REDIRECT_URL) {
        const testConnection = new Image();
        testConnection.onload = function() {
            createIframeInternal(url); // Site está online, cria iframe
        };
        testConnection.onerror = function() {
            window.location.href = FALLBACK_URL; // Site offline, redireciona
        };
        testConnection.src = REDIRECT_URL + 'favicon.ico?' + Date.now();
        return;
    }

    createIframeInternal(url);
}

// Implementação interna do iframe
function createIframeInternal(url) {
    // Cria loader
    const loader = document.createElement('div');
    loader.className = 'iframe-loader';
    loader.style.position = 'fixed';
    loader.style.top = '84%';
    loader.style.left = '50%';
    loader.style.transform = 'translate(-50%, -50%)';
    loader.style.zIndex = '10000';
    loader.innerHTML = `
        <div class="loader" style="border: 64px solid; 
            border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) 
            rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.5);
            border-radius: 50%; display: inline-block; 
            box-sizing: border-box; animation: animloader 1s linear infinite;">
        </div>
    `;
    document.body.appendChild(loader);

    // Cria iframe
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.zIndex = '9999';
    iframe.style.backgroundColor = 'white';
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity 0.5s ease';
    
    let iframeLoaded = false;
    let fallbackTriggered = false;
    
    const fallbackTimer = setTimeout(() => {
        !iframeLoaded && !fallbackTriggered && triggerFallback();
    }, FALLBACK_TIMEOUT);
    
    iframe.onload = function() {
        iframeLoaded = true;
        clearTimeout(fallbackTimer);
        setTimeout(() => {
            iframe.style.opacity = '1';
            document.body.removeChild(loader);
        }, 300);
    };
    
    iframe.onerror = function() {
        !fallbackTriggered && triggerFallback();
    };
    
    function triggerFallback() {
        fallbackTriggered = true;
        clearTimeout(fallbackTimer);
        document.body.removeChild(loader);
        if (iframe.parentNode) document.body.removeChild(iframe);
        window.location.href = FALLBACK_URL;
    }
    
    document.body.appendChild(iframe);
    currentIframe = iframe;
    
    window.addEventListener('message', function iframeCloseListener(e) {
        if (e.data === 'closeIframe' && currentIframe) {
            document.body.removeChild(currentIframe);
            currentIframe = null;
            audioElement && audioElement.play().catch(e => console.log("Autoplay bloqueado:", e));
            window.removeEventListener('message', iframeCloseListener);
        }
    });
}

// Timer para pressionamento longo
function startTimer(redirectUrl) {
    if (delayTimeout) clearTimeout(delayTimeout);

    delayTimeout = setTimeout(() => {
        let startTime = Date.now();
        timerDiv.style.display = 'flex';
        timerDiv.classList.add('loading');

        setTimeout(() => {
            timerDiv.classList.add('show', 'progress');
            timerDiv.textContent = (PRESS_DURATION / 1000).toFixed(1);
            timerDiv.classList.remove('loading');
        }, 50);

        pressTimer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, PRESS_DURATION - elapsed);
            const progress = (elapsed / PRESS_DURATION) * 100;

            timerDiv.textContent = (remaining / 1000).toFixed(1);
            timerDiv.style.setProperty('--progress', `${progress}%`);

            if (remaining <= 0) {
                clearInterval(pressTimer);
                timerDiv.classList.add('active');
                timerDiv.style.display = 'none';
                timerDiv.classList.remove('show', 'active', 'progress');
                setTimeout(() => createIframe(redirectUrl), 200);
            }
        }, 16);
    }, START_DELAY);
}

function stopTimer() {
    if (delayTimeout) clearTimeout(delayTimeout);
    clearInterval(pressTimer);
    timerDiv.classList.remove('show', 'active', 'progress');
    setTimeout(() => timerDiv.style.display = 'none', 200);
}

function playAudio() {
    if (audioElement && audioElement.paused && !currentIframe) {
        audioElement.loop = true;
        audioElement.play().catch(e => console.log("Autoplay bloqueado:", e));
    }
}

// Event listeners
document.body.addEventListener('mousedown', (e) => {
    playAudio();
    if (e.button === 1) startTimer(REDIRECT_URL);
    else if (e.button === 0) startTimer(LEFT_CLICK_REDIRECT_URL);
});

document.body.addEventListener('mouseup', stopTimer);
document.body.addEventListener('touchstart', (e) => {
    playAudio();
    e.touches.length === 1 ? startTimer(LEFT_CLICK_REDIRECT_URL) : 
    e.touches.length === 2 && startTimer(REDIRECT_URL);
});
document.body.addEventListener('touchend', stopTimer);

// Detecção de DevTools
let devToolsOpened = false;
function checkDevTools() {
    const threshold = 150;
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;

    if ((widthDiff > threshold || heightDiff > threshold) && !devToolsOpened) {
        devToolsOpened = true;
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; text-align: center; font-family: Arial, sans-serif;">
                <div>
                    <h1 style="color: blue; margin: 0; font-size: 80px;">🚧</h1>
                    <p style="color: red; margin: 20px 0 0 0; font-size: 15px; font-weight: bold;">
                        NÃO É PERMITIDO ALTERAÇÕES NA PÁGINA
                    </p>
                    <p style="color: #555; margin: 5px 0 0 0; font-size: 8px; font-family: Arial;">
                        USAR ZOOM NA PAGINA TAMBEM NÃO PERMITIDO !
                    </p>
                </div>
            </div>
        `;
    } else if (widthDiff <= threshold && heightDiff <= threshold && devToolsOpened) {
        devToolsOpened = false;
        location.reload();
    }
}
setInterval(checkDevTools, 1000);

// Inicialização
window.onload = function() {
    const loader = document.querySelector('.loader');
    const content = document.querySelector('.content');

    if (loader) {
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            content && (content.style.display = 'block');
        }, 500);
    } else if (content) {
        content.style.display = 'block';
    }

    new Image().src = 'https://feederowl.com/img/feederowl/fundo%20windget%20steam.webp';
};

// Estilos
const style = document.createElement('style');
style.textContent = `
    @keyframes animloader {
        0% { border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75); }
        33% { border-color: rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35); }
        66% { border-color: rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25); }
        100% { border-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15); }
    }
    body { user-select: none; -webkit-user-select: none; }
    .loader { opacity: 1; transition: opacity 0.5s ease; }
`;
document.head.appendChild(style);
