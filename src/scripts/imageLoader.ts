
export function loadImages(chapter: number) {

}

export function reloadImages(chapter: number) {

}

function removeAllChildNodes(parent: HTMLElement) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}