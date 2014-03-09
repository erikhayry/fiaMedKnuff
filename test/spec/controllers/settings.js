'use strict';

describe('Controller: SettingsCtrl', function () {

	// load the controller's module
	beforeEach(module('fiaMedKnuffApp'));

	var SettingsCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		SettingsCtrl = $controller('SettingsCtrl', {
			$scope: scope
		});
	}));

	it('should attach a list of settings to the scope', function () {
		expect(scope.settings).toBeDefined();
	});
});
