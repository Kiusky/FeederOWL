const PRESS_DURATION = 1100;
const START_DELAY = 555;
const EMBED_URL = "http://feederowl.linkpc.net:8000/"; // Embed para botão esquerdo + meio
const EMBED_URL_2 = "https://feederowl.com/01000011%2001001000"; // Embed para scroll do mouse
let pressTimer;
let delayTimeout;
let leftButtonPressed = false;
let middleButtonPressed = false;

const timerDiv = document.querySelector('.scroll-timer');

// Função melhorada para criar containers de embed
function createEmbedContainer(id, url) {
    const container = document.createElement('div');
    container.id = `embed-container-${id}`;
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.96);
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
        background: transparent;
        border-radius: 50px;
        overflow: hidden;
        box-shadow: 0 0 30px rgba(0,0,0,0.8);
        pointer-events: auto;
    `;
    
    // Iframe com políticas de segurança
    content.innerHTML = `
        <iframe 
            src="${url}" 
            style="width:100%;height:100%;border:none;"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'FECHAR';
    closeBtn.style.cssText = `
        margin-top: 25px;
        padding: 12px 35px;
        background: linear-gradient(135deg, #ff5555, #ff0000);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        pointer-events: auto;
        transition: all 0.3s;
    `;
    
    // Efeito hover no botão
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'scale(1.05)';
        closeBtn.style.boxShadow = '0 0 15px rgba(255,0,0,0.6)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'scale(1)';
        closeBtn.style.boxShadow = 'none';
    });

    container.appendChild(content);
    container.appendChild(closeBtn);
    document.body.appendChild(container);

    return { container, content, closeBtn };
}

// Criar ambos os embeds com tratamento de erro
const embed1 = createEmbedContainer('1', EMBED_URL);
const embed2 = createEmbedContainer('2', EMBED_URL_2);

// Configurar eventos de fechamento robustos
function setupCloseButton(embedObj, url) {
    embedObj.closeBtn.addEventListener('click', () => {
        const blocker = document.getElementById('embed-blocker');
        if (blocker) blocker.remove();
        
        embedObj.container.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Recarrega o iframe de forma limpa
        embedObj.content.innerHTML = '';
        embedObj.content.innerHTML = `
            <iframe 
                src="${url}" 
                style="width:100%;height:100%;border:none;"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        `;
    });
}

setupCloseButton(embed1, EMBED_URL);
setupCloseButton(embed2, EMBED_URL_2);

