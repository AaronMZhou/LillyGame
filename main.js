import { keys, initInputListeners, isMobile } from './input.js';
import { Lilly } from './lilly.js';
import { initGame } from './trees.js';

// Initialize input listeners
initInputListeners();

//sounds
const catSound = new Audio('sounds/catMeow.mp3');
const mamerico = new Audio('sounds/mamerico.mp3');
const boom = new Audio('sounds/boom.mp3');


// Game state variables
let gameStarted = false;
const lillyElement = document.getElementById('lilly');
const cat = document.getElementById('cat');

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const gameScreen = document.getElementById('game-screen');
const label = document.getElementById('label');
const yesButtonx = yesButton.style.left;
const yesButtony = yesButton.style.top;
const noButtonx = noButton.style.left;
const noButtony = noButton.style.top;
const controls = document.getElementById('controls');


// Create an instance of the Lilly character
const lillyCharacter = new Lilly(lillyElement);

// Cat movement variables
let catX = 200;
const step = 5; // pixels per frame for cat movement

// Listen for the Lilly selection click to start the game
document.getElementById('select-lilly').addEventListener('click', () => {
  document.getElementById('start-screen').style.display = 'none';
  gameScreen.style.display = 'block';
  gameStarted = true;


  
  //START THE MUSIC WOOO
  mamerico.play();
  catSound.play();
  
  //DISPLAYS HOW TO USE CONTROLS--------------------------
  //sets correct control instructions
  if (isMobile()) {
    document.querySelector('.frontLabel').textContent = "Swipe to move";
  }
  //display controls for 2 seconds
  controls.style.transition = 'transform 0.5s ease-in-out';
  setInterval(()=>{
    controls.style.transform = 'scale(1.2)';
    setTimeout(()=>{
      controls.style.transform = 'scale(1)';
    },500);
  },1000);
  setTimeout(()=>{
    controls.style.display = 'none';
    //make controls grow and shrink
    
  }, 4000);
  
});

// Main game loop
let catMove = false;
let catDelay = 1000; // wait 1000 miliseconds
let catMovementStarted = false;
let catStartTime = null;
let catDistance = window.innerWidth + 128; // distance to move the cat, adjusted based on window width

let scene2 = false;

function update(timestamp) {
  // Animate trees
  const treeFrameIndex = Math.floor(timestamp / 500) % 2;
  const trees = document.querySelectorAll('.tree');
  trees.forEach(tree => {
    tree.style.backgroundPosition = `0px -${treeFrameIndex * 256}px`;
  });
  if (catStartTime === null) {
    catStartTime = timestamp + catDelay; // Add delay time to current timestamp
  }

  // Start the delay timer once the game begins
  if (!catMovementStarted && gameStarted) {
    catStartTime = timestamp + catDelay; // Set the start time for the delay
    catMovementStarted = true; // Ensure we don't reset the timer again
  }

  // Check if it's time for the cat to start moving
  if (catMovementStarted && timestamp >= catStartTime) {
    const catFrameIndex = Math.floor(timestamp / 200) % 2;
    if ((Math.floor(timestamp / 200) % 2) == 1) {
      catMove = true;
    } else {
      catMove = false;
    }
    if (gameStarted && catX < catDistance) {
      cat.style.backgroundPosition = `0px -${catFrameIndex * 128}px`;
      if (catMove) {
        catX += (step);
      } else {
        //catX += (step / 10);
      }
    }
    else {
      cat.style.backgroundPosition = `0px -${0 * 128}px`;
    }
    
  }

  cat.style.left = catX + 'px';
  // Update and render Lilly's movement
  lillyCharacter.update(keys, timestamp);
  lillyCharacter.render();

  // Detect when Lilly is off-screen to the right
  if (lillyCharacter.x > window.innerWidth) {
    // Transition to the new screen
    // Hide elements from the game screen that are not needed
    
    gameScreen.style.backgroundImage = "url('sprites/pastelTile.png')";

    const treesContainer = document.querySelectorAll('.tree');
    treesContainer.forEach(tree => {
      tree.remove(); // Remove each tree from the DOM
    });
    // Reset Lilly's position and hide cat movement
    lillyCharacter.x = 100;
    lillyCharacter.y = 220;
    catX = 100;
    cat.style.left = catX + 'px';
    
    scene2 = true;
    console.log("scene2");

    // Move the cat to its new position with the updated label
    if (isMobile()) {
      document.querySelector('.catLabel').textContent = "Tap screen :3";
    } else {
      document.querySelector('.catLabel').textContent = "Press space :3";
    }
    catDistance = window.innerWidth/2-64;
    
    yesButton.style.display = 'block';
    
    noButton.style.display = 'block';
    
    label.style.display = 'block';
    
    
  }
  if (scene2) { //once scene2 starts (button selection)
    console.log("checking buttons");
    if (checkYes()) {
      
      yesButton.classList.add("active-button"); //just for testing collision
      //console.log("yes"); //test if button is working
      if (keys.Space) { //looks into input.js for space key in keys class and sees if true (pressed down)
        catSound.play();
        animateYes();
      }
    }
    else {
      yesButton.classList.remove("active-button");
    }
    if (checkNo()) {
      
      //console.log("no"); //test if button is working
      noButton.classList.add("active-button");
      
      if (keys.Space) { //looks into input.js for space key in keys class and sees if true (pressed down)
        catSound.play();
        animateNo();
        
      }
      
    }
    else {
      noButton.classList.remove("active-button");
    }
  }

  updateZIndex();
  // Continue the animation loop
  requestAnimationFrame(update);
}

