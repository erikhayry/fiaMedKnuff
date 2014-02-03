'use strict';

describe('Service: playerFactory', function () {

	// load the service's module
	beforeEach(module('fiaMedKnuffApp'));

	// instantiate service
	var playerFactory;
	beforeEach(inject(function (_playerFactory_) {
		playerFactory = _playerFactory_;
	}));

	describe('createPlayers()', function () {
		it('should create and return players', function () {
			var players = playerFactory.createPlayers(4);
			players = playerFactory.createPlayers(2);

			expect(players.length).toBe(2);

			expect(players[0].name).toBe('Player 1');
			expect(players[1].name).toBe('Player 2');
		});
	});
});
