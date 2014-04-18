'use strict';

angular.module('fiaMedKnuffApp')
	.directive('fmkBoard', function () {
		return {
			templateUrl: 'templates/fmkBoard.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				console.log(attrs.fmkPlayers);
				console.log(attrs.fmkTrack);
			}
		};
	});
