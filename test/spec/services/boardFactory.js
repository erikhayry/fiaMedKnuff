'use strict';

describe('Service: boardFactory', function () {

	// load the service's module
	beforeEach(module('fiaMedKnuffApp'));

	// instantiate service
	var boardFactory, playerFactory, settings, rules;

	//global variables
	var board;

	beforeEach(inject(function (_boardFactory_, _playerFactory_, _settings_, _rules_) {
		boardFactory = _boardFactory_;
		playerFactory = _playerFactory_;
		settings = _settings_;
		rules = _rules_;
	}));

	beforeEach(function () {
		board = boardFactory.buildBoard(playerFactory.createPlayers(5));
	});

	describe('rollDice()', function () {
		it('should return an integer between 1 and 6', function () {
			var diceVal = boardFactory.rollDice();
			expect(diceVal).toBeGreaterThan(0);
			expect(diceVal).toBeLessThan(7);
		});
	});

	describe('buildBoard()', function () {
		it('should build a board with players', function () {
			expect(board.players.length).toBe(5);
			expect(board.track.length).toBe(70);

			expect(board.players[0].yard.length).toBe(4);
			expect(board.players[1].yard.length).toBe(4);

			expect(board.players[0].finish.length).toBe(4);
			expect(board.players[1].finish.length).toBe(4);

			expect(board.players[0].yard[0]).toBe('0-0');
			expect(board.players[0].yard[1]).toBe('0-1');
			expect(board.players[0].yard[2]).toBe('0-2');
			expect(board.players[0].yard[3]).toBe('0-3');

			expect(board.players[1].yard[0]).toBe('1-0');
			expect(board.players[1].yard[1]).toBe('1-1');
			expect(board.players[1].yard[2]).toBe('1-2');
			expect(board.players[1].yard[3]).toBe('1-3');

		});
	});

	describe('moveToTrack()', function () {
		it('should move a players token to the correct starting tile', function () {

			boardFactory.moveToTrack('0-0', 6);
			expect(board.players[0].yard[0]).toBe('');
			expect(board.track[5][0][0]).toBe('0-0');

			boardFactory.moveToTrack('0-1', 1);
			expect(board.players[0].yard[1]).toBe('');
			expect(board.track[0][0][0]).toBe('0-1');

			boardFactory.moveToTrack('1-0', 6);
			expect(board.players[1].yard[0]).toBe('');
			expect(board.track[19][1][0]).toBe('1-0');

			boardFactory.moveToTrack('1-1', 1);
			expect(board.players[1].yard[1]).toBe('');
			expect(board.track[14][1][0]).toBe('1-1');

			var twoPlayerBoard = boardFactory.buildBoard(playerFactory.createPlayers(2));

			boardFactory.moveToTrack('0-0', 6);
			expect(twoPlayerBoard.players[0].yard[0]).toBe('');
			expect(twoPlayerBoard.track[5][0][0]).toBe('0-0');

			boardFactory.moveToTrack('1-0', 6);
			expect(twoPlayerBoard.players[1].yard[0]).toBe('');
			expect(twoPlayerBoard.track[33][1][0]).toBe('1-0');

		});

		it('should move a players token from the yard on to the track according to nest rule startAtTileDiceValue being true', function () {

			boardFactory.moveToTrack('0-0', 6);
			expect(board.players[0].yard[0]).toBe('');
			expect(board.track[5][0][0]).toBe('0-0');

			boardFactory.moveToTrack('0-1', 1);
			expect(board.players[0].yard[1]).toBe('');
			expect(board.track[0][0][0]).toBe('0-1');

			boardFactory.moveToTrack('0-2', 1);
			expect(board.players[0].yard[2]).toBe('');
			expect(board.track[0][0][1]).toBe('0-2');

			boardFactory.moveToTrack('1-0', 3);
			expect(board.players[1].yard[0]).toBe('1-0');
			expect(board.track[16]).toBeUndefined();

			boardFactory.moveToTrack('1-0', 6);
			expect(board.players[1].yard[0]).toBe('');
			expect(board.track[19][1][0]).toBe('1-0');

		});

		it('should move a players token from the yard on to the track according to nest rule startAtTileDiceValue being false', function () {

			rules.startAtTileDiceValue = false;

			boardFactory.moveToTrack('0-0', 6);
			expect(board.players[0].yard[0]).toBe('');
			expect(board.track[0][0][0]).toBe('0-0');

			boardFactory.moveToTrack('0-1', 1);
			expect(board.players[0].yard[1]).toBe('');
			expect(board.track[0][0][1]).toBe('0-1');

			boardFactory.moveToTrack('0-2', 1);
			expect(board.players[0].yard[2]).toBe('');
			expect(board.track[0][0][2]).toBe('0-2');

			boardFactory.moveToTrack('1-0', 3);
			expect(board.players[1].yard[0]).toBe('1-0');
			expect(board.track[16]).toBeUndefined();

			boardFactory.moveToTrack('1-0', 6);
			expect(board.players[1].yard[0]).toBe('');
			expect(board.track[14][1][0]).toBe('1-0');

		});

		it('should kick back any opponents standing on target tile', function () {

		});

	});

	describe('move()', function () {

		it('should if possible move a token forward on the track', function () {
			rules.startAtTileDiceValue = true;

			boardFactory.moveToTrack('0-0', 6);
			boardFactory.move('0-0', 5, 6);
			expect(board.track[11][0][0]).toBe('0-0');
			expect(board.track[5][0].length).toBe(0);

			boardFactory.moveToTrack('1-0', 6);
			boardFactory.move('1-0', 19, 6);
			expect(board.track[25][1][0]).toBe('1-0');
			expect(board.track[19][1].length).toBe(0);

		});

		it('should kick back any opponents standing on target tile', function () {
			boardFactory.moveToTrack('0-0', 6);
			boardFactory.moveToTrack('1-0', 1);
			boardFactory.move('0-0', 5, 9);

			expect(board.track[14][0][0]).toBe('0-0');
			expect(board.track[14][1].length).toBe(0);
			expect(board.players[1].yard[0]).toBe('1-0');

		});

		it('should move token to finish if lap completed', function () {

		});

	});

});
