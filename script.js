// Configurações
const REDIRECT_URL = "https://feederowl.com/01000011%2001001000";
const EMBED_URL = "http://feederowl.linkpc.net:8000/";
const PRESS_DURATION = 2000;
const START_DELAY = 777;

let pressTimer, delayTimeout;
let leftButtonDown = false, rightButtonDown = false;
let embedContainer = null;

const timerDiv = document.querySelector('.scroll-timer');

const createEmbed = () => {
    if (embedContainer) {
        document.body.removeChild(embedContainer);
    }
    
embedContainer = document.createElement('div');
embedContainer.id = 'embed-overlay';
embedContainer.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
`;
    
    const contentDiv = document.createElement('div');
    contentDiv.style.cssText = `
        position: relative;
        width: 90%;
        height: 90%;
        max-width: 1200px;
    `;
    
const closeBtn = document.createElement('button');
closeBtn.textContent = 'FECHAR';
closeBtn.style.cssText = `
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
    background: red;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 12px;
	font-family: Arial, sans-serif;
	font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
`;
    closeBtn.onclick = closeEmbed;
    
    const iframe = document.createElement('iframe');
    iframe.src = EMBED_URL;
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
    `;
    
    const rightClickBlocker = document.createElement('div');
    rightClickBlocker.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999999;
        pointer-events: none;
    `;
    
    const clickShield = document.createElement('div');
    clickShield.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: default;
    `;
    clickShield.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    
    iframe.addEventListener('load', function() {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                return false;
            });
            
            iframeDoc.addEventListener('keydown', (e) => {
                if (e.key === 'F12' || 
                    (e.ctrlKey && e.shiftKey && e.key === 'I') || 
                    (e.ctrlKey && e.key === 'U')) {
                    e.preventDefault();
                    return false;
                }
            });
        } catch (error) {
            console.log('Não foi possível bloquear menu no iframe:', error);
        }
    });

    rightClickBlocker.appendChild(clickShield);
    contentDiv.appendChild(iframe);
    contentDiv.appendChild(rightClickBlocker);
    contentDiv.appendChild(closeBtn);
    embedContainer.appendChild(contentDiv);
    document.body.appendChild(embedContainer);
    
    // Anima a entrada
    setTimeout(() => {
        embedContainer.style.opacity = '1';
    }, 10);
    
    return embedContainer;
};

const closeEmbed = () => {
    if (embedContainer) {
        embedContainer.style.opacity = '0';
        
        setTimeout(() => {
            if (embedContainer && document.body.contains(embedContainer)) {
                document.body.removeChild(embedContainer);
                embedContainer = null;
            }
        }, 300);
    }
};

const showEmbed = () => {
    createEmbed();
};

const startTimer = (isEmbed) => {
    clearTimeout(delayTimeout);
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
                setTimeout(() => {
                    if (isEmbed) {
                        showEmbed();
                    } else {
                        window.location.href = REDIRECT_URL;
                    }
                    resetTimer();
                }, 200);
            }
        }, 16);
    }, START_DELAY);
};

const resetTimer = () => {
    clearTimeout(delayTimeout);
    clearInterval(pressTimer);
    timerDiv.classList.remove('show', 'active', 'progress', 'loading');
    timerDiv.style.display = 'none';
    leftButtonDown = false;
    rightButtonDown = false;
};

document.addEventListener('mousedown', (e) => {
    try {
        if (e.button === 1) {
            startTimer(false);
        } else if (e.button === 0) {
            leftButtonDown = true;
        } else if (e.button === 2) {
            rightButtonDown = true;
        }
        
        if (leftButtonDown && rightButtonDown) {
            startTimer(true);
        }
    } catch (err) {
        console.error('Erro no mousedown:', err);
    }
});

document.addEventListener('mouseup', (e) => {
    try {
        if ([0, 1, 2].includes(e.button)) {
            resetTimer();
        }
    } catch (err) {
        console.error('Erro no mouseup:', err);
    }
});

document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        return false;
    }
});

window.addEventListener('load', function() {
    try {
        const loader = document.querySelector('.loader');
        const content = document.querySelector('.content');
        
        if (loader) loader.style.display = 'none';
        if (content) content.style.display = 'block';
    } catch (err) {
        console.error('Erro no load:', err);
    }
});
