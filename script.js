/*
let gameStarted = false;
//get Lilly's element and initialize position, frame, and direction variables
const lilly = document.getElementById('lilly');

const cat = document.getElementById('cat');
let x = 100; //so I can keep track of x-position
let y = 220; //keep track of y-position

let catX = 100;
const step = 6; //pixels to move per frame (for smooth movement)
let frameIndex = 0;
let currentDirection = 'ArrowDown'; //default facing down for lilly

//This is an object to track which keys are currently pressed
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

//this listens for keydown and keyup events to update the keys object
document.addEventListener('keydown', (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = true;
  }
});
document.addEventListener('keyup', (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
    //reset the frame to the first frame when movement stops
    frameIndex = 0;
  }
});

//when the user selects Lilly, switch from the start screen to the game screen
document.getElementById('select-lilly').addEventListener('click', function () {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';
  gameStarted = true;
});

//animation loop variables
let lastFrameTime = 0;
const frameDuration = 100; //how many milliseconds per animation frame

function update(timestamp) {
  const treeFrameIndex = Math.floor(timestamp / 500) % 2;
  const trees = document.querySelectorAll('.tree');
  trees.forEach(tree => {
    tree.style.backgroundPosition = `0px -${treeFrameIndex * 256}px`;
  });
  const catFrameIndex = Math.floor(timestamp / 250) % 2;

  if (catX < 1400 && gameStarted){ 
    cat.style.backgroundPosition = `0px -${catFrameIndex * 128}px`;
    catX += (step/2.5);
  }
  

  //determines if it's time to update the animation frame based on the frameDuration which I put as 100ms
  if (!lastFrameTime) lastFrameTime = timestamp;
  const delta = timestamp - lastFrameTime;
  if (delta > frameDuration) {
    //only cycle frames if any movement key is active 
    if (keys.ArrowUp || keys.ArrowDown || keys.ArrowLeft || keys.ArrowRight) {
      frameIndex = (frameIndex + 1) % 4; // Cycle through 4 frames (0-3) I accidentally made her pause too long by 
                                        // having frame 1 and 5 the same so im skipping th e last frame
    } else {
      frameIndex = 0; //idle: reset to first frame
    }
    lastFrameTime = timestamp;
  }

  //movement logic: update x, y positions and determine the current direction.
  //(Multiple keys may be pressed here each key adjusts the position.)
  const spriteWidth = 128;
  const spriteHeight = 128;
  
  if (keys.ArrowUp) {
    if (y - step >= 0) {
      y -= step;
    }
    currentDirection = 'ArrowUp';
  }
  if (keys.ArrowDown) {
    if (y + step <= window.innerHeight - spriteHeight) {
      y += step;
    }
    currentDirection = 'ArrowDown';
  }
  if (keys.ArrowLeft) {
    if (x - step >= 0) {
      x -= step;
    }
    currentDirection = 'ArrowLeft';
  }
  if (keys.ArrowRight) {
    //if (x + step <= window.innerWidth - spriteWidth) { //want her to run off; add logic here for switching to next screen
      x += step;
    
    currentDirection = 'ArrowRight';
  }
  

  // Update Lilly's on-screen position
  lilly.style.left = x + 'px';
  lilly.style.top = y + 'px';
  // Update cat to go right
  cat.style.left = catX + 'px';

  //determine the sprite sheet row based on currentDirection:
  // Row 0: Down, Row 1: Right, Row 2: Left, Row 3: Up
  let row = 0;
  if (currentDirection === 'ArrowDown') {
    row = 0;
  } else if (currentDirection === 'ArrowRight') {
    row = 1;
  } else if (currentDirection === 'ArrowLeft') {
    row = 2;
  } else if (currentDirection === 'ArrowUp') {
    row = 3;
  }

  // Update the background position to show the proper frame.
  // Each frame is 64px wide and 64px tall.
  lilly.style.backgroundPosition = `-${frameIndex * 128}px -${row * 128}px`;
  //tree.style.backgroundPosition = `0px -${treeFrameIndex * 256}px`

  // Continue the animation loop
  requestAnimationFrame(update);
}

// Start the animation loop
requestAnimationFrame(update);

function spawnTrees() {
  // Define specific locations for trees
  const treePositions = [
    { x: 100, y: 350 },
    { x: 350, y: 327 },
    { x: 600, y: 340 },
    { x: 850, y: 355 },
    // front trees
    { x: 225, y: 410 },
    { x: 475, y: 405 },
    { x: 725, y: 415 },
    { x: 0, y: 405 },
    { x: 1025, y: 415 },
  ];
  
  const gameScreen = document.getElementById('game-screen');
  
  treePositions.forEach(pos => {
    const tree = document.createElement('div');
    tree.classList.add('tree');
    tree.style.left = pos.x + 'px';
    tree.style.top = pos.y + 'px';
    gameScreen.appendChild(tree);
  });
}

// Call the function to spawn trees at specified locations
spawnTrees();

*/