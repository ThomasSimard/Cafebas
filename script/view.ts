import statics from "./statics.json" with { type: 'json' };

const chapter_count = statics.number_of_pages.length;

const file_structure: Record<string, string> = {
    "url": "http://localhost:8000/",
    "root": "content",
    "chapter": "chap",
    "pdf": "chap",
    "page": "page",
    "extension": "webp"
};

let controller = new AbortController();
let signal = controller.signal;

let cancellation_promise = new Promise((resolve, reject) => {
  signal.addEventListener('abort', () => {
    reject(new DOMException('Aborted', 'AbortError'));
  }, { once: true });
});

const scroll_content = document.getElementById("scroll") as HTMLElement;

const chapter = document.getElementById("chapter") as HTMLInputElement;
const download = document.getElementById("download");

chapter.value = getStoredChapter().toString();
chapter.addEventListener('input', () => changeChapter());

loadPages(getStoredChapter());

function getStoredChapter(): number {
    const chapter = sessionStorage.getItem('chapter');

    if (chapter) {
        return Number(chapter);
    }

    return 1;
}

function update_download_link(chapter_index: number) {
    const src = "/content/chap" + chapter_index + "/chap" + chapter_index + ".pdf"

    download.setAttribute("href", src);
}

let last_chapter_index = 1;

function changeChapter() {
    const chapter_index = chapter.value;

    if (chapter_index.length == 0) {
        return;
    }

    const value = Number(chapter_index);

    if (value == last_chapter_index) return;

    last_chapter_index = value;
    update_download_link(value);

    if (value > chapter_count) {
        chapter.value = chapter_count.toString();
        return;
    }

    if (value < 1) {
        chapter.value = "1";
        return;
    }

    controller.abort();

    controller = new AbortController();
    signal = controller.signal;

    cancellation_promise = new Promise((resolve, reject) => {
        signal.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'));
        }, { once: true });
    });

    removeAllChildNodes(scroll_content);

    sessionStorage.setItem('chapter', chapter.value);

    loadPages(value);
}

async function loadPages(chapter_index: number, page_index: number = 1): Promise<number> {
    if (page_index > statics.number_of_pages[chapter_index-1]) {
        return;
    }

    const page = document.createElement("img");

    const src = file_structure.root + "/"
        + file_structure.chapter + chapter_index + "/"
        + file_structure.page
        + page_index + "." + file_structure.extension;

    page.src = src;

    const decode_promise = page.decode();

    Promise.race([decode_promise, cancellation_promise])
    .then(() => {
        page.className = "bd_page";

        scroll_content.appendChild(page);

        loadPages(chapter_index, page_index + 1);
    }).catch((error) => {
        page.remove();
    });

    return 0;
}

function removeAllChildNodes(parent: HTMLElement) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
