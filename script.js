document.addEventListener('DOMContentLoaded', (event) => {
    let touchStart = 0;
    let touchEnd = 0;
    let touchTimeout;
    let touchMoveThreshold = 20;
    let longPressDuration = 2500;

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    document.body.addEventListener('touchstart', function(event) {
        if (event.touches.length === 2) {
            touchStart = Date.now();
            let touch1 = event.touches[0];
            let touch2 = event.touches[1];
            let initialDistance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
            touchTimeout = setTimeout(function() {
                let touch1 = event.touches[0];
                let touch2 = event.touches[1];
                let currentDistance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
                if (Math.abs(currentDistance - initialDistance) < touchMoveThreshold) {
                    redirectToPage();
                }
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
