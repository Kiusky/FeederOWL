const REDIRECT_URL = "http://feederowl.linkpc.net:8000/";
const LEFT_CLICK_REDIRECT_URL = "https://feederowl.com/01000011%2001001000";
const PRESS_DURATION = 2000;
const START_DELAY = 777;

let pressTimer;
let delayTimeout;
const timerDiv = document.querySelector('.scroll-timer');

// ========= [BLOQUEIO DO BOTÃO DIREITO] ========= //
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

// ========= [FUNCIONALIDADES PRINCIPAIS] ========= //

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
                setTimeout(() => window.location.href = redirectUrl, 200);
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

// ========= [ÁUDIO - TOCAR APENAS UMA VEZ EM LOOP] ========= //
function playAudio() {
    const audio = document.getElementById('myAudio');
    if (audio && audio.paused) {
        audio.loop = true;
        audio.play().catch(e => console.log("Autoplay bloqueado:", e));
    }
}

// ========= [EVENTOS DE MOUSE] ========= //
document.body.addEventListener('mousedown', (e) => {
    playAudio();

    if (e.button === 1) { // Scroll
        startTimer(REDIRECT_URL);
    } else if (e.button === 0) { // Esquerdo
        startTimer(LEFT_CLICK_REDIRECT_URL);
    }
});

document.body.addEventListener('mouseup', () => {
    stopTimer();
});

// ========= [EVENTOS TOUCH COM DIFERENCIAÇÃO DE DEDOS] ========= //
document.body.addEventListener('touchstart', (e) => {
    playAudio();

    if (e.touches.length === 1) {
        // Um dedo → botão esquerdo do mouse
        startTimer(LEFT_CLICK_REDIRECT_URL);
    } else if (e.touches.length === 2) {
        // Dois dedos → scroll do mouse
        startTimer(REDIRECT_URL);
    }
});

document.body.addEventListener('touchend', () => {
    stopTimer();
});

// ========= [PROTEÇÕES] ========= //
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

// ========= [INICIALIZAÇÃO] ========= //
window.onload = function() {
    const loader = document.querySelector('.loader');
    if (loader) loader.style.display = 'none';
    const content = document.querySelector('.content');
    if (content) content.style.display = 'block';
    new Image().src = 'https://feederowl.com/img/feederowl/fundo%20windget%20steam.webp';
};

// Widgets
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

// ========= [CSS EXTRA DE PROTEÇÃO] ========= //
const style = document.createElement('style');
style.textContent = `
    body {
        user-select: none;
        -webkit-user-select: none;
    }
`;
document.head.appendChild(style);
