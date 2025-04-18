export function spawnEnemies() {
  spawnAlligators();
  //this is expandable for different spawns 
}

let height = window.innerHeight;
let width = window.innerWidth;
function spawnAlligators() {
  const alligatorPositions = [
    { x: width-200, y: height-255 },
    { x: width-200, y: height-455 },
    { x: width-200, y: height-755 },
    
  ];
  
  const gameScreen = document.getElementById('game-screen');
  
  alligatorPositions.forEach(pos => {
    const alligator = document.createElement('div');
    alligator.classList.add('alligator');
    alligator.style.left = pos.x + 'px';
    alligator.style.top = pos.y + 'px';

    gameScreen.appendChild(alligator);
  });
}
