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

    var img = new Image();
    img.onload = function() {
        var steamWidget = document.getElementById("steam");
        steamWidget.style.backgroundImage = "url('https://feederowl.com/01001111%2001010111%2001001100%20=steam-windget.webp')";
        steamWidget.style.backgroundSize = "cover";
        steamWidget.style.backgroundPosition = "center";
    };
    img.src = "https://feederowl.com/01001111%2001010111%2001001100%20=steam-windget.webp";

    var steamLinks = document.querySelectorAll('#steam ul li a');
    steamLinks.forEach(link => {
        link.addEventListener('dragstart', function(event) {
            event.preventDefault();
        });
    });
});

function redirectToPage() {
    window.location.href = "https://feederowl.com/jogos";
}

function playAudio() {
    var audio = document.getElementById("myAudio");
    audio.play();
}

function openDiscordWidget() {
    var widgetContainer = document.getElementById("discordWidgetContainer");
    widgetContainer.style.display = "block";
}

function closeDiscordWidget() {
    var widgetContainer = document.getElementById("discordWidgetContainer");
    widgetContainer.style.display = "none";
}

function openSteamWidget() {
    var steamWidget = document.getElementById("steam");
    steamWidget.style.display = "block";
}

function closeSteamWidget() {
    var steamWidget = document.getElementById("steam");
    steamWidget.style.display = "none";
}
