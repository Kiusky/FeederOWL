const REDIRECT_URL = "https://fowl.linkpc.net/";
const LEFT_CLICK_REDIRECT_URL = "https://feederowl.com/01000011%2001001000";
const FALLBACK_URL = "http://fowl.linkpc.net:8000/";
const PRESS_DURATION = 1100;
const START_DELAY = 555;
const FALLBACK_TIMEOUT = 5000; // Reduzido para 5 segundos para mobile

let pressTimer;
let delayTimeout;
const timerDiv = document.querySelector('.scroll-timer');
let currentIframe = null;
let audioElement = document.getElementById('myAudio');

// Verifica se é mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    const warn = document.createElement('div');
    document.body.appendChild(warn);
    setTimeout(() => warn.remove(), 2000);
}, true);

document.addEventListener('keydown', function(e) {
    if (e.shiftKey && e.key === 'F10') {
        e.preventDefault();
    }
});

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
    
    const triggerFallback = () => {
        if (fallbackTriggered) return;
        fallbackTriggered = true;
        
        document.body.removeChild(loader);
        if (iframe.parentNode) {
            document.body.removeChild(iframe);
        }
        
        // Método mais confiável para mobile
        if (isMobile) {
            window.location.replace(FALLBACK_URL);
        } else {
            window.location.href = FALLBACK_URL;
        }
    };
    
    // Timeout reforçado para mobile
    const fallbackTimer = setTimeout(triggerFallback, isMobile ? 3000 : FALLBACK_TIMEOUT);
    
    // Verificação extra para mobile
    const mobileCheckInterval = isMobile ? setInterval(() => {
        try {
            // Tenta acessar o conteúdo do iframe
            if (iframe.contentWindow && iframe.contentWindow.document) {
                if (iframe.contentWindow.document.readyState === 'complete') {
                    iframeLoaded = true;
                    clearInterval(mobileCheckInterval);
                }
            }
        } catch (e) {
            // Bloqueio de cross-origin, consideramos como carregado
            iframeLoaded = true;
            clearInterval(mobileCheckInterval);
        }
    }, 500) : null;
    
    iframe.onload = function() {
        iframeLoaded = true;
        clearTimeout(fallbackTimer);
        if (mobileCheckInterval) clearInterval(mobileCheckInterval);
        
        setTimeout(() => {
            iframe.style.opacity = '1';
            document.body.removeChild(loader);
            
            // Verificação adicional para mobile após carregamento
            if (isMobile) {
                setTimeout(() => {
                    try {
                        if (!iframe.contentWindow || iframe.contentWindow.document.body.innerHTML === '') {
                            triggerFallback();
                        }
                    } catch (e) {
                        // Ignora erros de cross-origin
                    }
                }, 1000);
            }
        }, 300);
    };
    
    iframe.onerror = function() {
        triggerFallback();
    };
    
    // Fallback para bloqueio de iframe em alguns mobile browsers
    setTimeout(() => {
        if (!iframeLoaded && !fallbackTriggered && isMobile) {
            try {
                if (!iframe.contentWindow || iframe.contentWindow.document.body.innerHTML === '') {
                    triggerFallback();
                }
            } catch (e) {
                triggerFallback();
            }
        }
    }, 2000);
    
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

// ... (restante do código permanece igual) ...

// Adicionando verificação de conexão para mobile
if (isMobile) {
    document.addEventListener('offline', () => {
        window.location.href = FALLBACK_URL;
    });
    
    if (!navigator.onLine) {
        window.location.href = FALLBACK_URL;
    }
}
