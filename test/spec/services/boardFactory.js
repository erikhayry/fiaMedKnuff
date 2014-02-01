'use strict';

describe('Service: boardFactory', function () {

	// load the service's module
	beforeEach(module('fiaMedKnuffApp'));

	// instantiate service
	var boardFactory, playerFactory;
	beforeEach(inject(function (_boardFactory_, _playerFactory_) {
    boardFactory = _boardFactory_;
		playerFactory = _playerFactory_;
	}));

	describe('rollDice()', function () {
		it('should return an integer between 1 and 6', function () {
			var diceVal = boardFactory.rollDice();
			expect(diceVal).toBeGreaterThan(0);
			expect(diceVal).toBeLessThan(7);
		});
	});

  describe('buildBoard()', function () {
    it('should build a board with players', function () {
      var board = boardFactory.buildBoard(playerFactory.createPlayers(2));

      expect(board.track.length).toBe(56);

      expect(board.players[0].yard.length).toBe(4);
      expect(board.players[1].yard.length).toBe(4);

      expect(board.players[0].finish.length).toBe(4);
      expect(board.players[1].finish.length).toBe(4);

      expect(board.players[0].yard[0]).toBe('0-0');
      expect(board.players[0].yard[0]).toBe('0-1');
      expect(board.players[0].yard[0]).toBe('0-2');
      expect(board.players[0].yard[0]).toBe('0-3');

      

    });
  });



});
