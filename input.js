export const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  " ": false,  // or use this for the space key
  Space: false, // for e.code === "Space"
};

export function initInputListeners() {
  const isMobile = () => /Mobi|Android/i.test(navigator.userAgent); // Detect mobile devices
  
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
    let touchStartX = 0, touchStartY = 0;

    // Detect touch start position
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    // Detect touch end position
    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const dx = touchEndX - touchStartX; // Horizontal distance
      const dy = touchEndY - touchStartY; // Vertical distance
      const distance = Math.sqrt(dx * dx + dy * dy);  // Euclidean distance
      const tapThreshold = 10;  // Threshold for detecting a tap
      const swipeThreshold = 30; // Minimum swipe distance for both horizontal and vertical swipes

      if (distance < tapThreshold) {
        // It's a tap, simulate Space key press
        keys.Space = true;
        setTimeout(() => {
          keys.Space = false;
        }, 100); // Reset space key after 100ms
      } else {
        // Handle swipe if the movement exceeds swipe threshold
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold) {
          // Horizontal swipe (left or right)
          if (dx > 0) {
            keys.ArrowRight = true;  // Move right
            keys.ArrowLeft = false;
          } else {
            keys.ArrowLeft = true;   // Move left
            keys.ArrowRight = false;
          }
        } else if (Math.abs(dy) > swipeThreshold) {
          // Vertical swipe (up or down)
          if (dy > 0) {
            keys.ArrowDown = true;  // Move down
            keys.ArrowUp = false;
          } else {
            keys.ArrowUp = true;    // Move up
            keys.ArrowDown = false;
          }
        }

        // Reset arrow keys after a short delay (250ms)
        setTimeout(() => {
          keys.ArrowUp = false;
          keys.ArrowDown = false;
          keys.ArrowLeft = false;
          keys.ArrowRight = false;
        }, 250);
      }
    });
  }
}
