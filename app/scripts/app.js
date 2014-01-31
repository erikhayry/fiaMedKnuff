'use strict';

/**
 * @ngdoc overview
 * @name index
 * @description
 * NAP Play Admin Tool
 * - github https://github.com/erikportin/napPlayAdmin
 */

/**
 * @ngdoc object
 * @name napPlayAdminApp
 * @function
 * @requires ngCookies
 * @requires ngRoute
 * @description
 * Main app configuration
 *
 */

angular.module('ngScaffoldApp', ['ngCookies', 'ngRoute', 'pascalprecht.translate'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
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