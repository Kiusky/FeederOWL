const REDIRECT_URL = "https://fowl.linkpc.net/";
const LEFT_CLICK_REDIRECT_URL = "https://feederowl.com/01000011%2001001000";
const FALLBACK_URL = "http://fowl.linkpc.net:8000/";
const PRESS_DURATION = 1100;
const START_DELAY = 555;
const FALLBACK_TIMEOUT = 10000; // Aumentado para 10 segundos

let pressTimer;
let delayTimeout;
const timerDiv = document.querySelector('.scroll-timer');
let currentIframe = null;
let audioElement = document.getElementById('myAudio');

// ... (mantenha o resto do código existente até a função createIframe)

function createIframe(url) {
    if (audioElement) {
        audioElement.pause();
    }

    if (currentIframe) {
        document.body.removeChild(currentIframe);
    }
    
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
        if (!iframeLoaded && !fallbackTriggered) {
            fallbackTriggered = true;
            document.body.removeChild(loader);
            if (iframe.parentNode) {
                document.body.removeChild(iframe);
            }
            // Verifica se é um dispositivo móvel antes de redirecionar
            if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.location.href = FALLBACK_URL;
            } else {
                window.open(FALLBACK_URL, '_blank');
            }
        }
    }, FALLBACK_TIMEOUT);
    
    // Verificação adicional para dispositivos móveis
    const mobileCheckInterval = setInterval(() => {
        if (!iframeLoaded && !fallbackTriggered && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            try {
                // Tenta acessar o conteúdo do iframe para verificar se carregou
                if (iframe.contentWindow && iframe.contentWindow.document) {
                    if (iframe.contentWindow.document.readyState === 'complete') {
                        iframeLoaded = true;
                        clearTimeout(fallbackTimer);
                        clearInterval(mobileCheckInterval);
                        iframe.style.opacity = '1';
                        document.body.removeChild(loader);
                    }
                }
            } catch (e) {
                // Se houver erro de cross-origin, consideramos que o iframe carregou
                iframeLoaded = true;
                clearTimeout(fallbackTimer);
                clearInterval(mobileCheckInterval);
                iframe.style.opacity = '1';
                document.body.removeChild(loader);
            }
        }
    }, 1000);
    
    iframe.onload = function() {
        iframeLoaded = true;
        clearTimeout(fallbackTimer);
        clearInterval(mobileCheckInterval);
        setTimeout(() => {
            iframe.style.opacity = '1';
            document.body.removeChild(loader);
        }, 300);
    };
    
    iframe.onerror = function() {
        if (!fallbackTriggered) {
            fallbackTriggered = true;
            clearTimeout(fallbackTimer);
            clearInterval(mobileCheckInterval);
            document.body.removeChild(loader);
            if (iframe.parentNode) {
                document.body.removeChild(iframe);
            }
            if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.location.href = FALLBACK_URL;
            } else {
                window.open(FALLBACK_URL, '_blank');
            }
        }
    };
    
    document.body.appendChild(iframe);
    currentIframe = iframe;
    
    window.addEventListener('message', function iframeCloseListener(e) {
        if (e.data === 'closeIframe' && currentIframe) {
            document.body.removeChild(currentIframe);
            currentIframe = null;
            
            if (audioElement) {
                audioElement.play().catch(e => console.log("Autoplay bloqueado:", e));
            }
            
            window.removeEventListener('message', iframeCloseListener);
        }
    });
}

// ... (mantenha o resto do código existente)
