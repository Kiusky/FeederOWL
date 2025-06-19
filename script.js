const REDIRECT_URL = "https://fowl.linkpc.net/";
const LEFT_CLICK_REDIRECT_URL = "https://feederowl.com/01000011%2001001000";
const FALLBACK_URL = "http://fowl.linkpc.net:8000/";
const PRESS_DURATION = 1100;
const START_DELAY = 555;

let pressTimer;
let delayTimeout;
const timerDiv = document.querySelector('.scroll-timer');
let currentIframe = null;
let audioElement = document.getElementById('myAudio');

// Sistema de fallback reforçado
function loadFallback() {
    if (currentIframe && currentIframe.parentNode) {
        document.body.removeChild(currentIframe);
    }
    window.location.href = FALLBACK_URL;
}

function createIframe(url) {
    if (audioElement) {
        audioElement.pause();
    }

    // Remove iframe existente
    if (currentIframe) {
        document.body.removeChild(currentIframe);
    }
    
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
    
    // Configura fallback
    const FALLBACK_TIMEOUT = 4000; // 4 segundos
    let fallbackTriggered = false;
    
    const triggerFallback = () => {
        if (fallbackTriggered) return;
        fallbackTriggered = true;
        loadFallback();
    };
    
    // Timeout principal
    const fallbackTimer = setTimeout(triggerFallback, FALLBACK_TIMEOUT);
    
    // Verificação redundante para mobile
    const mobileCheck = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (mobileCheck) {
        setTimeout(() => {
            try {
                if (!iframe.contentWindow || iframe.contentWindow.document.readyState !== 'complete') {
                    triggerFallback();
                }
            } catch (e) {
                // Se houver erro de cross-origin, consideramos como carregado
            }
        }, 2000);
    }
    
    // Eventos do iframe
    iframe.onload = function() {
        clearTimeout(fallbackTimer);
        setTimeout(() => {
            iframe.style.opacity = '1';
            document.body.removeChild(loader);
            
            // Verificação final após carregamento
            setTimeout(() => {
                try {
                    if (iframe.contentWindow.document.body.children.length === 0) {
                        triggerFallback();
                    }
                } catch (e) {
                    // Ignora erros de cross-origin
                }
            }, 1000);
        }, 300);
    };
    
    iframe.onerror = function() {
        triggerFallback();
    };
    
    document.body.appendChild(iframe);
    currentIframe = iframe;
    
    // Listener para fechar iframe
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

// Adicionando verificação de conexão
if (!navigator.onLine) {
    window.location.href = FALLBACK_URL;
}

window.addEventListener('offline', () => {
    window.location.href = FALLBACK_URL;
});
