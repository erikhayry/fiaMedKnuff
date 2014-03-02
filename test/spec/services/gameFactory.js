'use strict';

describe('Service: gameFactory', function () {

	// load the service's module
	beforeEach(module('fiaMedKnuffApp'));

	// instantiate service
	var gameFactory, playerFactory, rules, settings, players, currentRules = {}, currentSettings = {};

	beforeEach(inject(function (_gameFactory_, _playerFactory_, _rules_, _settings_) {
		gameFactory = _gameFactory_;
		playerFactory = _playerFactory_;
		rules = _rules_;
		settings = _settings_;
		players = playerFactory.createPlayers(3);

		for (var rule in rules) {
			currentRules[rule] = rules[rule];
		}

		for (var setting in settings) {
			currentSettings[setting] = rules[setting];
		}

	}));

	describe('createGame()', function () {
		it('should return a new game', function () {
			var game = gameFactory.createGame(players, currentRules, currentSettings);

			expect(game.rules.startAtTileDiceValue).toBe(true);

			rules.startAtTileDiceValue = false;

			//for (var rule in rules) {
			currentRules = Object.create(rules);
			//}

			var game2 = gameFactory.createGame(players, currentRules, currentSettings);

			expect(game).toBeDefined();
			expect(game.id).toBeDefined();

			expect(game.rules.startAtTileDiceValue).toBe(true);
			expect(game2.rules.startAtTileDiceValue).toBe(false);

		});
	});

	describe('getGame()', function () {
		it('should return a game', function () {
			var game = gameFactory.createGame(players, currentRules, currentSettings),
				newGame = gameFactory.getGame(game.id),
				newGame2 = gameFactory.getGame(1);

			expect(newGame).toBeDefined();
			expect(newGame.id).toEqual(game.id);
			expect(newGame2).toBe(null);
		});
	});

	describe('getGames()', function () {
		it('should return all games', function () {
			gameFactory.createGame(players, currentRules, currentSettings);
			gameFactory.createGame(players, currentRules, currentSettings);
			gameFactory.createGame(players, currentRules, currentSettings);

			var games = gameFactory.getGames();

			expect(games.length).toBe(3);
		});
	});

});
