export function initGame() {
    spawnTrees();
    //this is expandable for different spawns 
  }
  
  let height = window.innerHeight;
  function spawnTrees() {
    const treePositions = [
      { x: 0, y: height-255 },

      { x: 225, y: height-260 },
      { x: 475, y: height-255 },
      { x: 725, y: height-265 },
      { x: 1025, y: height-265 },
      { x: 1275, y: height-260 },


      { x: 100, y: height-200 },
      { x: 350, y: height-177 },
      { x: 600, y: height-190 },
      { x: 850, y: height-205 },
      { x: 1125, y: height-205 },
      { x: 1375, y: height-200 },




      //top trees
      { x: 0, y: -180 },
      { x: 100, y: -110 },
      { x: 200, y: -150 },
      { x: 350, y: -105 },
      { x: 420, y: -165 },
      { x: 520, y: -145 },
      { x: 600, y: -120 },
      { x: 750, y: -175 },
      { x: 900, y: -125 },
      { x: 1050, y: -175 },
      { x: 1200, y: -125 },
      { x: 1300, y: -195 },
    ];
    
    const gameScreen = document.getElementById('game-screen');
    
    treePositions.forEach(pos => {
      const tree = document.createElement('div');
      tree.classList.add('tree');
      tree.style.left = pos.x + 'px';
      tree.style.top = pos.y + 'px';

      //if tree is above 0 y level then put it behind everything else
      if (pos.y<0) {
        tree.style.zIndex = 1;
      } else {
        tree.style.zIndex = 10;
      }

      gameScreen.appendChild(tree);
    });
  }
  