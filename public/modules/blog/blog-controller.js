anandmoghan.blog.controller('BlogController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	$rootScope.bck_image = "brush.jpg";
	$scope.$parent.current_tab = 'blog';
}]);

anandmoghan.blog.controller('BlogHomeController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	$(window).resize();
	$('title').html("Anand Mohan | Blog");
	$('.body-container').animate({scrollTop : 0}, 800);
	

	$state.go('blog.post.home', {category: 'Personal'});
}]);