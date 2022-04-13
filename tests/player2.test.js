//Declare constants 
const Player = require('./player');
const Constants = require('../config/constants.json');
const { limit } = require('./math')
const { min } = require('./math')
const mockRayCasting = require('../src/js/util/raycasting');
const interp = require ('../src/js/util/interp')


//TC22:- Player x velocity value should be calculated correctly when moving to the left
it('Player x velocity value should be calculated correctly when moving to the left', () => {
    //Define player
    const testPlayer = new Player(1,1,80);
    //Set the input to left
    INPUT = {
        'jump': () => false,
        'left': () => true,
        'right': () => false,
    };
    
    //Define the necessary functions/objects/constants required to run tests
    jest.spyOn(testPlayer,'subCycle');
    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_SPEED = Constants.PLAYER_HORIZONTAL_SPEED;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION;
    CELL_SIZE = Constants.CELL_SIZE
    testPlayer.subCycle(1);
    

    //Expect the player horizontal speed to be -400
    expect(testPlayer.pHSpeed).toBe(-400)
})

//TC23:- Player x velocity value should be calculated correctly when moving to the right
it('Player x velocity value should be calculated correctly when moving to the right', () => {
    //Define player
    const testPlayer = new Player(1,1,80);
    //Set the input to right
    INPUT = {
        'jump': () => false,
        'left': () => false,
        'right': () => true,
    };
    
    //Define the necessary functions/objects/constants required to run tests
    jest.spyOn(testPlayer,'subCycle');
    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_SPEED = Constants.PLAYER_HORIZONTAL_SPEED;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION;
    CELL_SIZE = Constants.CELL_SIZE
    testPlayer.subCycle(1);
    

    //Expect the player horizontal speed to be 400
    expect(testPlayer.pHSpeed).toBe(400)
})

//TC24:- Player should be facing the left when left input is pressed
it('Player should be facing the left when left input is pressed', () => {
    //Define player
    const testPlayer = new Player(1,1,80);
    //Set the input to left
    INPUT = {
        'jump': () => false,
        'left': () => true,
        'right': () => false,
    };
    
    //Define the necessary functions/objects/constants required to run tests
    hasBlock = (x, y, radius = 0) => {
        return true
    }
    jest.spyOn(testPlayer,'subCycle');
    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_SPEED = Constants.PLAYER_HORIZONTAL_SPEED;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION;
    PLAYER_HORIZONTAL_ACCELERATION = Constants.PLAYER_HORIZONTAL_ACCELERATION;
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    CELL_SIZE = Constants.CELL_SIZE
    testPlayer.landed = true;
    testPlayer.subCycle(1);
    

    //Expect the player facing value to be -1
    expect(testPlayer.facing).toBe(-1)
})

//TC25:- Player should be facing the right when right input is pressed
it('Player should be facing the right when right input is pressed', () => {
    //Define player
    const testPlayer = new Player(1,1,80);
    //Set the input to right
    INPUT = {
        'jump': () => false,
        'left': () => false,
        'right': () => true,
    };

    //Define the necessary functions/objects/constants required to run tests
    hasBlock = (x, y, radius = 0) => {
        return true
    }
    jest.spyOn(testPlayer,'subCycle');
    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_SPEED = Constants.PLAYER_HORIZONTAL_SPEED;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION;
    PLAYER_HORIZONTAL_ACCELERATION = Constants.PLAYER_HORIZONTAL_ACCELERATION;
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    CELL_SIZE = Constants.CELL_SIZE
    testPlayer.landed = true;
    testPlayer.subCycle(1);
    

    //Expect the player facing value to be 1
    expect(testPlayer.facing).toBe(1)
})

