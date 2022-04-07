const Player = require('./playerMock');
const Constants = require('../config/constants.json');
const { limit } = require('./math')
const { rnd } = require('./math')
const mockRayCasting = require('../src/js/util/raycasting');


afterEach(() => {    
    jest.clearAllMocks();
    INPUT = {
        'jump': () => false,
        'left': () => false,
        'right': () => false,
    };
  });

  
//TC1:- Player parameters are initialized correctly  
it('Check initial value player', () => {
    //Declare and initialize variables
    var playerPreviousState = {};
    var initialBandanaTrail = [];
    //Create new player. Player starts at level 5 in x pos = 3 and y pos = 0
    const player = new Player(5,3,0);
    
    //Test to see if player is in correct initial states 
    expect(player.level)
    expect(player.x).toBe(3);
    expect(player.y).toBe(0);
    expect(player.level).toBe(5);

    expect(player.previous).toStrictEqual(playerPreviousState);
    expect(player.vX).toBe(0);
    expect(player.vY).toBe(0);
    expect(player.facing).toBe(1);
    expect(player.walking).toBeFalsy;
    expect(player.facingScale).toBe(1);

    expect(player.jumpHoldTime).toBe(0);
    expect(player.jumpReleased).toBeTruthy;
    expect(player.jumpStartY).toBe(0);
    expect(player.jumpEndY).toBe(0);
    expect(player.jumpPeakTime).toBe(0);
    expect(player.lastLanded).toEqual({x: 0, y: 0});
    expect(player.lastWallStick).toEqual({x: 0, y:0, direction:0});

    expect(player.stickingToWallX).toBe(0);
    expect(player.clock).toBe(0);
    expect(player.bandanaTrail).toEqual(initialBandanaTrail);
});

//TC2:- Player can not jump as key is being pressed (testing canJump function)
it('Player should not be able to jump if the jump key or button is being pressed', () => {
    //Define player
    const testPlayer = new Player(5,3,0);
    //Set jump released to false (player is still holding jump key)
    testPlayer.jumpReleased = false;
    
    const test = testPlayer.canJump;

    //Use mock implementation to test function. Set jumpReleased to true 
    expect(test).toBe(false);
})

//TC3:- Player can jump as key is free (testing canJump function)
it('Player should be able to jump if the jump key or button is free', () => {
    //Define player
    const testPlayer = new Player(5,3,0);
    //Set jump released to true (jump key is released)
    testPlayer.jumpReleased = true;

    //Define the necessary functions/objects required to run tests
    COYOTE_RADIUS = Constants.COYOTE_RADIUS;
    global.Math.dist = () => 0;
    distP = (x1, y1, x2, y2) => global.Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
    dist = (a, b) => distP(a.x, a.y, b.x, b.y);
    
    const test = testPlayer.canJump;

    //Use mock implementation to test function. Set jumpReleased to true 
    expect(test).toBe(true);
})

//TC4:- Player should not be in rising state (testing isRising function)
it('Player should not be in rising state if the jump key is not pressed', () => {
    //Define player
    const testPlayer = new Player(5,3,0);
    testPlayer.clock = 12
    testPlayer.jumpStartTime = 5;
    testPlayer.jumpPeakTime = 5;

    //Define the necessary functions/objects required to run tests
    COYOTE_RADIUS = Constants.COYOTE_RADIUS;
    global.Math.dist = () => 0;
    distP = (x1, y1, x2, y2) => global.Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
    dist = (a, b) => distP(a.x, a.y, b.x, b.y);
    
    const test = testPlayer.isRising;

    //Use mock implementation to test function. Set jumpReleased to true 
    expect(test).toBe(false);
})

