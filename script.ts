const file_structure: Record<string, string> = {
        "root": "content",
        "chapter": "chap",
        "page": "page",
        "extension": "png"
    };

const number_of_pages: Array<number> = [
        4,
        2
    ];

const scroll_content = document.getElementById("scroll") as HTMLElement;

const chapter = document.getElementById("chapter") as HTMLInputElement;

chapter.value = getStoredChapter().toString();
chapter.addEventListener('input', () => changeChapter());

loadChapter();

function getStoredChapter(): number {
    const chapter = sessionStorage.getItem('chapter');

    if (chapter) {
        return Number(chapter);
    }

    return 1;
}

function changeChapter() {
    const chapter_index = chapter.value;

    if (chapter_index.length == 0) {
        return;
    }

    const value = Number(chapter_index);

    if (value > 2) {
        chapter.value = "2";
        return;
    }

    if (value < 1) {
        chapter.value = "1";
        return;
    }

    removeAllChildNodes(scroll_content);

    sessionStorage.setItem('chapter', chapter.value);

    loadChapter();
}

function loadChapter() {
    const chapter_index = getStoredChapter();

    for (let page_index = 1; page_index <= number_of_pages[chapter_index - 1]; page_index++) {
        const page = document.createElement("img");

        page.src = file_structure.root + "/"
            + file_structure.chapter + chapter_index + "/"
            + file_structure.page
            + page_index + "." + file_structure.extension;

        page.className = "bd_page";

        scroll_content.appendChild(page);
    }
}

function removeAllChildNodes(parent: HTMLElement) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const fullscreenButton = document.getElementById('fullscreen-toggle');

if (fullscreenButton) {
    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
        // If not in fullscreen, request fullscreen for the entire document
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
        });
        } else {
        // If in fullscreen, exit fullscreen
        document.exitFullscreen();
        }
    })
}