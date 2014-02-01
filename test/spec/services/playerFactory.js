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
			var players = playerFactory.createPlayers(2);
			
      expect(players.length).toBe(2);

      expect(players[0].name).toBe('Player 1');
      expect(players[1].name).toBe('Player 2');
      
      expect(players[0].tokens.length).toBe(4);
      expect(players[1].tokens.length).toBe(4);


      for (var i = players.length - 1; i >= 0; i--) {
        for (var j = 0; j < players[i].tokens.length; j++) {
          expect(players[i].tokens[j].position).toBe(-1);
          expect(players[i].tokens[j].id).toBe(i + '-' + j);
        }
      }

    });
	});
});
