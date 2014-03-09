'use strict';

angular.module('fiaMedKnuffApp')
	.factory('playerFactory', [

		function () {
			var _players = [],
				_createPlayer = function () {
					_players.push({
						'name': 'Player ' + (_players.length + 1)
					});
				};

			return {
				createPlayers: function (numOfPlayers) {
					_players = [];
					for (var i = 0; i < numOfPlayers; i++) {
						_createPlayer();
					}
					return _players;
				}
			};
		}
	]);
