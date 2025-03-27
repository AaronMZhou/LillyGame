export const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  " ": false,  // if you choose to use " " as key identifier
  Space: false // or use this property with e.code === "Space"
};

export function initInputListeners() {
  // Keyboard listeners remain the same
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
  const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);
  
  if (isMobile()) {
    let touchStartX = 0, touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
      // Record the initial touch position
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const tapThreshold = 10; // If the movement is less than 10px, treat as a tap
      
      if (distance < tapThreshold) {
        // It's a tap—simulate space key press
        keys.Space = true;
        setTimeout(() => {
          keys.Space = false;
        }, 100);
      } else {
        // Otherwise, handle swipe for arrow keys.
        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal swipe
          if (dx > 0) {
            keys.ArrowRight = true;
            keys.ArrowLeft = false;
          } else {
            keys.ArrowLeft = true;
            keys.ArrowRight = false;
          }
        } else {
          // Vertical swipe
          if (dy > 0) {
            keys.ArrowDown = true;
            keys.ArrowUp = false;
          } else {
            keys.ArrowUp = true;
            keys.ArrowDown = false;
          }
        }
        // Reset arrow keys after a short delay
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
