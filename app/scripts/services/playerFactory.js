'use strict';

angular.module('fiaMedKnuffApp')
	.factory('playerFactory', [

		function () {
			var _players = [],
				_createPlayer = function (index) {
					_players.push({
						'name': 'Player ' + (_players.length + 1),
						'id': index
					});
				};

			return {
				createPlayers: function (numOfPlayers) {
					_players = [];
					for (var i = 0; i < numOfPlayers; i++) {
						_createPlayer(i);
					}
					return _players;
				}
			};
		}
	]);