// Função de abertura melhorada
function openEmbed(embedObj) {
    // Pausar todas as mídias de forma segura
    try {
        document.querySelectorAll('video, audio').forEach(media => {
            media.pause();
            media.currentTime = 0;
        });
    } catch (e) {
        console.log("Erro ao pausar mídias:", e);
    }
    
    // Criar bloqueador mais eficiente
    if (!document.getElementById('embed-blocker')) {
        const blocker = document.createElement('div');
        blocker.id = 'embed-blocker';
        blocker.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9998;
            background: rgba(0,0,0,0.7);
        `;
        document.body.appendChild(blocker);
        
        blocker.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
        });
    }
    
    // Mostrar embed com transição suave
    embedObj.container.style.opacity = '0';
    embedObj.container.style.display = 'flex';
    setTimeout(() => {
        embedObj.container.style.opacity = '1';
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

// Sistema de temporizador aprimorado
function startScrollTimer(action) {
    clearTimeout(delayTimeout);
    clearInterval(pressTimer);
    
    delayTimeout = setTimeout(() => {
        let startTime = Date.now();
        
        // Resetar e mostrar temporizador
        timerDiv.style.display = 'flex';
        timerDiv.style.opacity = '1';
        timerDiv.textContent = (PRESS_DURATION/1000).toFixed(1);
        timerDiv.style.background = 'rgba(0,0,0,0.8)';
        
        pressTimer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, PRESS_DURATION - elapsed);
            const progress = Math.min(100, (elapsed / PRESS_DURATION) * 100);
            
            timerDiv.textContent = (remaining/1000).toFixed(1);
            timerDiv.style.background = `
                linear-gradient(
                    to right,
                    rgba(0,200,0,0.8) ${progress}%,
                    rgba(0,0,0,0.8) ${progress}%
                )
            `;
            
            if (remaining <= 0) {
                clearInterval(pressTimer);
                timerDiv.textContent = '✓';
                timerDiv.style.background = 'rgba(0,200,0,0.8)';
                
                setTimeout(() => {
                    timerDiv.style.opacity = '0';
                    setTimeout(() => {
                        timerDiv.style.display = 'none';
                    }, 300);
                    
                    if (action === 'embed1') openEmbed(embed1);
                    if (action === 'embed2') openEmbed(embed2);
                }, 200);
            }
        }, 20);
    }, START_DELAY);
}

function stopScrollTimer() {
    clearTimeout(delayTimeout);
    clearInterval(pressTimer);
    
    timerDiv.style.opacity = '0';
    setTimeout(() => {
        timerDiv.style.display = 'none';
    }, 300);
}

// Controles de mouse otimizados
document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0) leftButtonPressed = true;
    if (e.button === 1) middleButtonPressed = true;
    
    if (e.button === 1) {
        if (leftButtonPressed && middleButtonPressed) {
            startScrollTimer('embed1');
        } else {
            startScrollTimer('embed2');
        }
    }
});

document.body.addEventListener('mouseup', (e) => {
    if (e.button === 0) leftButtonPressed = false;
    if (e.button === 1) {
        middleButtonPressed = false;
        stopScrollTimer();
    }
});

// Suporte para dispositivos móveis
let touchStartTime = 0;
let touchCount = 0;

document.body.addEventListener('touchstart', (e) => {
    touchCount = e.touches.length;
    touchStartTime = Date.now();
    
    if (touchCount === 2) {
        e.preventDefault();
        startScrollTimer('embed1'); // Dois dedos para embed1
    } else {
        startScrollTimer('embed2'); // Um dedo para embed2
    }
});

document.body.addEventListener('touchend', () => {
    stopScrollTimer();
    touchCount = 0;
});

document.body.addEventListener('touchmove', (e) => {
    if (touchCount === 1 && e.touches.length === 1) {
        const currentTime = Date.now();
        if (currentTime - touchStartTime < 300) {
            stopScrollTimer();
        }
    }
});

// Proteções e inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Pré-carrega os iframes
    embed1.content.querySelector('iframe').load();
    embed2.content.querySelector('iframe').load();
    
    // Remove o loader
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Mostra o conteúdo principal
    const content = document.querySelector('.content');
    if (content) {
        content.style.opacity = '0';
        content.style.display = 'block';
        setTimeout(() => {
            content.style.opacity = '1';
        }, 50);
    }
});

// Proteção contra DevTools (atualizada)
let devToolsOpened = false;
const devToolsCheck = setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > 150;
    const heightThreshold = window.outerHeight - window.innerHeight > 150;
    
    if ((widthThreshold || heightThreshold) && !devToolsOpened) {
        devToolsOpened = true;
        document.body.innerHTML = `
            <div style="...">
                <!-- Sua mensagem de proteção -->
            </div>
        `;
    } else if (!widthThreshold && !heightThreshold && devToolsOpened) {
        location.reload();
    }
}, 1000);

// Bloqueio de atalhos
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 'i' || e.key === 'I')) {
        e.preventDefault();
    }
    if (e.key === 'F12' || e.key === 'F11' || e.key === 'F10') {
        e.preventDefault();
    }
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Função de áudio com tratamento de erro
function playAudio() {
    const audio = document.getElementById('myAudio');
    if (audio) {
        audio.play().catch(e => {
            console.log("Reprodução de áudio bloqueada:", e);
            // Tenta reproduzir após interação do usuário
            document.body.addEventListener('click', () => {
                audio.play().catch(e => console.log("Tentativa falhou:", e));
            }, { once: true });
        });
    }
}
