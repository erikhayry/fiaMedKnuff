'use strict';

angular.module('fiaMedKnuffApp')
	.factory('gameFactory', function (boardFactory) {
		// Service logic
		// ...

		var games = [];

		// Public API here
		return {

			createGame: function (players, rules, settings) {
				var game = {};
				game.id = Date.now();
				game.rules = rules;
				game.settings = settings;
				game.board = boardFactory.buildBoard(players);

				games.push(game);

				return game;
			},

			getGame: function (id) {
				for (var i = 0; i < games.length; i++) {
					if (games[i].id === id) {
						return games[i];
					}
				}
				return null;
			},

			getGames: function () {
				return games;
			}
		};
	});
