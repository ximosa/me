anandmoghan.blog.controller('ContactController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	console.log("ContactController");
	$(window).resize();
	$('title').html("Anand Mohan | Contact Me");
	$('.body-container').animate({scrollTop : 0}, 800);

	$rootScope.bck_image = "crew.jpg";
	$scope.$parent.current_tab = 'contact';
}]);