document.addEventListener('DOMContentLoaded', (event) => {
    let touchStartTime = 0;
    let touchEndTime = 0;
    let touchTimeout;
    let longPressDuration = 2500; // Tempo em milissegundos para considerar um toque longo

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    document.body.addEventListener('touchstart', function(event) {
        if (event.touches.length === 2) {
            touchStartTime = Date.now();
            touchTimeout = setTimeout(function() {
                redirectToPage();
            }, longPressDuration);
        }
    });

    document.body.addEventListener('touchend', function(event) {
        clearTimeout(touchTimeout);
    });

    document.body.addEventListener('touchmove', function(event) {
        clearTimeout(touchTimeout);
    });

    document.body.addEventListener('click', function() {
        playAudio();
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
