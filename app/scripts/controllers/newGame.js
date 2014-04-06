'use strict';

angular.module('fiaMedKnuffApp')
	.controller('NewgameCtrl', function ($scope, $window, rules, settings, playerFactory, gameFactory) {
		$scope.players = playerFactory.createPlayers(2);

		//Rules
		$scope.rules = {
			canLeaveNestValues: {
				'1': rules.canLeaveNestValues['1'],
				'2': rules.canLeaveNestValues['2'],
				'3': rules.canLeaveNestValues['3'],
				'4': rules.canLeaveNestValues['4'],
				'5': rules.canLeaveNestValues['5'],
				'6': rules.canLeaveNestValues['6']
			},
			startAtTileDiceValue: rules.startAtTileDiceValue
		};

		//Settings
		$scope.settings = {
			tilesPerPlayer: settings.tilesPerPlayer,
			numberOfTokens: settings.numberOfTokens
		};

		$scope.startNewGame = function (players, rules, settings) {
			var _game = gameFactory.createGame(players, rules, settings);
			$window.location.href = '/game/' + _game.id;
		};
	});
