const REDIRECT_URL = "https://hơst.feederowl.com"; // <-- SERVIDOR
const LEFT_CLICK_REDIRECT_URL = "https://feederowl.com/01000011%2001001000"; // <-- CANAIS
const COMBINED_CLICK_REDIRECT_URL = "http://host.feederowl.com:8000"; // <-- SERVIDOR EXTRA
const IMAGE_BUTTON_IFRAME_URL = "https://feederowl.com/01000111%20"; // <-- JOGOS
const PRESS_DURATION = 1100;
const START_DELAY = 555;

let pressTimer;
let delayTimeout;
let isLeftMouseDown = false;
let isMiddleMouseDown = false;

const timerDiv = document.querySelector('.scroll-timer');
let currentIframe = null;
let audioElement = document.getElementById('myAudio');

function createImageButton() {
    const button = document.createElement('div');
    button.id = 'image-button';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.left = '20px';
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.zIndex = '9998';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '50%';
    button.style.overflow = 'hidden';
    button.style.transition = 'transform 0.2s, opacity 0.3s';
    
    button.innerHTML = '<img src="img/feederowl/jogos.png" style="width:100%; height:100%; object-fit:cover;">';
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.8)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
    
    button.addEventListener('click', () => {
        createIframe(IMAGE_BUTTON_IFRAME_URL);
    });
    
    document.body.appendChild(button);
}

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
    if (audioElement) audioElement.pause();
    if (currentIframe) document.body.removeChild(currentIframe);

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
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'fullscreen');
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

    iframe.onload = () => {
        setTimeout(() => {
            iframe.style.opacity = '1';
            document.body.removeChild(loader);
            const imageButton = document.getElementById('image-button');
            if (imageButton) imageButton.style.opacity = '0.5';
            showFullscreenButton(iframe);
        }, 300);
    };

    document.body.appendChild(iframe);
    currentIframe = iframe;

    window.addEventListener('message', function iframeCloseListener(e) {
        if (e.data === 'closeIframe' && currentIframe) {
            document.body.removeChild(currentIframe);
            currentIframe = null;
            const imageButton = document.getElementById('image-button');
            if (imageButton) imageButton.style.opacity = '1';
            if (audioElement) audioElement.play().catch(e => console.log("Autoplay bloqueado:", e));
            window.removeEventListener('message', iframeCloseListener);
        }
    });
}

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

function startTimer(redirectUrl, directRedirect = false) {
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

                setTimeout(() => {
                    if (directRedirect) {
                        window.location.href = COMBINED_CLICK_REDIRECT_URL;
                    } else {
                        createIframe(redirectUrl);
                    }
                }, 200);
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
    const audio = document.getElementById('myAudio');
    if (audio && audio.paused && !currentIframe) {
        audio.loop = true;
        audio.play().catch(e => console.log("Autoplay bloqueado:", e));
    }
}

document.body.addEventListener('mousedown', (e) => {
    playAudio();

    if (e.button === 0) isLeftMouseDown = true;
    if (e.button === 1) isMiddleMouseDown = true;

    if (isLeftMouseDown && isMiddleMouseDown) {
        startTimer(null, true);
    } else if (e.button === 1) {
        startTimer(REDIRECT_URL);
    } else if (e.button === 0) {
        startTimer(LEFT_CLICK_REDIRECT_URL);
    }
});

document.body.addEventListener('mouseup', () => {
    isLeftMouseDown = false;
    isMiddleMouseDown = false;
    stopTimer();
});

document.body.addEventListener('touchstart', (e) => {
    playAudio();

    const touchCount = e.touches.length;

    if (touchCount === 1) {
        startTimer(LEFT_CLICK_REDIRECT_URL);
    } else if (touchCount === 2) {
        startTimer(REDIRECT_URL);
    } else if (touchCount === 3) {
        startTimer(null, true);
    }
});

document.body.addEventListener('touchend', () => {
    stopTimer();
});

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

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key.toUpperCase() === 'U') e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'I') e.preventDefault();
    if (e.key === 'F12' || (e.shiftKey && e.key === 'F10')) e.preventDefault();
});

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
    
    createImageButton();
};

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
    /* Estilos do novo botão */
    #image-button {
        transition: opacity 0.3s ease;
    }
    #image-button:hover {
        opacity: 0.9;
    }
    iframe + #image-button {
        opacity: 0.5;
    }
    iframe + #image-button:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);
