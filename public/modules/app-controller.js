anandmoghan.controller('MainController', ['$scope', '$state', '$stateParams', '$rootScope', '$window', '$location', '$mdSidenav', '$mdToast', function($scope, $state, $stateParams, $rootScope, $window, $location, $mdSidenav, $mdToast){
  	/*$('.button-collapse').sideNav({
  			menuWidth: 270,
	      	edge: 'left',
	      	closeOnClick: true,
	      	draggable: true
		}
	);*/

	anandmoghan.globals.isLive = $location.host() == 'anandmoghan.me';
	
	$scope.globals = {
		image: angular.copy(anandmoghan.globals.image),
		theme: angular.copy(anandmoghan.globals.theme),
		permissions: angular.copy(permissions)
	}

	$rootScope.user_data = {
		permission: permissions.VISITOR
	};

	$scope.openSideMenu = function() {
		$mdSidenav('side-menu').open();
	}

	$scope.closeSideMenu = function() {
		$mdSidenav('side-menu').close();
	}

	$scope.openTab = function(tab) {
		$mdSidenav('side-menu').close();
		$scope.current_tab = tab.id;
		$state.go(tab.state)
	}

	$scope.login = function() {
		$mdSidenav('side-menu').close();
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
		firebase.auth().signInWithPopup(provider);
    }

	$scope.signOut = function() {
		$mdSidenav('side-menu').close();
		firebase.auth().signOut().then(function() {
			$scope.showToast('Signed out successfully');
			$rootScope.user_data = {
				permission: permissions.VISITOR
			};
			_.defer(function(){$scope.$apply();});
		}, function(error) {
		});
	}
	
	$scope.showToast = function(message, timeout) {
		$mdToast.show({
			hideDelay: timeout || 2000,
			position: 'top right',
			locals:{ 
				toastParams: {
					message: message
				}
			},
			controller: 'ToastController',
			templateUrl: '/modules/common/templates/toast.html',
			parent: document.getElementsByClassName('body-container')
        });
	}

	$scope.tabs = angular.copy(anandmoghan.constants.tabs);

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
				permission: permissions.USER
			}
			_.defer(function(){$scope.$apply();});
			$scope.showToast('Signed in as '+$rootScope.user_data.name);
			firebase.database().ref('isAdmin').on('value', function(data){
				if(data.val()){
					$rootScope.user_data.permission = permissions.ADMIN;
					_.defer(function(){$scope.$apply();});
				}	
			});
			var db_ref = firebase.database().ref('references').child(user.uid);
			var info = {
		      name: user.displayName,
			  nickname: user.displayName,
		      email: user.email,
		      image_url: user.photoURL,
			  uid: user.uid
		    }
			db_ref.on('value', function(data){
				if(!data.val()){
					db_ref.set(info);
					$rootScope.user_data.nickname = info.nickname;
				}
				else {
					$rootScope.user_data.nickname = data.val().nickname;	
				}
				_.defer(function(){$scope.$apply();});
				db_ref.off();
			});
		}
    })
}]);