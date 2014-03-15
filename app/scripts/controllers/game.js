'use strict';

angular.module('fiaMedKnuffApp')
	.controller('GameCtrl', function ($scope, $routeParams, gameFactory) {
		$scope.id = $routeParams.id;
		$scope.board = gameFactory.getGame($routeParams.id);
		console.log($scope.board);
	});