//TC5:- Player should be in rising state (testing isRising function)
it('Player should be in set rising state if the jump key is pressed', () => {
    //Define player
    const testPlayer = new Player(5,3,0);
    testPlayer.clock = 10
    testPlayer.jumpStartTime = 4;
    testPlayer.jumpPeakTime = 12;

    //Define the necessary functions/objects required to run tests
    COYOTE_RADIUS = Constants.COYOTE_RADIUS;
    global.Math.dist = () => 0;
    distP = (x1, y1, x2, y2) => global.Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
    dist = (a, b) => distP(a.x, a.y, b.x, b.y);
    
    const test = testPlayer.isRising;

    //Use mock implementation to test function. Set jumpReleased to true 
    expect(test).toBe(true);
})


//TC6:- Player must not be able to double jump (testing canJump function)
it('Player must not be able to double jump', () => {
    //Define player
    const testPlayer = new Player(5,3,0);

    //Set the parameters to indicate that the player is in the air (jump key is released)
    testPlayer.clock = 10
    testPlayer.jumpStartTime = 4;
    testPlayer.jumpPeakTime = 12;

    //Define the necessary functions/objects required to run tests
    COYOTE_RADIUS = Constants.COYOTE_RADIUS;
    distP = (x1, y1, x2, y2) => global.Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
    dist = (a, b) => distP(a.x, a.y, b.x, b.y);
    
    const test = testPlayer.canJump;

    //Use mock implementation to test function. Set jumpReleased to true 
    expect(test).toBe(false);
})

//TC7:- Player must be able to jump if they are not in rising state (testing canJump function)
it('Player must be able to jump if they are not in rising state', () => {
    //Define player
    const testPlayer = new Player(5,3,0);

    //Set the parameters to indicate that the player is in the air (jump key is released)
    testPlayer.clock = 10
    testPlayer.jumpStartTime = 3;
    testPlayer.jumpPeakTime = 6;

    //Define the necessary functions/objects required to run tests
    COYOTE_RADIUS = Constants.COYOTE_RADIUS;
    distP = (x1, y1, x2, y2) => global.Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
    dist = (a, b) => distP(a.x, a.y, b.x, b.y);
    
    const test = testPlayer.canJump;

    //Use mock implementation to test function. Set jumpReleased to true 
    expect(test).toBe(true);
})

//TC8:- Player must be able to wall jump (testing canJump function)
it('Player must be able to wall jump if they are near a wall', () => {
    //Define player
    const testPlayer = new Player(5,3,0);

    //Set the parameters to indicate that the player is in the air (jump key is released)
    testPlayer.clock = 10
    testPlayer.jumpStartTime = 4;
    testPlayer.jumpPeakTime = 14;
    testPlayer.sticksToWall = true;

    //Define the necessary functions/objects required to run tests
    COYOTE_RADIUS = Constants.COYOTE_RADIUS;
    global.Math.dist = () => 0;
    distP = (x1, y1, x2, y2) => global.Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
    dist = (a, b) => distP(a.x, a.y, b.x, b.y);
    
    const test = testPlayer.canJump;

    //Use mock implementation to test function. Set jumpReleased to true 
    expect(test).toBe(true);
})


//TC9:- Player must not be able to jump if they have not landed recently (testing canJump function)
it('Player must not be able to jump again if they have landed recently', () => {
    //Define player
    const testPlayer = new Player(5,0,0);

    //Set the parameters to indicate that the player is in the air (jump key is released)
    testPlayer.jumpReleased = true;
    testPlayer.sticksToWall = true;
    testPlayer.lastWallStick.x = 30
    
    testPlayer.lastLanded.x = 6
    testPlayer.lastLanded.y = 4

    COYOTE_RADIUS = Constants.COYOTE_RADIUS;
    COYOTE_RADIUS_WALLJUMP = Constants.COYOTE_RADIUS_WALLJUMP;

    distP = (x1, y1, x2, y2) => global.Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
    dist = (a, b) => distP(a.x, a.y, b.x, b.y);


    const test = testPlayer.canJump;


    //Use mock implementation to test function. Set jumpReleased to true 
    expect(test).toBe(false);
})

