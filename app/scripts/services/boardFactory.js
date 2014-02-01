'use strict';

angular.module('fiaMedKnuffApp')
	.factory('boardFactory', [

		function () {
			var _board = [
        'track' : new Array(56),
        'players' : []
      ]
			// Public API here
			return {
				
        rollDice: function () {
					return Math.round(Math.random() * 5) + 1;
				},

        buildBoard: function(players){
          for (var i = 0; i < players.length; i++) {
            for (var j = players[i].tokens.length - 1; j >= 0; j--) {
              [j]
            };
          };
        }

			};
		}
	]);
