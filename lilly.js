export class Lilly {
    constructor(element) {
      this.element = element;
      this.x = 100;
      this.y = 220;
      this.frameIndex = 0;
      this.currentDirection = 'ArrowDown';
      this.lastFrameTime = 0;
      this.frameDuration = 100; // ms per frame
    }
  
    update(keys, timestamp) {
      // Your movement logic here...
      if (!this.lastFrameTime) this.lastFrameTime = timestamp;
      const delta = timestamp - this.lastFrameTime;
      if (delta > this.frameDuration) {
        if (keys.ArrowUp || keys.ArrowDown || keys.ArrowLeft || keys.ArrowRight) {
          this.frameIndex = (this.frameIndex + 1) % 4;
        } else {
          this.frameIndex = 0;
        }
        this.lastFrameTime = timestamp;
      }
      
      // Movement logic:
      const step = 3;
      const spriteHeight = 128;
      if (keys.ArrowUp && this.y - step >= 50) {
        this.y -= step;
        this.currentDirection = 'ArrowUp';
      }
      if (keys.ArrowDown && this.y + step <= window.innerHeight - spriteHeight) {
        this.y += step;
        this.currentDirection = 'ArrowDown';
      }
      if (keys.ArrowLeft && this.x - step >= 0) {
        this.x -= step;
        this.currentDirection = 'ArrowLeft';
      }
      if (keys.ArrowRight) {
        this.x += step;
        this.currentDirection = 'ArrowRight';
        
      }
      
    }
  
    render() {
      // Determine the sprite sheet row based on currentDirection
      let row = 0;
      if (this.currentDirection === 'ArrowDown') row = 0;
      else if (this.currentDirection === 'ArrowRight') row = 1;
      else if (this.currentDirection === 'ArrowLeft') row = 2;
      else if (this.currentDirection === 'ArrowUp') row = 3;
      
      this.element.style.left = this.x + 'px';
      this.element.style.top = this.y + 'px';
      this.element.style.backgroundPosition = `-${this.frameIndex * 128}px -${row * 128}px`;
    }
  }
  