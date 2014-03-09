'use strict';

angular.module('fiaMedKnuffApp')
	.factory('gameFactory', function (boardFactory, rules, settings) {
		var games = [];

		return {
			createGame: function (players) {
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
					board: boardFactory.buildBoard(players)
				};

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
