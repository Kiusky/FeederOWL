const REDIRECT_URL = "https://feederowl.com/01000011%2001001000";
const PRESS_DURATION = 1100;
const START_DELAY = 555;
const EMBED_URL = "http://feederowl.linkpc.net:8000/"; // Embed para botão esquerdo + meio
const EMBED_URL_2 = "https://feederowl.com/01000011%2001001000"; // Embed para scroll do mouse (pode ser diferente)
let pressTimer;
let delayTimeout;
let leftButtonPressed = false;
let middleButtonPressed = false;

const timerDiv = document.querySelector('.scroll-timer');

// Criar containers para ambos os embeds
function createEmbedContainer(id, url) {
    const container = document.createElement('div');
    container.id = `embed-container-${id}`;
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        width: 60%;
        height: 80%;
        background: ;
        border-radius: 50px;
        overflow: hidden;
        pointer-events: auto;
    `;
    content.innerHTML = `<iframe src="${url}" style="width:100%;height:100%;border:none;"></iframe>`;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Fechar';
    closeBtn.style.cssText = `
        margin-top: 20px;
        padding: 10px 30px;
        background: #ff5555;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        pointer-events: auto;
    `;

    container.appendChild(content);
    container.appendChild(closeBtn);
    document.body.appendChild(container);

    return { container, content, closeBtn };
}

// Criar ambos os embeds
const embed1 = createEmbedContainer('1', EMBED_URL);
const embed2 = createEmbedContainer('2', EMBED_URL_2);

// Configurar eventos de fechamento
embed1.closeBtn.addEventListener('click', () => closeEmbed(embed1));
embed2.closeBtn.addEventListener('click', () => closeEmbed(embed2));

function openEmbed(embedObj) {
    // Pausar mídias
    document.querySelectorAll('video, audio').forEach(media => media.pause());
    
    // Criar bloqueador
    const blocker = document.createElement('div');
    blocker.id = 'embed-blocker';
    blocker.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9998;
        background: transparent;
    `;
    document.body.appendChild(blocker);
    
    // Bloquear interações fora do embed
    blocker.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
    });
    
    // Mostrar embed
    embedObj.container.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeEmbed(embedObj) {
    // Remover bloqueador
    const blocker = document.getElementById('embed-blocker');
    if (blocker) blocker.remove();
    
    // Esconder embed
    embedObj.container.style.display = 'none';
    document.body.style.overflow = '';
    
    // Resetar iframe
    embedObj.content.innerHTML = '';
    embedObj.content.innerHTML = `<iframe src="${embedObj === embed1 ? EMBED_URL : EMBED_URL_2}" style="width:100%;height:100%;border:none;"></iframe>`;
}

function startScrollTimer(action) {
    if (delayTimeout) clearTimeout(delayTimeout);
    
    delayTimeout = setTimeout(() => {
        let startTime = Date.now();
        
        // Mostrar temporizador
        timerDiv.style.display = 'flex';
        timerDiv.classList.add('loading');
        
        setTimeout(() => {
            timerDiv.classList.add('show', 'progress');
            timerDiv.textContent = (PRESS_DURATION/1000).toFixed(1);
            timerDiv.classList.remove('loading');
        }, 50);
        
        // Atualizar temporizador
        pressTimer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, PRESS_DURATION - elapsed);
            const progress = (elapsed / PRESS_DURATION) * 100;
            
            timerDiv.textContent = (remaining/1000).toFixed(1);
            timerDiv.style.setProperty('--progress', `${progress}%`);
            
            // Ação ao completar
            if (remaining <= 0) {
                clearInterval(pressTimer);
                timerDiv.classList.add('active');
                
                // Esconder temporizador
                setTimeout(() => {
                    timerDiv.classList.remove('show', 'active', 'progress');
                    timerDiv.style.display = 'none';
                }, 200);
                
                // Executar ação
                if (action === 'embed1') {
                    setTimeout(() => openEmbed(embed1), 200);
                } else if (action === 'embed2') {
                    setTimeout(() => openEmbed(embed2), 200);
                }
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

// Eventos de mouse
document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0) leftButtonPressed = true;
    if (e.button === 1) middleButtonPressed = true;
    
    if (e.button === 1) {
        if (leftButtonPressed && middleButtonPressed) {
            startScrollTimer('embed1'); // Abre o primeiro embed
        } else {
            startScrollTimer('embed2'); // Abre o segundo embed (scroll)
        }
    }
});

document.body.addEventListener('mouseup', (e) => {
    if (e.button === 0) leftButtonPressed = false;
    if (e.button === 1) middleButtonPressed = false;
    
    if (e.button === 1) stopScrollTimer();
});

// Restante do código original
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
