'use strict';

describe('Controller: NewgameCtrl', function () {

	// load the controller's module
	beforeEach(module('fiaMedKnuffApp'));

	var NewgameCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		NewgameCtrl = $controller('NewgameCtrl', {
			$scope: scope
		});
	}));
});
