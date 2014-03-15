'use strict';

angular.module('fiaMedKnuffApp')
	.value('rules', {
		'canLeaveNestValues': {
			'1': true,
			'2': false,
			'3': false,
			'4': false,
			'5': false,
			'6': true
		},
		'startAtTileDiceValue': true
	});
