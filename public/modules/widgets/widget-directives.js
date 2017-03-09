amazecreationz_widgets = angular.module('amazecreationz_widgets' ,[])

amazecreationz_widgets.directive("bgLoad", [function() {
    return {
        restrict: "A",
        scope: {
            image: '='
        },
        link: function(scope, elements, attributes) {
            scope.$watch('image', function(image){
                var img_url = angular.isDefined(attributes.url) ? attributes.url+image : anandmoghan.globals.image.root_url+image;
                var img = new Image();
                img.src = img_url;
                
                img.onload = function() {
                  $(elements[0]).css({'background-image':'url('+img.src+')'});
                } 
            });            
        }
    }
}]);

 amazecreationz_widgets.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, elements, attributes) {
            var modelSetter = $parse(attributes.fileModel).assign;
          
            elements.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, elements[0].files[0]);
                });
            });
        }
    };
 }]);

/*
widget: Loader Widget
data: Containes loader object {
	message: Message to be displayed
	status: Hidden state = 0, Show = 1
}
*/
amazecreationz_widgets.directive('loader', [function() {
	return {
		restrict:'E',
		scope: {
			data: '='
		},
		templateUrl: '/modules/widgets/loader.html',
		link: function (scope, elements, attributes) {
			var setLoader = function(){
				$('body').addClass('flow');
			}

			var removeLoader = function(){
				$('body').removeClass('flow');
			}

			scope.$watch('data.status', function(status){
				scope.status = status;
				if(status == 1){
					setLoader();
				}
				else{
					removeLoader();
				}
			})

			scope.$watch('data.message', function(message){
				scope.message = message;
			})
		}
	}
}]);


/*
widget: Menu Bar
items: Items for Menu {
	name: Name to be displayed.
	id: id of the item to call the changeFunction
}
itemSelected: selected menu item;
scrollElement: scroll element for scroll to fix top action.
scrollOffset: offset to fix the menu
changeFunction: The function in the ctrl to be called for change in menu item.
*/
amazecreationz_widgets.directive('menuBar', ['$state', function($state) {
	return {
		restrict:'E',
		scope: {
			items: '=',
			itemSelected: '=',
			scrollElement: '@',
			scrollOffset: '=',
			function: '='
		},
		templateUrl: '/modules/widgets/menu-bar.html',
		link: function (scope, elements, attributes) {
			if(scope.scrollElement){
				$('.menu-container').css(scope.scrollOffset);
				$(scope.scrollElement).scroll(function() {
					var menu_top = $('.menu-container').offset().top;
					var body_top = $(scope.scrollElement).scrollTop();
					if(body_top > menu_top) {
						$('.menu-container').addClass('sticky box-shadow');
					}
					else {
						$('.menu-container').removeClass('sticky box-shadow');
					}
				});
			}
		}
	}
}]);


/*
widget: Application Card
app: Application Info Object
*/
amazecreationz_widgets.directive('appCard', ['$state', function($state) {
	return {
		restrict:'E',
		scope: {
			app: '='
		},
		templateUrl: '/modules/widgets/app-card.html',
		link: function (scope, elements, attributes) {
			scope.gotoPage =  function(appId) {
				$state.go('apps.selected', {type: appId});
			}
		}
	}
}]);




/*
widget: Tags
tagdata: Tags Info Object
*/
amazecreationz_widgets.directive('tags', ['$state', function($state) {
	return {
		restrict:'E',
		scope: {
			tagdata: '='
		},
		template: "<span ng-repeat=\"tag in tagdata | orderBy : 'priority' : true\" style='background-color: {{tag.color}}; padding: 5px; color: #FFF'>{{tag.title}}</span>",
		link: function (scope, elements, attributes) {

		}
	}
}]);




/*
widget: Get from Play Store
link: playstore link
height: (optional) height of image - default height: 30px
*/
amazecreationz_widgets.directive('googlePlay', ['$state', function($state) {
	return {
		restrict:'E',
		scope: {
			link: '@',
			height: '@'
		},
		template: '<a href="{{link}}" target="_blank"><img alt="Get it on Google Play" ng-style="imgClass" src="/resources/images/google-play-badge.png"/></a>',
		link: function (scope, elements, attributes) {
			if(angular.isUndefined(scope.height)){
				scope.imgClass={
					'height': '30px',
					'width': 'auto'
				};
			}
			else {
				scope.imgClass={
					'height': scope.height,
					'width': 'auto'
				};
			}
		}
	}
}]);




/*
widget: Crew Card
crewInfo: Crew Info Object
*/
amazecreationz_widgets.directive('crewCard', ['$state', function($state) {
	return {
		restrict:'E',
		scope: {
			crewInfo: '='
		},
		templateUrl: '/modules/widgets/crew-card.html',
		link: function (scope, elements, attributes) {
			scope.image_url = anandmoghan.globals.image.crew_url + (angular.isDefined(scope.crewInfo.image_url) ? scope.crewInfo.image_url : 'logo.png');
		}
	}
}]);

/*
widget: Chart Widget
chartData: Chart Data Object
*/
amazecreationz_widgets.directive('chart', ['$state', function($state) {
	return {
		restrict:'E',
		scope: {
			chartData: '='
		},
		replace: true,
		template: '<canvas class="chart-container"></canvas>',
		link: function (scope, elements, attributes) {
			var chartElement = elements[0].getContext("2d");
			var chart = new Chart(chartElement, scope.chartData);
			scope.$watch('chartData', function(data){
				if(data != undefined){
					data.options = setBasicOptions(data.type);
					chart.destroy();
					chart = new Chart(chartElement, data);
				}
			})
		}
	}
}]);