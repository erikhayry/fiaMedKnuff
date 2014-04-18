'use strict';

angular.module('fiaMedKnuffApp')
	.controller('GameCtrl', function ($scope, $routeParams, gameFactory, boardFactory, rules, settings, playerFactory) {
		//temp
		var _rules = rules;
		var _settings = settings;
		var _players = playerFactory.createPlayers(4);
		//endTemp

		//dice
		$scope.diceVal = boardFactory.rollDice();

		//get and set board and players
		$scope.id = $routeParams.id;
		var _game = gameFactory.createGame(_players, _rules, _settings); //gameFactory.getGame($routeParams.id);
		console.log(_game);

		$scope.players = _game.board.players;
		$scope.track = _game.board.track;

		//games states (start, game, end)
		$scope.gameState = _game.gameState;

		//round states (roll, moving)
		$scope.roundState = _game.roundState;

		//current player
		$scope.currentPlayerId = _game.currentPlayerId;

		$scope.rollDice = function () {
			var _diceVal = boardFactory.rollDice();

			if ($scope.gameState === 'start') {
				console.log('State: start');

				var _startRound = gameFactory.startRound(_game, $scope.currentPlayerId, _diceVal);
				$scope.gameState = _startRound.gameState;
				$scope.currentPlayerId = _startRound.currentPlayerId;

			} else {
				console.log('State: game');
			}

			$scope.diceVal = _diceVal;
		};

	});
