anandmoghan.blog = angular.module('anandmoghan.blog' ,[])

anandmoghan.blog.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('blog.home', {
		url:'',
		templateUrl: '/modules/blog/blog-home.html',
		controller: 'BlogHomeController'
	});

	$stateProvider.state('blog.post', {
		url:'/:category',
		abstract: true,
		templateUrl: '/modules/blog/post/post-content.html',
		controller: 'PostController'
	});

	$stateProvider.state('blog.post.home', {
		url:'',
		templateUrl: '/modules/blog/post/post-home.html',
		controller: 'PostHomeController'
	});

	$stateProvider.state('blog.post.new', {
		url:'/new',
		templateUrl: '/modules/blog/post/post-edit.html',
		controller: 'NewPostController'
	});

	$stateProvider.state('blog.post.view', {
		url:'/:postid',
		templateUrl: '/modules/blog/post/post-view.html',
		controller: 'ViewPostController'
	});
	
	$stateProvider.state('blog.post.edit', {
		url:'/:postid/edit',
		templateUrl: '/modules/blog/post/post-edit.html',
		controller: 'EditPostController'
	});
}]);