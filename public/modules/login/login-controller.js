anandmoghan.controller('LoginController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams){
	console.log("LoginController");
	$(window).resize();
	$('title').html("Anand Mohan | Login");
	$('.body-container').animate({scrollTop : 0}, 800);

	$scope.signIn = function() {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
		firebase.auth().signInWithPopup(provider).then(function(result) {
			$state.go($stateParams.redirect)
		}).catch(function(error) {
	        if (error.code === 'auth/account-exists-with-different-credential') {
	        	alert('You have already signed up with a different auth provider for that email.');
	        } else {
	        	console.error(error);
	        }
        });
	}

	firebase.auth().onAuthStateChanged(function(user) {
    	if(user){
    		$state.go($stateParams.redirect)
    	}
    })
}]);