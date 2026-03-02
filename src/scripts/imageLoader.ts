const image_container = document.getElementById("image_container") as HTMLElement;

export function loadChapter(chapter: number) {
  loadPage(chapter, 1);
  loadPage(chapter, 2);
  loadPage(chapter, 3);
}

export function loadPage(chapter: number, page: number) {
  const img = new Image();

  img.src = "/content/chapter_1/planche_" + page + ".png";
  
  img.className = "bd_page";
  img.alt = "planche #" + page;
  
  img.width = 1240.5;
  img.height = 1753.5;

  img.onload = () => {
    console.log("Image loaded!");
    image_container.appendChild(img);
  };

  img.onerror = () => {
    console.error("Failed to load image");
  };
}

export function reloadImages(chapter: number) {}

function removeAllChildNodes(parent: HTMLElement) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}