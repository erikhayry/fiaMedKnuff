'use strict';

angular.module('fiaMedKnuffApp')
	.factory('playerFactory', [

		function () {
			var _players = [],
				_createPlayer = function () {
					_players.push({
						'name': 'Player ' + (_players.length + 1),
						'tokens': [{
              'position': -1,
							'id': _players.length + '-0',
						}, {
							'position': -1,
              'id': _players.length + '-1',
						}, {
							'position': -1,
              'id': _players.length + '-2',
						}, {
							'position': -1,
              'id': _players.length + '-3',
						}]
					});
				};

			// Public API here
			return {
				createPlayers: function (numOfPlayers) {
					for (var i = numOfPlayers - 1; i >= 0; i--) {
						_createPlayer();
					}
					return _players;
				}
			};
		}
	]);