// Initialize any additional game state (like spawning trees)
initGame();

// Start the game loop
requestAnimationFrame(update);

function updateZIndex() {
  // Get the cat's y position; if cat.style.top is not set, default to a known value like 200.
  const catY = parseInt(cat.style.top) || 200;

  // Set a baseline for cat
  cat.style.zIndex = 5;

  // Adjust Lilly's z-index relative to the cat.
  if (lillyCharacter.y < catY) {
    lillyElement.style.zIndex = 4;
  } else {
    lillyElement.style.zIndex = 6;
  }

  if (lillyCharacter.y-215 < noButtony) {
    noButton.style.zIndex = 7;
    yesButton.style.zIndex = 7;
  } else {
    noButton.style.zIndex = 3;
    yesButton.style.zIndex = 3;
  }
}
function checkYes() {
  const rect = yesButton.getBoundingClientRect(); // Get button's bounding rectangle
  const yesButtonX = rect.left;
  const yesButtonY = rect.top;

  if (
    yesButtonX+32 > lillyCharacter.x-32 &&
    yesButtonX < lillyCharacter.x + 64 &&
    yesButtonY > lillyCharacter.y -32 &&
    yesButtonY < lillyCharacter.y + 64
  ) {
    return true;
  }
  return false;
}

function checkNo() {
  const rect = noButton.getBoundingClientRect(); // Get button's bounding rectangle
  const noButtonX = rect.left;
  const noButtonY = rect.top;

  if (
    noButtonX+32 > lillyCharacter.x-32 &&
    noButtonX < lillyCharacter.x + 64 &&
    noButtonY > lillyCharacter.y - 32 &&
    noButtonY < lillyCharacter.y + 64
  ) {
    return true;
  }
  return false;
}

function animateYes() {
  let currentFrame = 0; // Start from the first frame
  const totalFrames = 7; // Total frames for the Yes button sprite sheet
  
  const animationInterval = setInterval(() => {
    // Set the background position to show the current frame
    yesButton.style.backgroundPosition = `0px -${currentFrame * 128}px`;

    // Increment the frame index
    currentFrame++;

    // If we've gone through all frames, stop the animation
    if (currentFrame >= totalFrames) {
      yesButton.style.backgroundPosition = `0px -${0 * 128}px`;
      clearInterval(animationInterval); // Stop the interval
    }
  }, 250); // 250ms between each frame
}

function animateNo() {
  let currentFrame = 0; // Start from the first frame
  const totalFrames = 10; // Total frames for the Yes button sprite sheet
  
  
  const animationInterval = setInterval(() => {
    // Set the background position to show the current frame
    noButton.style.backgroundPosition = `0px -${currentFrame * 128}px`;

    // Increment the frame index
    currentFrame++;
    if (currentFrame == 5) {
      boom.play();
    }

    // If we've gone through all frames, stop the animation
    if (currentFrame >= totalFrames) {
      clearInterval(animationInterval); // Stop the interval
      setTimeout(function(){
        noButton.style.display = 'none';
    }, 1000);
      
      
    }
  }, 100); // 250ms between each frame

}


