'use strict';

angular.module('fiaMedKnuffApp')
	.controller('GameCtrl', function ($scope, $routeParams, gameFactory, boardFactory, rules, settings, playerFactory) {
		//temp
		var rules = rules;
		var settings = settings;
		var players = playerFactory.createPlayers(2);
		//endTemp

		//dice
		$scope.diceVal = boardFactory.rollDice();

		//get and set board and players
		$scope.id = $routeParams.id;
		var _game = gameFactory.createGame(players, rules, settings)        //gameFactory.getGame($routeParams.id);
		console.log(_game);
		$scope.players = _game.board.players;
		$scope.track = _game.board.track;


		//current player
		$scope.currentPlayer = $scope.players[0];

		$scope.rollDice = function(){
			$scope.diceVal = boardFactory.rollDice();
		}

	});
