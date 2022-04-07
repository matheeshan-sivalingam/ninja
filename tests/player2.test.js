
const Player = require('./playerMock');
const Constants = require('../config/constants.json');
const { limit } = require('./math')
const { min } = require('./math')
const mockRayCasting = require('../src/js/util/raycasting');
const interp = require ('../src/js/util/interp')


//TC22:- Player x velocity value should be calculated correctly when moving to the left
it('Player x velocity value should be calculated correctly when moving to the left', () => {
    //Define player
    const testPlayer = new Player(1,1,80);

    INPUT = {
        'jump': () => false,
        'left': () => true,
        'right': () => false,
    };
    

    jest.spyOn(testPlayer,'subCycle');
    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_SPEED = Constants.PLAYER_HORIZONTAL_SPEED;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION;
    CELL_SIZE = Constants.CELL_SIZE
    testPlayer.subCycle(1);
    

    
    expect(testPlayer.pHSpeed).toBe(-400)
})

//TC23:- Player x velocity value should be calculated correctly when moving to the right
it('Player x velocity value should be calculated correctly when moving to the right', () => {
    //Define player
    const testPlayer = new Player(1,1,80);

    INPUT = {
        'jump': () => false,
        'left': () => false,
        'right': () => true,
    };
    

    jest.spyOn(testPlayer,'subCycle');
    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_SPEED = Constants.PLAYER_HORIZONTAL_SPEED;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION;
    CELL_SIZE = Constants.CELL_SIZE
    testPlayer.subCycle(1);
    

    
    expect(testPlayer.pHSpeed).toBe(400)
})

//TC24:- Player should be facing the left when left input is pressed
it('Player should be facing the left when left input is pressed', () => {
    //Define player
    const testPlayer = new Player(1,1,80);

    INPUT = {
        'jump': () => false,
        'left': () => true,
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
    CELL_SIZE = Constants.CELL_SIZE
    testPlayer.landed = true;
    testPlayer.subCycle(1);
    

    
    expect(testPlayer.facing).toBe(-1)
})

//TC25:- Player should be facing the right when right input is pressed
it('Player should be facing the right when right input is pressed', () => {
    //Define player
    const testPlayer = new Player(1,1,80);

    INPUT = {
        'jump': () => false,
        'left': () => false,
        'right': () => true,
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
    CELL_SIZE = Constants.CELL_SIZE
    testPlayer.landed = true;
    testPlayer.subCycle(1);
    

    
    expect(testPlayer.facing).toBe(1)
})

//TC26:- Player y velocity should be calculated correctly when sliding down a wall 
it('Player y velocity should be calculated correctly when sliding down a wall ', () => {
    //Define player
    const testPlayer = new Player(1,1,80);

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
    testPlayer.sticksToWall = true;
    testPlayer.vY = 10;

    testPlayer.subCycle(1);
    

    
    expect(testPlayer.previousvY).toBe(110)
})

//TC27:- Player y velocity must not exceed wall fall down cap when sliding down a wall
it('Player y velocity must not exceed wall fall down cap when sliding down a wall', () => {
    //Define player
    const testPlayer = new Player(1,1,80);

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
    testPlayer.sticksToWall = true;
    testPlayer.vY = 100;

    testPlayer.subCycle(1);
    

    
    expect(testPlayer.previousvY).toBe(200)
})

//TC28:- Player cycle must call subcycle function for every frame per second
it('Player cycle must call subcycle function for every frame per second', () => {
    //Define player
    const testPlayer = new Player(1,1,80);

    jest.spyOn(testPlayer,'cycle');
    const sub = jest.spyOn(testPlayer,'subCycle')

    testPlayer.cycle(1)
    expect(sub).toBeCalledTimes(60)
})

//TC29:- If there is no block near the player, cancel wall stick
it('Player y velocity must not exceed wall fall down cap when sliding down a wall', () => {
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
