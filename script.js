document.addEventListener('DOMContentLoaded', (event) => {
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });
    document.body.addEventListener('click', function() {
        playAudio();
    });
});

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

function openFloatingWidget() {
    var floatingWidget = document.getElementById("floatingWidget");
    floatingWidget.style.display = "block";
}

function closeFloatingWidget() {
    var floatingWidget = document.getElementById("floatingWidget");
    floatingWidget.style.display = "none";
}
