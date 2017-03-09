anandmoghan.controller('ContactController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
    $scope.$parent.current_tab = 'contact';
    $rootScope.bck_image = 'crew.jpg';
}]);