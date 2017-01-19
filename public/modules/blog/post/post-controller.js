anandmoghan.blog.controller('PostController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	$scope.category = $stateParams.category;

    $scope.categories = [{id: 'Personal', name: 'Personal'}, {id: 'Technical', name: 'Technical'}, {id: 'Travel', name: 'Travel'}];
    $scope.changeCategory = function (category) {
        $state.go('blog.post.home', {category: category});
    }
}]);

anandmoghan.blog.controller('PostHomeController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	$('title').html("Anand Mohan | "+$stateParams.category);

	$rootScope.bck_image = "brush.jpg";
	$scope.showLoader = true;
	var blog_ref = firebase.database().ref('blogs/content');

	var loadPosts = function(category) {
        blog_ref.child(category).limitToLast(20).on('value', function(data){
			$scope.posts = data.val();
			$scope.showLoader = false;
			_.defer(function(){$scope.$apply();});
		});
	}

	loadPosts($stateParams.category);
}]);

anandmoghan.blog.controller('NewPostController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	$('title').html("Anand Mohan | New Post");

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
            blog_ref.child($stateParams.category).update(updates).then(function(){
				$state.go('blog.post.home', {category: $stateParams.category});
			}).catch(function(error) {
				console.error('Error writing new message to Firebase Database: ', error);
			});
		}
	}
}]);

anandmoghan.blog.controller('ViewPostController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	$('title').html("Anand Mohan | New Post");

	$scope.showLoader = true;
	var blog_ref = firebase.database().ref('blogs/content');
	blog_ref.child($stateParams.category).child($stateParams.postid).on('value', function(data){
		$scope.post = data.val();
		$scope.showLoader = false;
		_.defer(function(){$scope.$apply();});
	});

}]);

anandmoghan.blog.controller('EditPostController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	$('title').html("Anand Mohan | Blog");

	$rootScope.bck_image = "pencil.jpg";
	$scope.showLoader = true;
	var blog_ref = firebase.database().ref('blogs/content');

	var loadPost = function(postid) {
		var post_ref = blog_ref.child($stateParams.category).child(postid);
		post_ref.on('value', function(data){
			if(data.val() == null) {
				$state.go('blog.post.new');
			}
			else {
				$scope.post = data.val();
				$scope.showLoader = false;
				_.defer(function(){$scope.$apply();});
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
			blog_ref.child($stateParams.category).update(updates).then(function(){
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