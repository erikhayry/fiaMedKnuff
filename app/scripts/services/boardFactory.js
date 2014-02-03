'use strict';

angular.module('fiaMedKnuffApp')
	.factory('boardFactory', ['settings', 'rules',
		function (settings, rules) {
			/*
        board structure
        {
          'track' : [
          [
            player-1 : [
              1-0,

            ],
            ... n = number of player

          ], n...] n = number of tiles
          'players' [
            {
              'yard' : [
                '0-1',
                '0-2',
              ],
              'finish' : [
                '0-3',
                '',
                '',
                ''
                ... n = number of tokens
              ]
            },
            {
              'yard' : [
                '1-1',
                '1-3'
              ],
              'finish' : [
                '',
                '',
                '',
                ''
                n... n = number of tokens
              ]
            },
            n... n = number of players
          ]
        }
       */
			var _board = {},

				_getNumberOfTiles = function (numberOfPlayers) {
					if (numberOfPlayers < 5) {
						return 4 * settings.tilesPerPlayer;
					}

					return numberOfPlayers * settings.tilesPerPlayer;
				},

				_buildBoard = function (numberOfPlayers) {
					_board = {
						'track': new Array(_getNumberOfTiles(numberOfPlayers)),
						'players': []
					};
				},

				_canLeaveNest = function (diceValue) {
					for (var i = 0; i < rules.canLeaveNestValues.length; i++) {
						if (diceValue === rules.canLeaveNestValues[i]) {
							return true;
						}
					}
					return false;
				},

				_getOffset = function (playerId) {
					if (_board.players.length === 2) {
						return playerId * (2 * settings.tilesPerPlayer);
					} else {
						return playerId * settings.tilesPerPlayer;
					}
				},

				_move = function (playerId, tokenId, from, diceValue) {
					var _newTrackIndex = from + diceValue;

					if (!_board.track[_newTrackIndex]) {
						_board.track[_newTrackIndex] = {};
					}

					if (playerId in _board.track[_newTrackIndex]) {
						_board.track[_newTrackIndex][playerId].push(tokenId);
					} else {
						_board.track[_newTrackIndex][playerId] = [tokenId];
					}

					var _players = _board.track[_newTrackIndex];
					for (var player in _players) {
						if (player.toString() !== playerId) {
							for (var i = 0; i < _players[player].length; i++) {
								_kickBack(player.toString(), _players[player][i], _newTrackIndex);
							}
						}
					}

				},

				_remove = function (playerId, tokenId, from) {
					var _tile = _board.track[from][playerId];
					_tile.splice(_tile.indexOf(tokenId), 1);
				},

				_kickBack = function (playerId, tokenId, from) {
					_board.players[playerId].yard[tokenId.slice(tokenId.indexOf('-') + 1)] = tokenId;
					_remove(playerId, tokenId, from);
				};

			return {

				/**
				 * [rollDice description]
				 * @return {[type]} [description]
				 */
				rollDice: function () {
					return Math.round(Math.random() * 5) + 1;
				},

				/**
				 * [buildBoard description]
				 * @param  {[type]} players [description]
				 * @return {[type]}         [description]
				 */
				buildBoard: function (players) {
					_buildBoard(players.length);

					for (var i = 0; i < players.length; i++) {
						_board.players.push({
							'yard': [],
							'finish': new Array(settings.numberOfTokens)
						});

						for (var j = 0; j < settings.numberOfTokens; j++) {
							_board.players[i].yard.push(i + '-' + j);
						}
					}

					return _board;
				},

				moveToTrack: function (tokenId, diceValue) {
					if (!_canLeaveNest(diceValue)) {
						return false;
					}

					var _playerId = tokenId.slice(0, tokenId.indexOf('-')),
						_offset = _getOffset(parseInt(_playerId));

					if (rules.startAtTileDiceValue) {
						_move(_playerId, tokenId, _offset, diceValue - 1);
					} else {
						_move(_playerId, tokenId, _offset, 0);
					}

					var _yard = _board.players[parseInt(_playerId)].yard;
					_yard[_yard.indexOf(tokenId)] = '';

				},

				move: function (tokenId, from, diceValue) {
					var _playerId = tokenId.slice(0, tokenId.indexOf('-'));
					_move(_playerId, tokenId, from, diceValue);
					_remove(_playerId, tokenId, from);

				}

			};
		}
	]);
