document.addEventListener('DOMContentLoaded', (event) => {
    let touchStartCount = 0;
    let touchEndCount = 0;
    let longPressDuration = 1500; // Tempo em milissegundos para considerar um toque longo

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    document.body.addEventListener('touchstart', function(event) {
        touchStartCount += event.touches.length;
        if (touchStartCount === 2) {
            setTimeout(() => {
                if (touchEndCount !== 2) {
                    redirectToPage();
                }
            }, longPressDuration);
        }
    });

    document.body.addEventListener('touchend', function(event) {
        touchEndCount += event.changedTouches.length;
        if (touchEndCount === 2) {
            touchStartCount = 0;
            touchEndCount = 0;
        }
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
