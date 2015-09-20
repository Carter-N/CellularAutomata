/* GLOBAL VARIABLES */

//Canvas dimensions
var width = 1200;
var height = 800;

//Cell dimensions
var cellSize = 20;
var cellPadding = 1;

/* HELPER AND UTILITY FUNCTIONS */

//Create a two dimensionsal grid object
var createGrid = function(){

  //Empty array to be populated with nested arrays
  var arr = [];

  for(var x = 0; x < width / cellSize; x++){

    //Add nested array to current index
    arr.push([]);

    for(var y = 0; y < height / cellSize; y++){

      //Add the default cell object
      arr[x].push({live: false});
    }
  }

  //Return the populated grid object
  return arr;
};

//Aplly cellular automation to the grid object
var step = function(){

  //Array of next list of cells to apply after modification
  //to avoid cells affecting others after they have been checked
  var nextGen = createGrid(width / cellSize, height / cellSize);

  //Iterate through grid
  for(var x = 0; x < width / cellSize; x++){
    for(var y = 0; y < height / cellSize; y++){

      //Get the number of live cells surrounding the current cell
      var neighboors = getNeighboors(x, y);

      //Iterate through game of lifes rules
      switch(neighboors){

        //If the cell has 3 live cells it is alive
        case 3 : {
            nextGen[x][y].live = true;
            break;
        }

        //If the cell has 2 neighboors it stays alive
        case 2 : {
            nextGen[x][y].live = (grid[x][y].live) ? true : false;
            break;
        }

        //If the cell has more than 3 or less than 2 neighboors
        //it dies
        default : {
            nextGen[x][y].live = false;
        }
      }
    }
  }

  //Apply the next generation data to the grid
  for(var i = 0; i < width / cellSize; i++){
    for(var j = 0; j < height / cellSize; j++){
      grid[i][j].live = nextGen[i][j].live;
    }
  }
};

//Get the number of live neighboors surrounding a defined cell
var getNeighboors = function(x, y){

  //Initial number of confirmed live neighboors
  var neighboors = 0;

  //Iterate around the current cell
  for(var xi = x - 1; xi <= x + 1; xi++){
    for(var yi = y - 1; yi <= y + 1; yi++){

      //Check grid bounds
      if(xi >= 0 && xi < width / cellSize && yi >= 0 && yi < height / cellSize){

        //Check that the current cell is not the original cell
        if(xi != x || yi != y){
          if(grid[xi][yi].live === true) neighboors++;
        }
      }
    }
  }

  //Return the number of live neighboors
  return neighboors;
};

/* GRID LOADER */

//The grid object containing cell data
var gridFinished = false; //**Possibly not nescassary
var grid = createGrid();
gridFinished = true;      //**Possibly not nescassary

/* APP INITIALIZATION */

function setup(){

  //Create the canvas
  createCanvas(1200, 800);

  //Set framerate
  frameRate(30);
}

/* RENDERING AND UPDATING */

function draw(){

  //Clear the canvas
  background(200);

  //Draw the grid of cells
  for(var x = 0; x < width; x += cellSize){
    for(var y = 0; y < height; y += cellSize){

      //Check if cell is alive or dead
      if(gridFinished === true){
        if(grid[x / cellSize][y / cellSize].live){
          fill(50);     //Cell is alive
        }else{
          fill(150);    //Cell is dead
        }
      }

      //Draw the cell rectangle
      rect(x + cellPadding,
          y + cellPadding,
          cellSize - cellPadding * 2,
          cellSize - cellPadding * 2);
    }
  }
}

/* PAGE EVENT LISTENERS */
function mouseClicked(){

  //When user clicks find the position in cell units then toggle
  //its 'live' property
  var cell = grid[floor(mouseX / cellSize)][floor(mouseY / cellSize)];
  cell.live = !cell.live;
}

function keyTyped(){

  //Update the grid when a key is pressed
  step();
}
