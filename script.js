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
    // Bloqueia Ctrl+U (abrir código-fonte)
    if (e.ctrlKey && e.key.toUpperCase() === 'U') {
        e.preventDefault();
        return false;
    }

    // Bloqueia Ctrl+Shift+I (abrir DevTools)
    if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'I') {
        e.preventDefault();
        return false;
    }

    // Bloqueia F12 (abrir DevTools)
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    let scrollStart = 0;
    let scrollEnd = 0;
    let longPressDuration = 3500;

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
        console.log("DevTools detectado? Bloqueando...");
        document.body.innerHTML = '<h1 style="color:red;">Achou que ia ser facil filho da puta ...</h1>';
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
    window.location.href = 'https://feederowl.com/01100011%2001101000%2001100001%2001101110%2001101110%2001100101%2001101100%2001110011';
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
