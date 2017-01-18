anandmoghan.blog.controller('BlogController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	console.log("BlogController");
	$rootScope.bck_image = "brush.jpg";
	$scope.$parent.current_tab = 'blog';
}]);

anandmoghan.blog.controller('BlogHomeController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	console.log("BlogHomeController");
	$(window).resize();
	$('title').html("Anand Mohan | Blog");
	$('.body-container').animate({scrollTop : 0}, 800);

	$rootScope.bck_image = "brush.jpg";
	$scope.showLoader = true;
	var blog_ref = firebase.database().ref('blogs/content');

	var loadPosts = function() {
		blog_ref.limitToLast(20).on('value', function(data){
			console.log(JSON.stringify(data.val()));
			$scope.posts = data.val();
			$scope.showLoader = false;
			$scope.$apply();
		});
	}

	loadPosts();
}]);

anandmoghan.blog.controller('BlogNewController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	console.log("BlogNewController");
	$(window).resize();
	$('title').html("Anand Mohan | New Post");
	$('.body-container').animate({scrollTop : 0}, 800);

	$rootScope.bck_image = "pencil.jpg";
	$scope.showLoader = false;
	var blog_ref = firebase.database().ref('blogs/content');

	$scope.post = {
		id: blog_ref.push().key,
		title: '',
		content: ''
	}

	$scope.savePost = function() {
		var updates = {};
		if($scope.post.title && $scope.post.content) {
			$scope.showLoader = true;
			$scope.post.created_at = new Date().getTime();
			$scope.post.last_modified = new Date().getTime();
			updates[$scope.post.id] = $scope.post;
			blog_ref.update(updates).then(function(){
				$state.go('blog.home');
			}).catch(function(error) {
				console.error('Error writing new message to Firebase Database: ', error);
			});
		}
	}
}]);

anandmoghan.blog.controller('BlogEditController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	console.log("BlogEditController");
	$(window).resize();
	$('title').html("Anand Mohan | Blog");
	$('.body-container').animate({scrollTop : 0}, 800);

	$rootScope.bck_image = "pencil.jpg";
	$scope.showLoader = true;
	var blog_ref = firebase.database().ref('blogs/content');

	var loadPost = function(postid) {
		var post_ref = blog_ref.child(postid);
		post_ref.on('value', function(data){
			if(data.val() == null) {
				$state.go('blog.new');
			}
			else {
				$scope.post = data.val();
				$scope.showLoader = false;
				$scope.$apply();
				post_ref.off();
			}
    	});
	}

	$scope.savePost = function() {
		var updates = {};
		if($scope.post.title && $scope.post.content) {
			$scope.showLoader = true;
			$scope.post.last_modified = new Date().getTime();
			updates[$scope.post.id] = $scope.post;
			blog_ref.update(updates).then(function(){
				$state.go('blog.home');
			}).catch(function(error) {
				console.error('Error writing new message to Firebase Database: ', error);
			});
		}
	}
	
	firebase.auth().onAuthStateChanged(function(user) {
		if ($stateParams.postid) {
	    	loadPost($stateParams.postid);
		}
	});
}]);