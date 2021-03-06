anandmoghan.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){

	$stateProvider.state('home', {
		url:'/',
		templateUrl: '/modules/common/home.html',
		controller: 'HomeController'
	});

	$stateProvider.state('login', {
		url:'/login',
		params: {
			redirect: 'home',
		},
		templateUrl: '/modules/login/login.html',
		controller: 'LoginController'
	});

	$stateProvider.state('contact', {
		url:'/contact',
		templateUrl: '/modules/contact/contact.html',
		controller: 'ContactController'
	});

	$locationProvider.html5Mode(true);
	$urlRouterProvider.when('','/');
}]);