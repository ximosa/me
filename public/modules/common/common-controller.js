anandmoghan.controller('HomeController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	$rootScope.bck_image = 'home.jpg';
	$scope.$parent.current_tab = 'home';
}]);

anandmoghan.controller('ToastController', ['$scope', '$mdToast', 'toastParams', function($scope, $mdToast, toastParams){
	$scope.toast = toastParams;

	$scope.closeToast = function() {
		$mdToast.hide();
	}
}]);
