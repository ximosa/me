'use strict'
var anandmoghan = angular.module('anandmoghan', ['ui.router', 'ngAnimate', 'ngMaterial', 'ngSanitize', 'restangular', 'anandmoghan.modules']);

anandmoghan.modules = angular.module('anandmoghan.modules', ['anandmoghan.blog', 'anandmoghan.common', 'anandmoghan.widgets'])

anandmoghan.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
	.primaryPalette('grey', {
		'default': '800',
      	'hue-1': '300',
      	'hue-2': '700',
      	'hue-3': '900'
	})
	.accentPalette('grey', {
		'default': '200'
	});
});

anandmoghan.globals = {
	image: {
		root_url: '/resources/images/',
		logo_url: '/resources/images/logos/',
		gif_url: '/resources/images/gif/',
		about_url: '/resources/images/about/',
		bck_url: '/resources/images/backgrounds/',
		crew_url: '/resources/images/crew/'
	},
	loader: {
		message: 'Loading! Please Wait',
		status: 0
	}
}