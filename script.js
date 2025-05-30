const REDIRECT_URL = "https://feederowl.com/01000011%2001001000";
const PRESS_DURATION = 2000;
const START_DELAY = 777;
let pressTimer;
let delayTimeout;

const timerDiv = document.querySelector('.scroll-timer');

function startScrollTimer() {
    if (delayTimeout) clearTimeout(delayTimeout);
    
    delayTimeout = setTimeout(() => {
        let startTime = Date.now();
        
        timerDiv.style.display = 'flex';
        timerDiv.classList.add('loading');
        
        setTimeout(() => {
            timerDiv.classList.add('show', 'progress');
            timerDiv.textContent = (PRESS_DURATION/1000).toFixed(1);
            timerDiv.classList.remove('loading');
        }, 50);
        
        pressTimer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, PRESS_DURATION - elapsed);
            const progress = (elapsed / PRESS_DURATION) * 100;
            
            timerDiv.textContent = (remaining/1000).toFixed(1);
            timerDiv.style.setProperty('--progress', `${progress}%`);
            
            if (remaining <= 0) {
                clearInterval(pressTimer);
                timerDiv.classList.add('active');
                setTimeout(() => window.location.href = REDIRECT_URL, 200);
            }
        }, 16);
    }, START_DELAY);
}

function stopScrollTimer() {
    if (delayTimeout) clearTimeout(delayTimeout);
    clearInterval(pressTimer);
    timerDiv.classList.remove('show', 'active', 'progress');
    setTimeout(() => timerDiv.style.display = 'none', 200);
}

document.body.addEventListener('mousedown', (e) => {
    if (e.button === 1) startScrollTimer();
});

document.body.addEventListener('mouseup', (e) => {
    if (e.button === 1) stopScrollTimer();
});

document.body.addEventListener('touchstart', startScrollTimer);
document.body.addEventListener('touchend', stopScrollTimer);

window.onload = function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    const content = document.querySelector('.content');
    if (content) {
        content.style.display = 'block';
    }
    preloadBackgroundImage();
};

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key.toUpperCase() === 'U') {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'I') {
        e.preventDefault();
        return false;
    }

    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    let scrollStart = 0;
    let scrollEnd = 0;
    let longPressDuration = 4500;

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    document.body.addEventListener('mousedown', function(event) {
        if (event.button === 1) {
            scrollStart = Date.now();
        }
    });

    document.body.addEventListener('mouseup', function(event) {
        if (event.button === 1) {
            scrollEnd = Date.now();
            if (scrollEnd - scrollStart >= longPressDuration) {
                redirectToPage();
            }
        }
    });

    document.body.addEventListener('touchstart', function(event) {
        scrollStart = Date.now();
    });

    document.body.addEventListener('touchend', function(event) {
        scrollEnd = Date.now();
        if (scrollEnd - scrollStart >= longPressDuration) {
            redirectToPage();
        }
    });

    document.body.addEventListener('click', function() {
        playAudio();
    });

    preloadDiscordWidget();
});

let devToolsOpened = false;

function checkDevTools() {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    
    const threshold = 150;
    
    if ((widthDiff > threshold || heightDiff > threshold) && !devToolsOpened) {
        devToolsOpened = true;
        document.body.innerHTML = `
<div style="
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    margin: 0;
    text-align: center;
    font-family: Arial, sans-serif;
">
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

function preloadBackgroundImage() {
    var img = new Image();
    img.src = 'https://feederowl.com/img/feederowl/fundo%20windget%20steam.webp';
}

function preloadDiscordWidget() {
    var img = new Image();
    img.src = 'https://discord.com/widget?id=653379836164702228&theme=dark&' + Date.now();
}

function redirectToPage() {
    window.location.href = 'https://feederowl.com/01000011%2001001000';
}

function playAudio() {
    var audio = document.getElementById('myAudio');
    audio.play();
}

function openDiscordWidget() {
    var widgetContainer = document.getElementById('discordWidgetContainer');
    if (widgetContainer) {
        widgetContainer.style.display = 'block';
    }
}

function closeDiscordWidget() {
    var widgetContainer = document.getElementById('discordWidgetContainer');
    if (widgetContainer) {
        widgetContainer.style.display = 'none';
    }
}

function openSteamWidget() {
    preloadBackgroundImage();
    setTimeout(() => {
        var steamWidget = document.getElementById('steam');
        if (steamWidget) {
            steamWidget.style.display = 'block';
        }
    }, 0);
}

function closeSteamWidget() {
    var steamWidget = document.getElementById('steam');
    if (steamWidget) {
        steamWidget.style.display = 'none';
    }
}