//TC10:- Player must be able to jump if they have landed recently (testing canJump function)
it('Player must be able to jump again if they have landed recently', () => {
    //Define player
    const testPlayer = new Player(5,0,0);

    //Set the parameters to indicate that the player is in the air (jump key is released)
    testPlayer.jumpReleased = true;
    testPlayer.sticksToWall = true;
    testPlayer.lastWallStick.x = 10
    
    testPlayer.lastLanded.x = 3
    testPlayer.lastLanded.y = 2

    COYOTE_RADIUS = Constants.COYOTE_RADIUS;
    COYOTE_RADIUS_WALLJUMP = Constants.COYOTE_RADIUS_WALLJUMP;

    distP = (x1, y1, x2, y2) => global.Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
    dist = (a, b) => distP(a.x, a.y, b.x, b.y);


    const test = testPlayer.canJump;


    //Use mock implementation to test function. Set jumpReleased to true 
    expect(test).toBe(true);
})


//TC11:- Players previous states must be initialized correctly
it('Players previous states must be initialized correctly', () => {
    global.Math.random = () => 3;
    //Define player
    const testPlayer = new Player(5,3,0);

    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    CELL_SIZE = Constants.CELL_SIZE
    global.Math.random = () => 1

    hasBlock = (x, y, radius = 0) => {
        return true
    }

    INPUT = {
        'jump': () => false,
        'left': () => false,
        'right': () => false,
    };

    
    
    jest.spyOn(testPlayer,'subCycle');

    testPlayer.subCycle(3);

    expect(testPlayer.previous.x).toBe(3);
    expect(testPlayer.previous.y).toBe(0);
    expect(testPlayer.previous.clock).toBe(0);
    expect(testPlayer.previous.facing).toBe(1);
    expect(testPlayer.previous.landed).toBe(true);
    expect(testPlayer.previous.jumpHoldTime).toBe(0);
})

//TC12:- Player clock is updated correctly with every subcycle
it('Players clock increments correctly', () => {
    global.Math.random = () => 3;
    //Define player
    const testPlayer = new Player(5,3,0);

    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    CELL_SIZE = Constants.CELL_SIZE

    INPUT = {
        'jump': () => false,
        'left': () => false,
        'right': () => false,
    };
    
    hasBlock = (x, y, radius = 0) => {
        return true
    }

    jest.spyOn(testPlayer,'subCycle');

    testPlayer.subCycle(5);
    testPlayer.subCycle(5);
    testPlayer.subCycle(5);
    
    expect(testPlayer.clock).toBe(15)
})

//TC13 - When the player holds the jump key, the player's jump hold time needs to be increased for every second the key/button is held down
it('Player jump hold time is incremented correctly', () => {
    global.Math.random = () => 3;
    //Define player
    const testPlayer = new Player(5,3,0);

    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    MAX_JUMP_HOLD_TIME = Constants.MAX_JUMP_HOLD_TIME

    CELL_SIZE = Constants.CELL_SIZE

    INPUT = {
        'jump': () => true,
        'left': () => false,
        'right': () => false,
    };
    
    hasBlock = (x, y, radius = 0) => {
        return true
    }

    var i = 0;
    jumpSound = () => {
        i++;
    }

    easeOutQuad = t => t * (2 - t);

    jest.spyOn(testPlayer,'subCycle');

    testPlayer.subCycle(4);

    expect(testPlayer.jumpHoldTime).toBe(4)
})
//TC14 - Player jump hold time should be equal to zero if the player does not input jump key
it('Player jumphold time should be equal to zero if the player does not input jump key', () => {
    global.Math.random = () => 3;
    //Define player
    const testPlayer = new Player(5,3,0);

    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    MAX_JUMP_HOLD_TIME = Constants.MAX_JUMP_HOLD_TIME

    CELL_SIZE = Constants.CELL_SIZE

    INPUT = {
        'jump': () => false,
        'left': () => false,
        'right': () => false,
    };
    
    hasBlock = (x, y, radius = 0) => {
        return true
    }

    var i = 0;
    jumpSound = () => {
        i++;
    }

    easeOutQuad = t => t * (2 - t);

    jest.spyOn(testPlayer,'subCycle');

    testPlayer.subCycle(6);

    expect(testPlayer.jumpHoldTime).toBe(0)
})

