export const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  " ": false,
};

export function initInputListeners() {
  // Detect if the user is on a mobile device
  const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);

  // Keydown events for keyboard controls
  document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
      keys.Space = true;
    } else if (keys.hasOwnProperty(e.key)) {
      keys[e.key] = true;
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.code === "Space") {
      keys.Space = false;
    }
    if (keys.hasOwnProperty(e.key)) {
      keys[e.key] = false;
    }
  });

  // Mobile touch controls
  if (isMobile()) {
    let touchStartX = 0;
    let touchStartY = 0;

    // Detect touch start
    document.addEventListener('touchstart', (e) => {
      // Get the initial touch position
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    // Detect touch move or end (swipe detection)
    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      // Check swipe direction (left, right, up, down)
      const horizontalSwipe = touchEndX - touchStartX;
      const verticalSwipe = touchEndY - touchStartY;

      if (Math.abs(horizontalSwipe) > Math.abs(verticalSwipe)) {
        // Horizontal swipe: Left or Right
        if (horizontalSwipe > 0) {
          keys.ArrowRight = true;  // Move right
          keys.ArrowLeft = false;
        } else {
          keys.ArrowLeft = true;   // Move left
          keys.ArrowRight = false;
        }
      } else {
        // Vertical swipe: Up or Down
        if (verticalSwipe > 0) {
          keys.ArrowDown = true;  // Move down
          keys.ArrowUp = false;
        } else {
          keys.ArrowUp = true;    // Move up
          keys.ArrowDown = false;
        }
      }

      // Reset key states after the swipe
      setTimeout(() => {
        keys.ArrowUp = false;
        keys.ArrowDown = false;
        keys.ArrowLeft = false;
        keys.ArrowRight = false;
      }, 250);  // Reset after a short delay (250ms)
    });
  }
}
