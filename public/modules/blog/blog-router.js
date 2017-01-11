anandmoghan.blog = angular.module('anandmoghan.blog' ,[])

anandmoghan.blog.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('blog.home', {
		url:'',
		templateUrl: '/modules/blog/blog-home.html',
		controller: 'BlogHomeController'
	});

	$stateProvider.state('blog.edit', {
		url:'/edit',
		templateUrl: '/modules/blog/blog-edit.html',
		controller: 'BlogEditController'
	});
}]);