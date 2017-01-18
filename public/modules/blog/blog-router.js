anandmoghan.blog = angular.module('anandmoghan.blog' ,[])

anandmoghan.blog.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('blog.home', {
		url:'',
		templateUrl: '/modules/blog/blog-home.html',
		controller: 'BlogHomeController'
	});

	$stateProvider.state('blog.new', {
		url:'/new',
		templateUrl: '/modules/blog/blog-edit.html',
		controller: 'BlogNewController'
	});

	$stateProvider.state('blog.edit', {
		url:'/edit/:postid',
		templateUrl: '/modules/blog/blog-edit.html',
		controller: 'BlogEditController'
	});
}]);