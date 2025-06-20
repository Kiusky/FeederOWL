const REDIRECT_URL = "https://fowl.linkpc.net/";
const FALLBACK_URL = "http://fowl.linkpc.net:8000/";

let currentIframe = null;
let audioElement = document.getElementById('myAudio');

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
    const FALLBACK_TIMEOUT = 8000;

    const fallbackTimer = setTimeout(() => {
        if (!iframeLoaded) {
            document.body.removeChild(loader);
            if (iframe.parentNode) {
                document.body.removeChild(iframe);
            }
            window.location.href = FALLBACK_URL;
        }
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
        clearTimeout(fallbackTimer);
        document.body.removeChild(loader);
        if (iframe.parentNode) {
            document.body.removeChild(iframe);
        }
        window.location.href = FALLBACK_URL;
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

function playAudio() {
    const audio = document.getElementById('myAudio');
    if (audio && audio.paused && !currentIframe) {
        audio.loop = true;
        audio.play().catch(e => console.log("Autoplay bloqueado:", e));
    }
}

// ✅ Clique com botão direito ativa o iframe
document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // impede o menu do botão direito
    playAudio();
    createIframe(REDIRECT_URL);
});

const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
    @keyframes animloader {
        0% {
            border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75);
        }
        33% {
            border-color: rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35);
        }
        66% {
            border-color: rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25);
        }
        100% {
            border-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15);
        }
    }
`;
document.head.appendChild(loaderStyle);

// Proteção contra DevTools
let devToolsOpened = false;
function checkDevTools() {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    const threshold = 150;

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
                        USAR ZOOM NA PÁGINA TAMBÉM NÃO É PERMITIDO!
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

// Bloqueios de teclado
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key.toUpperCase() === 'U') e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'I') e.preventDefault();
    if (e.key === 'F12' || (e.shiftKey && e.key === 'F10')) e.preventDefault();
});

// Loader da página
window.onload = function() {
    const loader = document.querySelector('.loader');
    const content = document.querySelector('.content');

    if (loader) {
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            if (content) content.style.display = 'block';
        }, 500);
    } else if (content) {
        content.style.display = 'block';
    }

    new Image().src = 'https://feederowl.com/img/feederowl/fundo%20windget%20steam.webp';
};

// Funções dos widgets
function openDiscordWidget() {
    const widget = document.getElementById('discordWidgetContainer');
    if (widget) widget.style.display = 'block';
}
function closeDiscordWidget() {
    const widget = document.getElementById('discordWidgetContainer');
    if (widget) widget.style.display = 'none';
}
function openSteamWidget() {
    const widget = document.getElementById('steam');
    if (widget) widget.style.display = 'block';
}
function closeSteamWidget() {
    const widget = document.getElementById('steam');
    if (widget) widget.style.display = 'none';
}

const style = document.createElement('style');
style.textContent = `
    body {
        user-select: none;
        -webkit-user-select: none;
    }
    .loader {
        opacity: 1;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);
