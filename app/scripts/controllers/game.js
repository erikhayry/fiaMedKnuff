'use strict';

angular.module('fiaMedKnuffApp')
	.controller('GameCtrl', ['$scope', 'boardFactory',
		function ($scope, boardFactory) {
			$scope.awesomeThings = [
				'HTML5 Boilerplate',
				'AngularJS',
				'Karma'
			];
			console.log(boardFactory.rollDice());
		}
	]);
