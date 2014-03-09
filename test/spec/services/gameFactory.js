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
		players = playerFactory.createPlayers(3);
	}));

	describe('createGame()', function () {
		it('should return a new game', function () {
			var game = gameFactory.createGame(players);

			expect(game).toBeDefined();
			expect(game.id).toBeDefined();

			expect(game.rules.startAtTileDiceValue).toBe(true);
			expect(game.settings.tilesPerPlayer).toBe(14);

			rules.startAtTileDiceValue = false;
			settings.tilesPerPlayer = 15;

			var game2 = gameFactory.createGame(players);

			expect(game.rules.startAtTileDiceValue).toBe(true);
			expect(game2.rules.startAtTileDiceValue).toBe(false);

			expect(game.settings.tilesPerPlayer).toBe(14);
			expect(game2.settings.tilesPerPlayer).toBe(15);

		});
	});

	describe('getGame()', function () {
		it('should return a game', function () {
			var game = gameFactory.createGame(players),
				newGame = gameFactory.getGame(game.id),
				newGame2 = gameFactory.getGame(1);

			expect(newGame).toBeDefined();
			expect(newGame.id).toEqual(game.id);
			expect(newGame2).toBe(null);
		});
	});

	describe('getGames()', function () {
		it('should return all games', function () {
			gameFactory.createGame(players);
			gameFactory.createGame(players);
			gameFactory.createGame(players);

			var games = gameFactory.getGames();

			expect(games.length).toBe(3);
		});
	});

});
