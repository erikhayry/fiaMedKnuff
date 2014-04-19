'use strict';

describe('Service: gameFactory', function () {

	// load the service's module
	beforeEach(module('fiaMedKnuffApp'));

	// instantiate service
	var gameFactory, playerFactory, players, rules, settings;

	beforeEach(inject(function (_gameFactory_, _playerFactory_, _rules_, _settings_) {
		gameFactory = _gameFactory_;
		playerFactory = _playerFactory_;
		rules = _rules_;
		settings = _settings_;
		players = playerFactory.createPlayers(4);
	}));

	describe('createGame()', function () {
		it('should return a new game', function () {
			rules.startAtTileDiceValue = true;
			settings.tilesPerPlayer = 14;
			settings.numberOfTokens = 4;

			var game = gameFactory.createGame(players, rules, settings);

			expect(game).toBeDefined();
			expect(game.id).toBeDefined();

			//rules
			expect(game.rules.startAtTileDiceValue).toBe(true);
			expect(game.rules.canLeaveNestValues['1']).toBe(true);
			expect(game.rules.canLeaveNestValues['6']).toBe(true);
			
			//settings
			expect(game.settings.tilesPerPlayer).toBe(14);
			expect(game.settings.numberOfTokens).toBe(4);

			//board
			expect(game.board).toBeDefined();

			//game variables
			expect(game.gameState).toBe('start');
			expect(game.currentPlayerId).toBe(0);

			//starting round
			expect(game.startingRound.players.length).toBe(4);
			expect(game.startingRound.winner.length).toBe(0);
			expect(game.startingRound.diceVal).toBe(0);


			//update rules and settings and create another game
			rules.startAtTileDiceValue = false;
			settings.tilesPerPlayer = 15;

			var game2 = gameFactory.createGame(players, rules, settings);

			expect(game.rules.startAtTileDiceValue).toBe(true);
			expect(game2.rules.startAtTileDiceValue).toBe(false);

			expect(game.settings.tilesPerPlayer).toBe(14);
			expect(game2.settings.tilesPerPlayer).toBe(15);

		});
	});

	describe('getGame()', function () {
		it('should return a game', function () {
			var game = gameFactory.createGame(players, rules, settings),
				newGame = gameFactory.getGame(game.id),
				newGame2 = gameFactory.getGame(1);

			expect(newGame).toBeDefined();
			expect(newGame.id).toEqual(game.id);
			expect(newGame2).toBe(null);
		});
	});

	describe('getGames()', function () {
		it('should return all games', function () {
			gameFactory.createGame(players, rules, settings);
			gameFactory.createGame(players, rules, settings);
			gameFactory.createGame(players, rules, settings);

			var games = gameFactory.getGames();

			expect(games.length).toBe(3);
		});
	});

	describe('startRound()', function () {
		var game, startRound;
		beforeEach(function(){
			game = gameFactory.createGame(players, rules, settings);
			startRound = gameFactory.startRound(game, 0, 4);
		});

		it('should do a start round for one player', function () {
			expect(game.startingRound.players.length).toBe(3);
			expect(game.startingRound.players[0]).toBe(1);
			expect(game.startingRound.players[1]).toBe(2);
			expect(game.startingRound.players[2]).toBe(3);

			expect(game.startingRound.winner.length).toBe(1);
			expect(game.startingRound.winner[0]).toBe(0);
			
			expect(game.startingRound.diceVal).toBe(4);

			expect(startRound.currentPlayerId).toBe(1);
			expect(startRound.gameState).toBe('start');
		});

		it('should update current winner when new high roll', function () {
			startRound = gameFactory.startRound(game, 1, 5);

			expect(game.startingRound.players.length).toBe(2);
			expect(game.startingRound.players[0]).toBe(2);
			expect(game.startingRound.players[1]).toBe(3);

			expect(game.startingRound.winner.length).toBe(1);
			expect(game.startingRound.winner[0]).toBe(1);
			
			expect(game.startingRound.diceVal).toBe(5);

			expect(startRound.currentPlayerId).toBe(2);
			expect(startRound.gameState).toBe('start');
		});

		it('should update current winner when current high roll is matched', function () {
			gameFactory.startRound(game, 1, 5);
			startRound = gameFactory.startRound(game, 2, 5);

			expect(game.startingRound.players.length).toBe(1);
			expect(game.startingRound.players[0]).toBe(3);

			expect(game.startingRound.winner.length).toBe(2);
			expect(game.startingRound.winner[0]).toBe(1);
			expect(game.startingRound.winner[1]).toBe(2);
			
			expect(game.startingRound.diceVal).toBe(5);

			expect(startRound.currentPlayerId).toBe(3);
			expect(startRound.gameState).toBe('start');
		});

		it('should start new round if no winner is found', function () {
			gameFactory.startRound(game, 1, 5);
			gameFactory.startRound(game, 2, 5);
			startRound = gameFactory.startRound(game, 3, 4);

			expect(game.startingRound.players.length).toBe(2);
			expect(game.startingRound.players[0]).toBe(1);
			expect(game.startingRound.players[1]).toBe(2);

			expect(game.startingRound.winner.length).toBe(0);
			expect(game.startingRound.diceVal).toBe(0);

			expect(startRound.currentPlayerId).toBe(1);
			expect(startRound.gameState).toBe('start');
		});

		it('should start game if there is a starting round winner', function () {
			gameFactory.startRound(game, 1, 5);
			gameFactory.startRound(game, 2, 5);
			gameFactory.startRound(game, 3, 4);
			gameFactory.startRound(game, 1, 6);
			startRound = gameFactory.startRound(game, 2, 4);

			expect(game.startingRound.players.length).toBe(0);

			expect(game.startingRound.winner.length).toBe(1);
			expect(game.startingRound.winner[0]).toBe(1);
			expect(game.startingRound.diceVal).toBe(6);

			expect(startRound.currentPlayerId).toBe(1);
			expect(startRound.gameState).toBe('game');
		});

	});


});