//TC26:- Player y velocity should be calculated correctly when sliding down a wall 
it('Player y velocity should be calculated correctly when sliding down a wall ', () => {
    //Define player
    const testPlayer = new Player(1,1,80);

    //Define the necessary functions/objects/constants required to run tests
    INPUT = {
        'jump': () => false,
        'left': () => false,
        'right': () => false,
    };
    hasBlock = (x, y, radius = 0) => {
        return true
    }
    jest.spyOn(testPlayer,'subCycle');
    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_SPEED = Constants.PLAYER_HORIZONTAL_SPEED;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION;
    PLAYER_HORIZONTAL_ACCELERATION = Constants.PLAYER_HORIZONTAL_ACCELERATION;
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    WALL_FALL_DOWN_CAP = Constants.WALL_FALL_DOWN_CAP;
    WALL_GRAVITY_ACCELERATION = Constants.WALL_GRAVITY_ACCELERATION;
    CELL_SIZE = Constants.CELL_SIZE

    //Set sticks to wall to true
    testPlayer.sticksToWall = true;
    //Set the player y velocity to be 10
    testPlayer.vY = 10;
    testPlayer.subCycle(1);
    

    //Expect the player's previous Y to be 110
    expect(testPlayer.previousvY).toBe(110)
})

//TC27:- Player y velocity must not exceed wall fall down cap when sliding down a wall
it('Player y velocity must not exceed wall fall down cap when sliding down a wall', () => {
    //Define player
    const testPlayer = new Player(1,1,80);
    //Define the necessary functions/objects/constants required to run tests
    INPUT = {
        'jump': () => false,
        'left': () => false,
        'right': () => false,
    };
    hasBlock = (x, y, radius = 0) => {
        return true
    }
    jest.spyOn(testPlayer,'subCycle');
    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_SPEED = Constants.PLAYER_HORIZONTAL_SPEED;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION;
    PLAYER_HORIZONTAL_ACCELERATION = Constants.PLAYER_HORIZONTAL_ACCELERATION;
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    WALL_FALL_DOWN_CAP = Constants.WALL_FALL_DOWN_CAP;
    WALL_GRAVITY_ACCELERATION = Constants.WALL_GRAVITY_ACCELERATION;
    CELL_SIZE = Constants.CELL_SIZE
    
    //Set the player sticks to wall value to true
    testPlayer.sticksToWall = true;
    //Set the player y velocity to be 100
    testPlayer.vY = 100;
    testPlayer.subCycle(1);
    

    //Expect the player's previous Y velocity to be 200
    expect(testPlayer.previousvY).toBe(200)
})

//TC28:- Player cycle must call subcycle function for every frame per second
it('Player cycle must call subcycle function for every frame per second', () => {
    //Define player
    const testPlayer = new Player(1,1,80);
    //Define the necessary functions/objects/constants required to run tests
    jest.spyOn(testPlayer,'cycle');
    const sub = jest.spyOn(testPlayer,'subCycle')
    testPlayer.cycle(1)
    
    //Expect subCycle to be called 60 times
    expect(sub).toBeCalledTimes(60)
})

//TC29:- If there is no block the player, cancel wall stick
it('If there is no block near the player, cancel wall stick', () => {
    //Define player
    const testPlayer = new Player(1,1,80);

    INPUT = {
        'jump': () => false,
        'left': () => false,
        'right': () => false,
    };
    hasBlock = (x, y, radius = 0) => {
        return false
    }
    

    jest.spyOn(testPlayer,'subCycle');
    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_SPEED = Constants.PLAYER_HORIZONTAL_SPEED;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION;
    PLAYER_HORIZONTAL_ACCELERATION = Constants.PLAYER_HORIZONTAL_ACCELERATION;
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    WALL_FALL_DOWN_CAP = Constants.WALL_FALL_DOWN_CAP;
    WALL_GRAVITY_ACCELERATION = Constants.WALL_GRAVITY_ACCELERATION;
    
    CELL_SIZE = Constants.CELL_SIZE
    testPlayer.sticksToWall = true;

    testPlayer.subCycle(1);
    

    
    expect(testPlayer.sticksToWall).toBe(false)
})
