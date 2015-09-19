//Grid object
function createGrid(width, height){

  var arr = [];

  //Create 2d array to store tile data in
  for(var x = 0; x < width; x++){

    //Add nested array to object
    arr.push([]);

    for(var y = 0; y < height; y++){
      arr[x].push({
        live: false
      });
    }
  }
  return arr;
}

//The grid object containing tile data
var gridFinished = false;
var grid = createGrid(800 / 20, 800 / 20);
gridFinished = true;

function setup(){

  //Create the canvas
  createCanvas(800, 800);

  //Set framerate
  frameRate(60);
}

function mouseClicked(){

  //Check for clicks
  var tile = grid[floor(mouseX / 20)][floor(mouseY / 20)];
  tile.live = !tile.live;
}

function keyTyped(){
  step();
}

function step(){

  var nextGen = createGrid(800 / 20, 800 / 20);

  for(var x = 0; x < 800 / 20; x++){
    for(var y = 0; y < 800 / 20; y++){

      var neighboors = getNeighboors(x, y);
      var action = false;

      switch(neighboors){
        case 3 : {
            nextGen[x][y].live = true;
            break;
        }
        case 2 : {
            nextGen[x][y].live = (grid[x][y].live) ? true : false;
            break;
        }
        default : {
            nextGen[x][y].live = false;
        }
      }
    }
  }

  for(var i = 0; i < 800 / 20; i++){
    for(var j = 0; j < 800 / 20; j++){
      grid[i][j].live = nextGen[i][j].live;
    }
  }
}

function getNeighboors(x, y){

  var neighboors = 0;

  //Loop around current tile
  for(var xi = x - 1; xi <= x + 1; xi++){
    for(var yi = y - 1; yi <= y + 1; yi++){

      //Check array bounds
      if(xi >= 0 && xi < 800 / 20 && yi >= 0 && yi < 800 / 20){

        //Check that not original tile
        if(xi != x || yi != y){
          if(grid[xi][yi].live === true){
            neighboors++;
          }
        }
      }
    }
  }

  //Number of live neighboors
  return neighboors;
}

function draw(){

  background(200);

  //Draw the grid of cells
  for(var x = 0; x < 800; x += 20){
    for(var y = 0; y < 800; y += 20){

      if(gridFinished === true){
        if(grid[x / 20][y / 20].live){
          fill(50);
        }else{
          fill(150);
        }
      }

      rect(x + 1, y + 1, 18, 18);
    }
  }
}
