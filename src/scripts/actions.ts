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

function createChapterControls() {
  const chapterInput = document.getElementById(
    "chapter",
  ) as HTMLInputElement | null;

  function previousChapter() {
    chapterInput?.stepDown();
  }

  function nextChapter() {
    chapterInput?.stepUp();
  }

  return { previousChapter, nextChapter };
}

const chapterControls = createChapterControls();

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
