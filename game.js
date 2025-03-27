/*
import { keys } from './input.js';

let gameStarted = false;
const lilly = document.getElementById('lilly');
const cat = document.getElementById('cat');

let x = 100; // Lilly's x-position
let y = 220; // Lilly's y-position
let catX = 100; // Cat's x-position

const step = 3;
let frameIndex = 0;
let currentDirection = 'ArrowDown';
let lastFrameTime = 0;
const frameDuration = 100; // ms per frame

// Start game when selecting Lilly
document.getElementById('select-lilly').addEventListener('click', () => {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';
  gameStarted = true;
});

let catMove = false;//see if cat needs to move large amount
export function update(timestamp) {
  // Animate trees (if any)
  const treeFrameIndex = Math.floor(timestamp / 500) % 2;
  const trees = document.querySelectorAll('.tree');
  trees.forEach(tree => {
    tree.style.backgroundPosition = `0px -${treeFrameIndex * 256}px`;
  });

  // Cat animation and movement
  const catFrameIndex = Math.floor(timestamp / 250)%2;
  if ((Math.floor(timestamp / 250) % 2)==1) {
    catMove = true;
  } else {
    catMove = false;
  }
  if (gameStarted && catX < 1400) { 
    cat.style.backgroundPosition = `0px -${catFrameIndex * 128}px`;
    if (catMove){
      catX += (step / 1.5);
    }
    else {
      catX += (step / 6);
    }
  }

  // Update frame for Lilly's movement
  if (!lastFrameTime) lastFrameTime = timestamp;
  const delta = timestamp - lastFrameTime;
  if (delta > frameDuration) {
    if (keys.ArrowUp || keys.ArrowDown || keys.ArrowLeft || keys.ArrowRight) {
      frameIndex = (frameIndex + 1) % 4;
    } else {
      frameIndex = 0;
    }
    lastFrameTime = timestamp;
  }

  // Lilly's movement logic
  const spriteWidth = 128;
  const spriteHeight = 128;
  
  if (keys.ArrowUp && y - step >= 0) {
    y -= step;
    currentDirection = 'ArrowUp';
  }
  if (keys.ArrowDown && y + step <= window.innerHeight - spriteHeight) {
    y += step;
    currentDirection = 'ArrowDown';
  }
  if (keys.ArrowLeft && x - step >= 0) {
    x -= step;
    currentDirection = 'ArrowLeft';
  }
  if (keys.ArrowRight) {
    x += step;
    currentDirection = 'ArrowRight';
  }
  
  // Update positions
  lilly.style.left = x + 'px';
  lilly.style.top = y + 'px';
  cat.style.left = catX + 'px';

  // Set Lilly's background based on direction
  let row = 0;
  if (currentDirection === 'ArrowDown') row = 0;
  else if (currentDirection === 'ArrowRight') row = 1;
  else if (currentDirection === 'ArrowLeft') row = 2;
  else if (currentDirection === 'ArrowUp') row = 3;
  
  lilly.style.backgroundPosition = `-${frameIndex * 128}px -${row * 128}px`;

  // Continue the animation loop
  requestAnimationFrame(update);
}

export function startGameLoop() {
  requestAnimationFrame(update);
}
*/