//TC15 - Player jump variables are initialized correctly if the player can jump and is holding the jump key
it('The player jump variables should be initialized correctly if the player is able to jump', () => {
    global.Math.random = () => 3;
    //Define player
    const testPlayer = new Player(5,3,5);

    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    MAX_JUMP_HOLD_TIME = Constants.MAX_JUMP_HOLD_TIME
    COYOTE_RADIUS_WALLJUMP = Constants.COYOTE_RADIUS_WALLJUMP;

    CELL_SIZE = Constants.CELL_SIZE

    INPUT = {
        'jump': () => true,
        'left': () => false,
        'right': () => false,
    };
    
    hasBlock = (x, y, radius = 0) => {
        return true
    }

    var i = 0;
    jumpSound = () => {
        i++;
    }

    easeOutQuad = t => t * (2 - t);

    jest.spyOn(testPlayer,'subCycle');

    testPlayer.subCycle(8);

    expect(testPlayer.jumpReleased).toBeFalsy
    expect(testPlayer.jumpStartY).toBe(5)
    expect(testPlayer.jumpStartTime).toBe(8)
})

//TC16:- Jump sound is played once when player inputs jump key
it('Jump sound is played when player inputs jump key', () => {
    global.Math.random = () => 3;
    //Define player
    const testPlayer = new Player(5,3,0);

    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    MAX_JUMP_HOLD_TIME = Constants.MAX_JUMP_HOLD_TIME

    CELL_SIZE = Constants.CELL_SIZE

    INPUT = {
        'jump': () => true,
        'left': () => false,
        'right': () => false,
    };
    
    hasBlock = (x, y, radius = 0) => {
        return true
    }

    var i = 0;
    jumpSound = () => {
        i++;
    }

    easeOutQuad = t => t * (2 - t);

    jest.spyOn(testPlayer,'subCycle');

    testPlayer.subCycle(5);

    expect(i).toBe(1)
})

//TC17:- Player jumpPeakTime and end position should be calculated corrected when the player is presses jump key
it('Player jumpPeakTime and end position should be calculated corrected', () => {
    global.Math.random = () => 3;
    //Define player
    const testPlayer = new Player(5,3,300);

    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    MAX_JUMP_HOLD_TIME = Constants.MAX_JUMP_HOLD_TIME

    CELL_SIZE = Constants.CELL_SIZE

    INPUT = {
        'jump': () => true,
        'left': () => false,
        'right': () => false,
    };
    
    hasBlock = (x, y, radius = 0) => {
        return true
    }

    var i = 0;
    jumpSound = () => {
        i++;
    }

    easeOutQuad = t => t * (2 - t);

    
    jest.spyOn(testPlayer,'subCycle');

    testPlayer.subCycle(5);
    testPlayer.jumpReleased = false;
    expect(testPlayer.jumpPeakTime).toBeCloseTo(0.3)
    expect(testPlayer.jumpEndY).toBeCloseTo(161,-1)
})

//TC18:- Player y value rises up correctly when jump key is pressed and in rising state
it('Ensure that player rises up correctly when jump key is pressed', () => {
    global.Math.random = () => 3;
    //Define player
    const testPlayer = new Player(1,1,7);

    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    MAX_JUMP_HOLD_TIME = Constants.MAX_JUMP_HOLD_TIME

    CELL_SIZE = Constants.CELL_SIZE

    INPUT = {
        'jump': () => true,
        'left': () => false,
        'right': () => false,
    };
    
    hasBlock = (x, y, radius = 0) => {
        return true
    }

    var i = 0;
    jumpSound = () => {
        i++;
    }

    easeOutQuad = t => t * (2 - t);

    testPlayer.clock = 5
    testPlayer.jumpStartTime = 7;
    testPlayer.jumpPeakTime = 0.16;
    this.jumpStartY = 7
    testPlayer.jumpEndY = 4
    
    jest.spyOn(testPlayer,'subCycle');

    testPlayer.subCycle(5);

    expect(testPlayer.y).toBeCloseTo(7)
})

