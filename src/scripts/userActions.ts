import { loadImages, reloadImages } from "./imageLoader.js";

// Actions that a user can do

function updateFullscreenToggle() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(
        `Error attempting to enable fullscreen: ${err.message} (${err.name})`,
      );
    });
  } else {
    document.exitFullscreen();
  }
}

class ChapterControls {
  private chapterInput: HTMLInputElement | null;

  constructor() {
    this.chapterInput = document.getElementById(
      "chapter",
    ) as HTMLInputElement | null;

    const current_chapter = this.getCurrentChapterSession();
    this.chapterInput.value = current_chapter.toString();

    this.chapterInput.addEventListener("input", () =>
      this.updateCurrentChapterSession(),
    );

    loadImages(current_chapter);
  }

  private getCurrentChapterSession(): number {
    const chapter = Number(sessionStorage.getItem("chapter"));

    if (!Number.isFinite(chapter) || chapter <= 0) {
      return 1;
    }

    return chapter;
  }

  private updateCurrentChapterSession(): void {
    sessionStorage.setItem("chapter", this.chapterInput.value);

    reloadImages(Number(this.chapterInput));
  }

  previousChapter = (): void => {
    this.chapterInput?.stepDown();

    this.updateCurrentChapterSession();
  };

  nextChapter = (): void => {
    this.chapterInput?.stepUp();

    this.updateCurrentChapterSession();
  };
}

const chapterControls = new ChapterControls();

// EventListener
{
  function AddClickEventListenerById(
    elementId: string,
    listener: EventListener,
  ) {
    document.getElementById(elementId)?.addEventListener("click", listener);
  }

  AddClickEventListenerById("fullscreen-toggle", updateFullscreenToggle);

  AddClickEventListenerById(
    "previous-chapter",
    chapterControls.previousChapter,
  );
  AddClickEventListenerById("next-chapter", chapterControls.nextChapter);
}

// Keyboard Shortcuts

window.onkeydown = function (event) {
  switch (event.key) {
    case "ArrowUp":
    case "w":
      chapterControls.nextChapter();
      break;
    case "ArrowDown":
    case "s":
      chapterControls.previousChapter();
      break;
    default:
  }
};
