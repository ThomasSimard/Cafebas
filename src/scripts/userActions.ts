import { loadChapter, reloadImages } from "./imageLoader.js";

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
  private last_chapter: number | null;
  private chapterInput: HTMLInputElement | null;

  constructor() {
    this.chapterInput = document.getElementById(
      "chapter",
    ) as HTMLInputElement | null;

    const current_chapter = this.getCurrentChapterSession();

    this.last_chapter = current_chapter;
    this.chapterInput.value = current_chapter.toString();

    this.chapterInput.addEventListener("change", () =>
      this.updateCurrentChapterSession(),
    );

    loadChapter(current_chapter);
  }

  private getCurrentChapterSession(): number {
    const chapter = Number(sessionStorage.getItem("chapter"));

    if (!Number.isFinite(chapter) || chapter <= 0) {
      return 1;
    }

    return chapter;
  }

  private updateCurrentChapterSession(): void {
    const current_chapter = Number(this.chapterInput?.value);

    if (current_chapter == this.last_chapter) return;

    this.last_chapter = current_chapter;

    console.log("update");

    sessionStorage.setItem("chapter", current_chapter.toString());

    reloadImages(current_chapter);
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
