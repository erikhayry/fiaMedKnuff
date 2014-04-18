'use strict';

angular.module('fiaMedKnuffApp')
	.factory('gameFactory', function (boardFactory) {
		var _games = [];

		return {
			createGame: function (players, rules, settings) {
				var _game = {
					id: Date.now(),
					rules: {
						'canLeaveNestValues': rules.canLeaveNestValues,
						'startAtTileDiceValue': rules.startAtTileDiceValue
					},
					settings: {
						'numberOfTokens': settings.numberOfTokens,
						'tilesPerPlayer': settings.tilesPerPlayer
					},
					board: boardFactory.buildBoard(players, rules, settings),
					gameState: 'start', //games states (start, game, end)
					currentPlayerId: 0
				};

				// Setup starting round
				_game.startingRound = {
					'players': [],
					'winner': [],
					'diceVal': 0
				};

				// add player ids to starting round
				for (var i = 0; i < _game.board.players.length; i++) {
					_game.startingRound.players.push(_game.board.players[i].id);
				}

				_games.push(_game);

				return _game;
			},

			getGame: function (id) {
				for (var i = 0; i < _games.length; i++) {
					if (_games[i].id === parseInt(id)) {
						return _games[i];
					}
				}
				return null;
			},

			getGames: function () {
				return _games;
			},

			startRound: function (game, currentPlayerId, diceVal) {
				console.log('Current: ' + currentPlayerId);
				console.log('Players: ' + game.startingRound.players);
				console.log('Winner: ' + game.startingRound.winner);

				//check dice val and take action
				if (diceVal > game.startingRound.diceVal) {
					console.log('- new high dice value ' + diceVal);
					game.startingRound.diceVal = diceVal;
					game.startingRound.winner = [currentPlayerId];
				} else if (diceVal === game.startingRound.diceVal) {
					console.log('- new player to winner arr ' + currentPlayerId);
					console.log(game.startingRound.winner);
					game.startingRound.winner.push(currentPlayerId);
				}

				//check if done, if start a new round or get next player
				if (game.startingRound.winner.length === 1 && game.startingRound.players.length === 1) {
					console.log('- we got a winner');
					//we are done > start game
					game.startingRound.players = [];
					game.gameState = 'game';
					currentPlayerId = game.startingRound.winner[0];
				}

				//still got players
				else if (game.startingRound.players.length > 1) {
					console.log('- still got player to roll');
					//remove player from player arr
					game.startingRound.players.splice(game.startingRound.players.indexOf(currentPlayerId), 1);

					//get next player
					currentPlayerId = game.startingRound.players[0];
				}

				//round is done but we still don't have winner
				else {
					console.log('- no more players to roll but no winner');
					//start new round
					game.startingRound.players = game.startingRound.winner;
					game.startingRound.winner = [];
					game.startingRound.diceVal = 0;
				}

				return {
					currentPlayerId: currentPlayerId,
					gameState: game.gameState
				};
			}
		};
	});
