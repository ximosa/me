anandmoghan.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){

	$stateProvider.state('home', {
		url:'/',
		templateUrl: '/modules/welcome.html',
		controller: 'HomeController'
	});


	$stateProvider.state('login', {
		url:'/login',
		params: {
			redirect: 'home'
		},
		templateUrl: '/modules/login/login.html',
		controller: 'LoginController'
	});

	$stateProvider.state('blog', {
		url:'/blog',
		abstract:true,
		templateUrl: '/modules/blog/blog-console.html',
		controller: 'BlogController'
	});

	$locationProvider.html5Mode(true);
	$urlRouterProvider.when('','/');
}]);