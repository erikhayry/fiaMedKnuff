'use strict';

angular.module('fiaMedKnuffApp')
	.controller('SettingsCtrl', function ($scope, settings) {
		$scope.settings = settings;

		$scope.update = function (key, val) {
			settings[key] = val;
		};
	});
