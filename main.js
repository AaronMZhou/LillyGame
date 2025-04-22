
import { keys, initInputListeners } from './input.js';
import { Lilly } from './lilly.js';
import { initGame } from './trees.js';
import { spawnEnemies } from './alligators.js';

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
const catLabel = document.querySelector('.catLabel');
const isMobile = () => /Mobi|Android/i.test(navigator.userAgent); // Detect mobile devices

//store current scene
let curScene = 1; //start at 1, so we can use switch statements to change scenes

// Create an instance of the Lilly character
const lillyCharacter = new Lilly(lillyElement);

// Cat movement variables
let catX = 200;
const step = 3; // pixels per frame for cat movement

// Listen for the Lilly selection click to start the game

//THIS FOR LILLY'S BOOTY GRABBIN HAND
let handFrameIndex = 0;
let handAnimationInProgress = false;
let handElement = document.getElementById('lillyHand');

let aliStep = 1;
window.canGoRight = true;

let rightRestrict = false;
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
    

    //THIS CAN WORK FOR ALLL SCENES, MOVE CAT AND LILLY, INCREASE INT SCENE TRACKER --------
    curScene++;
    console.log(curScene); //test curScene goes up once
    changeScene(curScene); //change background

    const treesContainer = document.querySelectorAll('.tree');
    treesContainer.forEach(tree => {
      tree.remove(); // Remove each tree from the DOM
    });
    // Reset Lilly's position and hide cat movement
    lillyCharacter.x = 100;
    lillyCharacter.y = 220;
    catX = 100;
    cat.style.left = catX + 'px';
    

        //this is what I could potentially do to make it more scalable
    //however this is small game, so I can handle swtich statements/nested ifelse in here for scene changes
    // updateCatMessage(curScene); //takes in current scene and updates message based on scene
    //updateCatMessage(curScene); //takes in current scene and updates message based on scene
    // Move the cat to its new position with the updated label
    if (isMobile()) {
      if (curScene == 2) {
        catLabel.textContent = "Tap screen to attack!";
      }
      else if (curScene == 3){
        catLabel.textContent = "Tap screen :3";
      }
      
    } else {
      if (curScene == 2) {
        catLabel.textContent = "Press space to attack!";
      }
      else if (curScene == 3){
        catLabel.textContent = "Press space :3";
      }
    }
    
    if (curScene == 2) { //cat off screen
      rightRestrict = true;
      catDistance = window.innerWidth+64;
      catLabel.style.color = 'white';

      // ORIGINALLY USED TO SPAWN MOB OF ALLIGATORS, WILL SAVE FOR LATER
      //spawnEnemies(); //spawn alligators

      //not best practice as I use this exact same code in next scene prompting to go right
      document.querySelector('.label').textContent = "BEAT THE ENEMIES!";
      label.style.display = 'block';
      //change label color to white
      label.style.color = 'white';
      
      //START SPAWNING THE ALLIGATORS ONE BY ONE
      for (let i = 0; i < 8; i++) { //REALLY did not need to use for loop, just havent used on this project
        setTimeout(()=>spawnAlligator(),2000*i);
      }
      setTimeout(()=>{
        aliStep = 2; //increase speed
        spawnEnemies(); //MOBBBB
        document.querySelector('.label').textContent = "Now go right!";
        rightRestrict = false; //allow right movement
      }, 16000)


    }
    else if (curScene == 3) { //cat between buttons, buttons appear
      console.log("scene 3");
      catLabel.style.color = 'black';
      document.querySelector('.label').textContent = "Will you be my girlfriend?";
      catDistance = window.innerWidth/2-64;
      const alligators = document.querySelectorAll('.alligator');
      alligators.forEach(alligator => {
        alligator.remove(); // Remove each alligator from the DOM
      });
      yesButton.style.display = 'block';
    
      noButton.style.display = 'block';
      
      label.style.display = 'block';
    }
    console.log(curScene); //test curScene goes up once
    

    
    
  }
  if (curScene == 2) { //once scene2 starts (button selection)

    scene2Run(timestamp);
  }
  else if (curScene == 3) { //once scene3 starts (button selection)
    scene3Run();
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

function changeScene(scene) {
  const backgrounds = [
    'url(sprites/grassTile.png)', //not best practice, but this is a small game. This is just placeholder
    //placeholder was so this could become element 1 so it would match with scene 1 logic in code
    'url(sprites/grassTile.png)',
    'url(sprites/dungeonTile.png)',
    'url(sprites/pastelTile.png)',
    'url(sprites/meAndLilly.jpg)'
  ];

  // Set the background image based on the current scene
  gameScreen.style.backgroundImage = backgrounds[scene];
  

  // Hide the yes and no buttons when transitioning to a new scene
  //need to fix later, if I have a bunch of scenes then there will be no need to check if I neve use again
  yesButton.style.display = 'none';
  noButton.style.display = 'none';
  label.style.display = 'none';

  if (scene == 4) {

    //make background image fit screen
    gameScreen.style.backgroundSize = 'cover';
    gameScreen.style.backgroundPosition = 'center';
    catLabel.textContent = "YIPPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE!";
  }
}

function scene2Run(timestamp) {
  if (keys.Space) { //looks into input.js for space key in keys class and sees if true (pressed down)
    //
    triggerLillyAttack();
  }

  //handles seeing if lilly can go right
  if (rightRestrict) {
    if (lillyCharacter.x > window.innerWidth - 200 ) {
      window.canGoRight = false; //disallow lilly to move right
    }
    else {
      window.canGoRight = true; //allow lilly to move right
    }
  } 


  let alligatorMove = false;
  const alligatorFrameIndex = Math.floor(timestamp / 500) % 2;
  
  if (alligatorFrameIndex == 1) {
    alligatorMove = true;
  }
  const alligators = document.querySelectorAll('.alligator');
  alligators.forEach(alligator => {

    let alligatorDirection = 0; //0 is left, 1 is right



    const x = parseInt(alligator.style.left);
    const y = parseInt(alligator.style.top);
/*
    const lillyX = lillyCharacter.x+64;
    const lillyY = lillyCharacter.y;

    const dx = lillyX - x;
    const dy = lillyY - y;

    const dist = Math.hypot(dx, dy); // same as sqrt(dx*dx + dy*dy)

    let aliStep = 1;
    const stepX = (dx / dist) * aliStep;
    const stepY = (dy / dist) * aliStep;
    //console.log(stepX, stepY);
*/
    if (lillyCharacter.x > x) {
      alligatorDirection = 1;
    }

    //TIME TO MOVE THEM BABIES ATTACKKKKKK, lets make them step toward the left 

    //similar code to cat movement but for alligators //nvm I think I changed
    
    //handle frame after finding where its moving
    //HOLY SHIT I SPENT SO LONG ON THIS STUPID PROBLEM I WAS LIKE WHY IS ALLIGATORFRAMEINDEX ALWAYS EQUAL TO 1 WHEN I PUT IT IN THE ALLIGATOR MOVE IF STATEMENT AND ITS CUZ IT HAS TO BE 1 FOR THE IF STATEMENT TO ACTIVATE
    console.log(alligatorFrameIndex);
    alligator.style.backgroundPosition = `-${128*alligatorFrameIndex}px -${alligatorDirection * 128}px`;

    if (alligatorMove) {
      
      if (lillyCharacter.x+64 > x) { //alligator to left
        alligator.style.left = (x + aliStep) + 'px'; //move left by aliStep
        alligatorDirection = 1;
      }
      else if (lillyCharacter.x+64 < x) { //alligator to the right 
        alligator.style.left = (x - aliStep) + 'px'; //move right by aliStep
        alligatorDirection = 0;
      }
      if (lillyCharacter.y > y) { //alligator above
        alligator.style.top = (y + aliStep) + 'px'; //move down by aliStep
      }
      else if (lillyCharacter.y < y) { //alligaor below
        alligator.style.top = (y - aliStep) + 'px'; //move up by aliStep
      }
    } 

  });
}
// Function to spawn an alligator
function spawnAlligator() {
  const alligator = document.createElement('div');
  alligator.classList.add('alligator');
  gameScreen.appendChild(alligator);
  
  // Set the initial position of the alligator
  alligator.style.left = `${window.innerWidth - 200}px`;
  alligator.style.top = `${Math.random() * window.innerHeight}px`; // Random vertical position within window height
  
  // Add any additional styles or animation for the alligator here
}


function scene3Run() {
  console.log("checking buttons");
  label.style.color = 'black';
  

  if (checkYes()) {
    
    yesButton.classList.add("active-button"); //just for testing collision
    //console.log("yes"); //test if button is working
    if (keys.Space) { //looks into input.js for space key in keys class and sees if true (pressed down)
      catSound.play();
      animateYes();
      document.querySelector('.label').textContent = "Continue to the right!";
      const label = document.getElementById('label');
      setInterval(()=>{
        label.style.transform = 'scale(1.2)';
        setTimeout(()=>{
          label.style.transform = 'scale(1)';
        },500);
      },1000);
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

//TRIGGER ATTACK, CHECK ALLIGATOR COLLISION
function triggerLillyAttack() {
  if (handAnimationInProgress) return; // Avoid triggering attack again while animation is running

  handAnimationInProgress = true;
  handFrameIndex = 0; //reset animation to first frame
  // Position Lilly's hand relative to her current position
  handElement.style.left = lillyCharacter.x + 20 + 'px'; 
  handElement.style.top = lillyCharacter.y + 'px';
  handElement.style.display = 'block'; // Show the hand

  //get lilly label
  const lillyLabel = document.querySelector('.lillyLabel');
  lillyLabel.style.display = 'block'; // Show the label

  //IM JUST TRYING THIS OUT DEFINING METHOD FIRST AND ALSO FRAME DURATION FOR INTERVAL METHOD MAYBE MORE ORGANIZED?????
  // Animate Lilly's hand
  const animationFrameDuration = 200; // Time between each frame in ms
  function animateHand() {
    handElement.style.backgroundPosition = `-${handFrameIndex * 128}px 0`; // Move to the next frame
    handFrameIndex++;
    
    if (handFrameIndex == 5) { // Stop after 4 frames
      clearInterval(handAnimationInterval);
      handElement.style.display = 'none'; // Hide hand after animation
      handAnimationInProgress = false;
      //get rid of lilly label after attack animation
      lillyLabel.style.display='none';
    }
  }

  let handAnimationInterval = setInterval(animateHand, animationFrameDuration);

  // Check for collisions with alligators
  checkAlligatorCollisions();
}

// Function to check for collisions with alligators
function checkAlligatorCollisions() {
  setTimeout(()=>{ //FIXED: Now alligator collision is based on last frame of hand animation (clamping down) rather than first frame
    const alligators = document.querySelectorAll('.alligator');
    alligators.forEach(alligator => {
      const alligatorX = parseInt(alligator.style.left, 10);
      const alligatorY = parseInt(alligator.style.top, 10);

      const handX = parseInt(handElement.style.left, 10);
      const handY = parseInt(handElement.style.top, 10);

      // Check if any alligator is within the bounds of Lilly's hand
      if (alligatorX < handX + 128 && alligatorX + 64 > handX &&
          alligatorY < handY + 128 && alligatorY + 64 > handY) {
      //  setTimeout(()=>{// trying to time it so alligator dies when hand clamps down //THIS WAS SO STUPID
          alligator.remove(); // Remove the alligator if it collides with the hand
       // },1000)

      }
    });
  },1000);
}
