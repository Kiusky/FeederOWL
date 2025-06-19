const REDIRECT_URL = "https://fowl.linkpc.net/";
const LEFT_CLICK_REDIRECT_URL = "https://feederowl.com/01000011%2001001000";
const FALLBACK_URL = "http://fowl.linkpc.net:8000/";
const PRESS_DURATION = 1100;
const START_DELAY = 555;
const FALLBACK_TIMEOUT = 3000; // 3 seconds for fallback
const CONNECTION_TIMEOUT = 2000; // 2 seconds for connection check

let pressTimer;
let delayTimeout;
const timerDiv = document.querySelector('.scroll-timer');
let currentIframe = null;
let audioElement = document.getElementById('myAudio');

// Block context menu and shortcuts
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    const warn = document.createElement('div');
    document.body.appendChild(warn);
    setTimeout(() => warn.remove(), 2000);
}, true);

document.addEventListener('keydown', function(e) {
    if (e.shiftKey && e.key === 'F10') e.preventDefault();
    if (e.ctrlKey && e.key.toUpperCase() === 'U') e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'I') e.preventDefault();
    if (e.key === 'F12' || (e.shiftKey && e.key === 'F10')) e.preventDefault();
});

// Optimized iframe creation
function createIframe(url) {
    if (audioElement) audioElement.pause();
    if (currentIframe) document.body.removeChild(currentIframe);

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const loader = showLoader();
    
    // Special handling for mobile on main URL
    if (isMobile && url === REDIRECT_URL) {
        checkConnection(url).then(success => {
            if (!success) {
                hideLoader(loader);
                window.location.href = FALLBACK_URL;
                return;
            }
            createIframeInternal(url, loader);
        });
        return;
    }

    createIframeInternal(url, loader);
}

// Connection check with timeout
function checkConnection(url) {
    return new Promise(resolve => {
        const timeout = setTimeout(() => resolve(false), CONNECTION_TIMEOUT);
        
        const testConnection = new Image();
        testConnection.onload = () => {
            clearTimeout(timeout);
            resolve(true);
        };
        testConnection.onerror = () => {
            clearTimeout(timeout);
            resolve(false);
        };
        testConnection.src = `${url}favicon.ico?${Date.now()}`;
    });
}

// Show loading animation
function showLoader() {
    const loader = document.createElement('div');
    loader.className = 'iframe-loader';
    loader.style.cssText = `
        position: fixed;
        top: 84%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    loader.innerHTML = `
        <div class="loader" style="
            border: 64px solid;
            border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) 
            rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.5);
            border-radius: 50%; 
            display: inline-block;
            box-sizing: border-box; 
            animation: animloader 1s linear infinite;
        "></div>
    `;
    document.body.appendChild(loader);
    setTimeout(() => loader.style.opacity = '1', 10);
    return loader;
}

// Hide loading animation
function hideLoader(loader) {
    if (loader && loader.parentNode) {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (loader.parentNode) {
                document.body.removeChild(loader);
            }
        }, 300);
    }
}

// Internal iframe implementation
function createIframeInternal(url, loader) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        z-index: 9999;
        background-color: white;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    let fallbackTriggered = false;
    const fallbackTimer = setTimeout(() => {
        !fallbackTriggered && triggerFallback();
    }, FALLBACK_TIMEOUT);
    
    iframe.onload = function() {
        clearTimeout(fallbackTimer);
        iframe.style.opacity = '1';
        hideLoader(loader);
    };
    
    iframe.onerror = function() {
        !fallbackTriggered && triggerFallback();
    };
    
    function triggerFallback() {
        fallbackTriggered = true;
        clearTimeout(fallbackTimer);
        hideLoader(loader);
        if (iframe.parentNode) document.body.removeChild(iframe);
        window.location.href = FALLBACK_URL;
    }
    
    document.body.appendChild(iframe);
    currentIframe = iframe;
    
    window.addEventListener('message', function iframeCloseListener(e) {
        if (e.data === 'closeIframe' && currentIframe) {
            document.body.removeChild(currentIframe);
            currentIframe = null;
            audioElement && audioElement.play().catch(console.error);
            window.removeEventListener('message', iframeCloseListener);
        }
    });
}

// Long press timer
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
                timerDiv.style.display = 'none';
                timerDiv.classList.remove('show', 'active', 'progress');
                setTimeout(() => createIframe(redirectUrl), 200);
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
    if (audioElement && audioElement.paused && !currentIframe) {
        audioElement.loop = true;
        audioElement.play().catch(e => console.log("Autoplay blocked:", e));
    }
}

// Event listeners
document.body.addEventListener('mousedown', (e) => {
    playAudio();
    if (e.button === 1) startTimer(REDIRECT_URL);
    else if (e.button === 0) startTimer(LEFT_CLICK_REDIRECT_URL);
});

document.body.addEventListener('mouseup', stopTimer);
document.body.addEventListener('touchstart', (e) => {
    playAudio();
    e.touches.length === 1 ? startTimer(LEFT_CLICK_REDIRECT_URL) : 
    e.touches.length === 2 && startTimer(REDIRECT_URL);
});
document.body.addEventListener('touchend', stopTimer);

// DevTools detection
let devToolsOpened = false;
function checkDevTools() {
    const threshold = 150;
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;

    if ((widthDiff > threshold || heightDiff > threshold) && !devToolsOpened) {
        devToolsOpened = true;
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; text-align: center; font-family: Arial, sans-serif;">
                <div>
                    <h1 style="color: blue; margin: 0; font-size: 80px;">🚧</h1>
                    <p style="color: red; margin: 20px 0 0 0; font-size: 15px; font-weight: bold;">
                        PAGE MODIFICATIONS NOT ALLOWED
                    </p>
                    <p style="color: #555; margin: 5px 0 0 0; font-size: 8px; font-family: Arial;">
                        ZOOMING ALSO NOT ALLOWED!
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

// Initialization
window.onload = function() {
    const loader = document.querySelector('.loader');
    const content = document.querySelector('.content');

    if (loader) {
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            content && (content.style.display = 'block');
        }, 500);
    } else if (content) {
        content.style.display = 'block';
    }

    new Image().src = 'https://feederowl.com/img/feederowl/fundo%20windget%20steam.webp';
};

// Styles
const style = document.createElement('style');
style.textContent = `
    @keyframes animloader {
        0% { border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75); }
        33% { border-color: rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35); }
        66% { border-color: rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25); }
        100% { border-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15); }
    }
    body { user-select: none; -webkit-user-select: none; }
    .loader { opacity: 1; transition: opacity 0.5s ease; }
    .iframe-loader { transition: opacity 0.3s ease; }
`;
document.head.appendChild(style);
