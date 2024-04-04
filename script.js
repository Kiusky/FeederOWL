window.addEventListener('load', (event) => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    const content = document.querySelector('.content');
    if (content) {
        content.style.display = 'block';
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
        if (event.button == 1) {
            scrollStart = Date.now();
        }
    });

    document.body.addEventListener('mouseup', function(event) {
        if (event.button == 1) {
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

    function preloadSteamWidget() {
        var img = new Image();
        img.src = 'https://feederowl.com/01001111%2001010111%2001001100%20=steam-windget.webp' + Date.now();
    }
    preloadSteamWidget();

    var steamLinks = document.querySelectorAll('#steam ul li a');
    steamLinks.forEach(link => {
        link.addEventListener('dragstart', function(event) {
            event.preventDefault();
        });
    });

    function preloadDiscordWidget() {
        var img = new Image();
        img.src = 'https://discord.com/widget?id=653379836164702228&theme=dark' + Date.now();
    }
    preloadDiscordWidget();
});

function redirectToPage() {
    window.location.href = 'https://feederowl.com/jogos';
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
    var steamWidget = document.getElementById('steam');
    if (steamWidget) {
        steamWidget.style.display = 'block';
    }
}

function closeSteamWidget() {
    var steamWidget = document.getElementById('steam');
    if (steamWidget) {
        steamWidget.style.display = 'none';
    }
}
