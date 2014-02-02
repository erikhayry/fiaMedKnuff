'use strict';

angular.module('fiaMedKnuffApp')
	.factory('playerFactory', [
		function () {
      /*
        players structure
        [
          {
            'name' : 'Player 1'            
          }
        ]

       */
			var _players = [],
				_createPlayer = function () {
					_players.push({
						'name': 'Player ' + (_players.length + 1)            
					});
				};

			// Public API here
			return {
				createPlayers: function (numOfPlayers) {
					_players = [];
          for (var i = numOfPlayers - 1; i >= 0; i--) {
						_createPlayer();
					}
					return _players;
				}
			};
		}
	]);
