anandmoghan.blog.controller('BlogController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	console.log("BlogController");
	$(window).resize();
	$('title').html("Anand Mohan | Blog");
	$('.body-container').animate({scrollTop : 0}, 800);

	$rootScope.bck_image = "brush.jpg";
	$scope.$parent.current_tab = 'blog.home';
}]);

anandmoghan.blog.controller('BlogHomeController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	console.log("BlogHomeController");
	$(window).resize();
	$('title').html("Anand Mohan | Blog");
	$('.body-container').animate({scrollTop : 0}, 800);

	$rootScope.bck_image = "brush.jpg";
}]);

anandmoghan.blog.controller('BlogEditController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	console.log("BlogEditController");
	$(window).resize();
	$('title').html("Anand Mohan | Blog");
	$('.body-container').animate({scrollTop : 0}, 800);

	$rootScope.bck_image = "pencil.jpg";
}]);