const Player = require('./player');
jest.mock('./player');


it('Check initial value player', () => {
    const player = new Player(0,0,0);
    expect(player.walking).toBeFalsy;
});
