export const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    " ": false,
  };
  
  export function initInputListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.code === "Space") {
        keys.Space = true;
      }
      else if (keys.hasOwnProperty(e.key)) {
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
  }
  