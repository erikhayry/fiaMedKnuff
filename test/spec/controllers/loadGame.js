'use strict';

describe('Controller: LoadgameCtrl', function () {

	// load the controller's module
	beforeEach(module('fiaMedKnuffApp'));

	var LoadgameCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		LoadgameCtrl = $controller('LoadgameCtrl', {
			$scope: scope
		});
	}));

	it('should attach a list of awesomeThings to the scope', function () {
		expect(scope.awesomeThings.length).toBe(3);
	});
});
