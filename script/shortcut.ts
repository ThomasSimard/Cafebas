
const chapterInput = document.getElementById("chapter") as HTMLInputElement | null;

window.onkeydown = function(event) {
    switch (event.key) {
        case "ArrowUp":
        case "w":
            chapterInput?.stepUp();
            break;
        case "ArrowDown":
        case "s":
            chapterInput?.stepDown();
            break;
        default:
    }
};
