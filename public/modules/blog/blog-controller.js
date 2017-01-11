anandmoghan.controller('BlogController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	console.log("BlogController");
	$(window).resize();
	$('title').html("Anand Mohan | Blog");
	$('.body-container').animate({scrollTop : 0}, 800);

	$rootScope.bck_image = "pencil.jpg";
}]);