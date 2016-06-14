/**
 * Created by jed on 6/11/2016.
 */

var portfolio = angular.module('portfolio', ['ngRoute', 'ui.bootstrap']);

portfolio.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: '../views/svgName.html'
        })

        .when('/main', {
            templateUrl: '../views/svgName.html'
        })

        .when('/projects', {
            templateUrl: '../views/projects.html'
        })

        .when('/about', {
            templateUrl: '../views/about.html'
        })

        .when('/contact', {
            templateUrl: '../views/contact.html'
        })
});

portfolio.directive('gallery', function ($timeout) {
    return {
        restrict: 'AE',
        replace: true,
        scope:{
            images: '='
        },
        link: function (scope, elem, attrs) {

            scope.currentIndex=0;

            scope.next=function(){
                scope.currentIndex < scope.images.length-1 ? scope.currentIndex++:scope.currentIndex=0;
            };

            scope.prev=function(){
                scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
            };

            scope.$watch('currentIndex',function(){
                scope.images.forEach(function(image){
                    image.visible=false;
                });
                scope.images[scope.currentIndex].visible=true;
            });
        },
        templateUrl:'../views/knabbaSlider.html'
    }
});

portfolio.controller('knabbaSliderController', function ($scope) {
    $scope.images = [{
        src: '../images/projects/knabba/KnabbaMainScreen.PNG',
        title: 'First Image'
    }, {
        src: 'apple_2-wallpaper-1920x1080.jpg',
        title: 'Image Dos'
    }, {
        src: 'apple_desktop-wallpaper-1920x1080.jpg',
        title: 'Tre'
    }, {
        src: 'apple_ios_snow_mountains-wallpaper-1920x1080.jpg',
        title: 'Numero 4'
    }];
});



portfolio.controller('knabbaModalController', ['$uibModal', function ($uibModal) {
    var vm = this;
        vm.open = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '../views/knabbaModal.html',
                controller: 'closeController as vm',
                windowClass: 'app-modal-window'
            });
        };
}]);

portfolio.controller('closeController', ['$uibModalInstance', function ($uibModalInstance) {
       var vm = this;

        vm.close = function () {
            $uibModalInstance.close();
        };
}]);
