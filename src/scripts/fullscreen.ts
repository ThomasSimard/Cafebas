const fullscreen_button = document.getElementById('fullscreen-toggle');

if (fullscreen_button) {
    fullscreen_button.addEventListener('click', updateFullScreen)
}

function updateFullScreen() {
    if (!document.fullscreenElement) {
        // If not in fullscreen, request fullscreen for the entire document
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
        });
    } else {
        // If in fullscreen, exit fullscreen
        document.exitFullscreen();
    }
}