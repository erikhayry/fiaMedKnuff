'use strict';

angular.module('fiaMedKnuffApp')
	.factory('boardFactory', [

		function () {
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
                [],
                [],
                [],
                []
                n... n = number of tokens
              ]
            },
            n... n = number of players
          ]
        }
       */
			var _board = {},

				//get number of total tiles for the board according to game settings
				_getNumberOfTiles = function (numberOfPlayers) {
					if (numberOfPlayers < 5) {
						return 4 * _board.settings.tilesPerPlayer;
					}

					return numberOfPlayers * _board.settings.tilesPerPlayer;
				},

				//build empty board
				_buildBoard = function (numberOfPlayers, rules, settings) {
					_board = {
						'rules': rules,
						'settings': settings,
						'players': []
					};

					_board.track = new Array(_getNumberOfTiles(numberOfPlayers));
				},

				_canLeaveNest = function (diceValue) {
					return _board.rules.canLeaveNestValues[diceValue];
				},

				//get the start tile of player
				_getStartTile = function (playerId) {
					if (_board.players.length === 2) {
						return playerId * (2 * _board.settings.tilesPerPlayer);
					} else {
						return playerId * _board.settings.tilesPerPlayer;
					}
				},

				_cleanUpTileofOpponents = function (playerId, trackIndex) {
					//check if any opponent tokens exists on same tile and kick back if true
					var _players = _board.track[trackIndex];
					for (var _player in _players) {
						if (_player.toString() !== playerId) {
							for (var i = 0; i < _players[_player].length; i++) {
								_kickBack(_player.toString(), _players[_player][i], trackIndex);
							}
						}
					}
				},

				_move = function (playerId, tokenId, to) {
					//create object for tile if it doesn't exist
					if (!_board.track[to]) {
						_board.track[to] = {};
					}

					//if player array already exists for tile add token
					if (playerId in _board.track[to]) {
						_board.track[to][playerId].push(tokenId);
					}

					//else add new player array containing token
					else {
						_board.track[to][playerId] = [tokenId];
					}

					//clean up any of opponents tokens
					_cleanUpTileofOpponents(playerId, to);

				},

				//remove token from tile
				_remove = function (playerId, tokenId, from) {
					var _tile = _board.track[from][playerId];
					_tile.splice(_tile.indexOf(tokenId), 1);
				},

				//move token from board to yard
				_kickBack = function (playerId, tokenId, from) {
					_board.players[playerId].yard[tokenId.slice(tokenId.indexOf('-') + 1)] = tokenId;
					_remove(playerId, tokenId, from);
				},

				//move token into finish
				_moveToFinish = function (playerId, tokenId, steps) {
					_board.players[playerId].finish[steps].push(tokenId);
				},

				//get last tile on board for player
				_getLastTile = function (playerId) {
					var _endTile = _getStartTile(playerId) - 1;
					return (_endTile < 0) ? _board.track.length : _endTile;
				},

				_getFinishRightMoveOption = function (arrLenght, index, diceVal) {
					//check how many steps to take before switching direction
					var _stepsOnNextArrs = diceVal - arrLenght + index + 1,
						_arrLenght = arrLenght - 1;

					//if less than one. direction never changed so return dice value
					if (_stepsOnNextArrs < 1) {
						return diceVal + index;
					}

					//_changeDir equals how many times we gone thorugh the whole lenth of the arr
					var _changeDir = Math.floor(_stepsOnNextArrs / _arrLenght),
						//steps to take after turning the last time
						_stepsOnLastTurn = _stepsOnNextArrs % _arrLenght;

					//if gone though array uneven numbers of time, starting from left on the last array
					if ((_changeDir) % 2 !== 0) {
						return _stepsOnLastTurn;
					}
					//else start counting from the right
					else {
						return _arrLenght - _stepsOnLastTurn; //-1 to get the idnex right
					}
				},

				_getFinishLeftMoveOption = function (arrLenght, index, diceVal) {
					//if coming from the outside the finish, start from the other side when moving left
					if (index < 0) {
						index = arrLenght + (-1 * index) - 1;
					}

					//check how many steps to take before switching direction
					var _stepsOnNextArrs = diceVal - index,
						_arrLenght = arrLenght - 1;

					//if less than one. direction never changed so return dice value
					if (_stepsOnNextArrs < 1) {
						return index - diceVal;
					}

					//_changeDir equals how many times we gone thorugh the whole lenth of the arr
					var _changeDir = Math.floor(_stepsOnNextArrs / _arrLenght),
						//steps to take after turning the last time
						_stepsOnLastTurn = _stepsOnNextArrs % _arrLenght;

					//if gone though array even numbers of time, starting from left on the last array
					if ((_changeDir) % 2 === 0) {
						return _stepsOnLastTurn;
					}
					//else start counting from the right
					else {
						return _arrLenght - _stepsOnLastTurn; //-1 to get the index right
					}
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
				buildBoard: function (players, rules, settings) {
					_buildBoard(players.length, rules, settings);

					//add players to board
					for (var i = 0; i < players.length; i++) {
						_board.players.push({
							'yard': [],
							'finish': new Array(settings.numberOfTokens)
						});

						for (var j = 0; j < settings.numberOfTokens; j++) {
							//add to yard
							_board.players[i].yard.push(i + '-' + j);
							//build finish	
							_board.players[i].finish[j] = [];
						}

					}

					return _board;
				},

				moveToTrack: function (tokenId, diceValue) {
					//check if token can leave nest
					if (!_canLeaveNest(diceValue)) {
						return false;
					}

					var _playerId = tokenId.slice(0, tokenId.indexOf('-')),

						//get starting tile for player
						_offset = _getStartTile(parseInt(_playerId));

					//add token to track accodring to rule	
					if (_board.rules.startAtTileDiceValue) {
						_move(_playerId, tokenId, _offset + diceValue - 1);
					} else {
						_move(_playerId, tokenId, _offset);
					}

					//clean up yard
					var _yard = _board.players[parseInt(_playerId)].yard;
					_yard[_yard.indexOf(tokenId)] = '';

				},

				getFinishMovesOption: function (index, diceValue) {
					var _arrLenght = _board.players[0].finish.length;
					return [
						_getFinishRightMoveOption(_arrLenght, index, diceValue),
						_getFinishLeftMoveOption(_arrLenght, index, diceValue)
					];
				},

				move: function (tokenId, from, diceValue) {
					var _playerId = tokenId.slice(0, tokenId.indexOf('-')),
						_lastTile = _getLastTile(_playerId),
						_start = from,
						_to = from + diceValue;

					//if running of the board and is not player 1
					if (_to > _board.track.length && _playerId !== '0') {
						_to = _to - _board.track.length - 1;
						from = 0;
					}

					//if token completed lap, move to finish
					if (from < _lastTile && _to > _lastTile) {
						_moveToFinish(_playerId, tokenId, _to - _lastTile - 1);
					}

					//else move along on track
					else {
						_move(_playerId, tokenId, _to);
					}

					//clean up
					_remove(_playerId, tokenId, _start);

				}

			};
		}
	]);
