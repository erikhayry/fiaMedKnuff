'use strict';

/**
 * @ngdoc overview
 * @name index
 * @description
 * Fia med Knuff
 * - github https://github.com/erikportin/fiaMedKnuff
 */

/**
 * @ngdoc object
 * @name fiaMedKnuffApp
 * @function
 * @requires ngCookies
 * @requires ngRoute
 * @description
 * Main app configuration
 *
 */

angular.module('fiaMedKnuffApp', ['ngCookies', 'ngRoute', 'pascalprecht.translate'])
	.config(function ($routeProvider, $locationProvider) {
		//$locationProvider.html5Mode(true);
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/new-game', {
				templateUrl: 'views/newGame.html',
				controller: 'NewgameCtrl'
			})
			.when('/load-game', {
				templateUrl: 'views/loadGame.html',
				controller: 'LoadgameCtrl'
			})
			.when('/player', {
				templateUrl: 'views/player.html',
				controller: 'PlayerCtrl'
			})
			.when('/settings', {
				templateUrl: 'views/settings.html',
				controller: 'SettingsCtrl'
			})
			.when('/rules', {
				templateUrl: 'views/rules.html',
				controller: 'RulesCtrl'
			})
			.when('/game/:id', {
				templateUrl: 'views/game.html',
				controller: 'GameCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	})

/*
	    config below fixes this http bug
	    http://stackoverflow.com/questions/16661032/http-get-is-not-allowed-by-access-control-allow-origin-but-ajax-is  
	  */

.config(function ($httpProvider) {
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

/*
	    translation
	    http://pascalprecht.github.io/angular-translate/docs/en/#/guide
	   */
.config(function ($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		prefix: 'i18n/locale-',
		suffix: '.json'
	});
	$translateProvider.preferredLanguage('en');
	$translateProvider.useLocalStorage();
});
