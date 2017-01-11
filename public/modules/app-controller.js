anandmoghan.controller('MainController', ['$scope', '$state',  '$rootScope', '$http', '$window', '$location', '$mdSidenav', function($scope, $state, $rootScope, $http, $window, $location, $mdSidenav){
	anandmoghan.globals.isLive = $location.host() == 'anandmoghan.me';
	
	$scope.globals = {
		image: angular.copy(anandmoghan.globals.image),
		loader: angular.copy(anandmoghan.globals.loader)
	}

	$rootScope.user_data = {};

	$scope.login = function() {
    	$state.go('login', {redirect: $state.current.name});
    }

	$scope.signOut = function() {
		firebase.auth().signOut().then(function() {
			Materialize.toast('Signed out successfully', 3000);
			$rootScope.user_data = {};
			$scope.$apply();
		}, function(error) {
		});
	}

	$scope.openNewTab = function(url) {
		$window.open(url, '_blank');
	}

	firebase.auth().onAuthStateChanged(function(user) {
    	if(user){	
	    	$rootScope.user_data = {
				name: user.displayName,
				nickname: user.displayName,
				email: user.email,
				image: user.photoURL,
				uid: user.uid,
				is_email_verified: user.emailVerified,
				isAdmin: false,
				is_user_signed: true
			}
			$scope.$apply();
			Materialize.toast('Signed in as '+$rootScope.user_data.name, 3000);
			firebase.database().ref('isAdmin').on('value', function(data){
				if(data.val()){
					$rootScope.user_data.isAdmin = data.val();
					$scope.$apply();
				}	
			});
			var db_ref = firebase.database().ref('references/'+user.uid);
	    	var info = {
		      name: user.displayName,
		      email: user.email,
		      image: user.photoURL
		    }
		    db_ref.set(info);
		}
    })
}]);

anandmoghan.controller('HomeController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	console.log("HomeController");
	$(window).resize();
	$('title').html("Anand Mohan | Home");
	$('.body-container').animate({scrollTop : 0}, 800);

	$rootScope.bck_image = "connected.jpg";
}]);