//TC19:- Player y velocity should be zero when in falling state
it('Player y velocity is calculated correctly when falling', () => {
    global.Math.random = () => 3;
    //Define player
    const testPlayer = new Player(1,1,70);

    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    MAX_JUMP_HOLD_TIME = Constants.MAX_JUMP_HOLD_TIME

    CELL_SIZE = Constants.CELL_SIZE

    INPUT = {
        'jump': () => false,
        'left': () => false,
        'right': () => false,
    };
    
    hasBlock = (x, y, radius = 0) => {
        return true
    }

    var i = 0;
    jumpSound = () => {
        i++;
    }

    easeOutQuad = t => t * (2 - t);

    
    jest.spyOn(testPlayer,'subCycle');

    testPlayer.subCycle(0.1);
    testPlayer.jumpStartTime = 0.27;
    testPlayer.jumpPeakTime = 0.166;



    expect(testPlayer.y).toBeCloseTo(110)
})

//TC20:- Player y value should be calculated corectly when jumping off wall
it('Player y value should be calculated corectly when jumping off wall', () => {
    global.Math.random = () => 3;
    //Define player
    const testPlayer = new Player(1,1,80);

    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    MAX_JUMP_HOLD_TIME = Constants.MAX_JUMP_HOLD_TIME

    CELL_SIZE = Constants.CELL_SIZE

    INPUT = {
        'jump': () => false,
        'left': () => false,
        'right': () => false,
    };
    
    hasBlock = (x, y, radius = 0) => {
        return true
    }

    var i = 0;
    jumpSound = () => {
        i++;
    }

    easeOutQuad = t => t * (2 - t);

    
    jest.spyOn(testPlayer,'subCycle');

    testPlayer.subCycle(0.1);
    testPlayer.jumpStartTime = 17.67;
    testPlayer.jumpPeakTime = 0.3;
    testPlayer.vY = 12;
    testPlayer.sticksToWall = true;
    expect(testPlayer.y).toBeCloseTo(120)
})

//TC21:- Player x velocity value should be calculated correctly when jumping off a wall
it('Player x velocity value should be calculated correctly when jumping off a wall', () => {
    global.Math.random = () => 3;
    //Define player
    const testPlayer = new Player(1,1,80);

    PLAYER_RADIUS = Constants.PLAYER_RADIUS;
    LEVEL_WIDTH = 10;
    LEVEL_HEIGHT = 10;
    GRAVITY_ACCELERATION = Constants.GRAVITY_ACCELERATION;
    PLAYER_HORIZONTAL_FLIGHT_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLIGHT_ACCELERATION
    PLAYER_HORIZONTAL_FLOOR_ACCELERATION = Constants.PLAYER_HORIZONTAL_FLOOR_ACCELERATION
    MAX_JUMP_HOLD_TIME = Constants.MAX_JUMP_HOLD_TIME

    CELL_SIZE = Constants.CELL_SIZE

    INPUT = {
        'jump': () => true,
        'left': () => false,
        'right': () => false,
    };
    
    hasBlock = (x, y, radius = 0) => {
        return true
    }

    var i = 0;

    jumpSound = () => {
        i++;
    }

    easeOutQuad = t => t * (2 - t);

    testPlayer.sticksToWall = true;
    testPlayer.lastWallStick.direction = 1;
    jest.spyOn(testPlayer,'subCycle');
    testPlayer.subCycle(1);
    

    
    expect(testPlayer.previousvX).toBe(800)
})




