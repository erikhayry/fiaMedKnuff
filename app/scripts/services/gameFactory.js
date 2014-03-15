'use strict';

angular.module('fiaMedKnuffApp')
	.factory('gameFactory', function (boardFactory) {
		var games = [];

		return {
			createGame: function (players, rules, settings) {
				var game = {
					id: Date.now(),
					rules: {
						'canLeaveNestValues': rules.canLeaveNestValues,
						'startAtTileDiceValue': rules.startAtTileDiceValue
					},
					settings: {
						'numberOfTokens': settings.numberOfTokens,
						'tilesPerPlayer': settings.tilesPerPlayer
					},
					board: boardFactory.buildBoard(players, rules, settings)
				};

				games.push(game);

				return game;
			},

			getGame: function (id) {
				for (var i = 0; i < games.length; i++) {
					if (games[i].id === parseInt(id)) {
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
