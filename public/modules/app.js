'use strict'
var anandmoghan = angular.module('anandmoghan', ['ui.router', 'ngAnimate', 'ngMaterial', 'ngSanitize', 'restangular', 'anandmoghan.modules']);

anandmoghan.modules = angular.module('anandmoghan.modules', ['amazecreationz.blog', 'amazecreationz_widgets'])

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
	},
	theme: 'grey'
}

anandmoghan.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
	.primaryPalette(anandmoghan.globals.theme, {
		'default': '800',
      	'hue-1': '300',
      	'hue-2': '700',
      	'hue-3': '900'
	})
	.accentPalette(anandmoghan.globals.theme, {
		'default': '100'
	});
});

var permissions = {
	ADMIN: 0,
	BLOGGER: 1,
	USER: 2,
	VISITOR: 3
}

var amazecreationz_blog = {
	theme: anandmoghan.globals.theme,
	name: 'Blog',
	showSideBar: false
}