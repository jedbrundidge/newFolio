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
        title: 'Knabba Main Screen'
    }, {
        src: '../images/projects/knabba/KnabbaMainScreen2PNG.PNG',
        title: 'Knabba Main Screen 2'
    }, {
        src: '../images/projects/knabba/KnabbaMainScreen3.PNG',
        title: 'Knabba Main Screen 3'
    }, {
        src: '../images/projects/knabba/KnabbaGetStarted.PNG',
        title: 'Login/Sign up'
    }, {
        src: '../images/projects/knabba/KnabbaCreateAccount.PNG',
        title: 'Create Account'
    }, {
        src: '../images/projects/knabba/KnabbaRenter1.PNG',
        title: 'Define Account'
    }, {
        src: '../images/projects/knabba/KnabbaRenter2.PNG',
        title: 'Define Account 2'
    }, {
        src: '../images/projects/knabba/KnabbaRenter3PNG.PNG',
        title: 'Define Account 3'
    }, {
        src: '../images/projects/knabba/KnabbaRenter4.PNG',
        title: 'Define Account 4'
    }, {
        src: '../images/projects/knabba/KnabbaProcessedScript.PNG',
        title: 'Initial Processing Script'
    }, {
        src: '../images/projects/knabba/KnabbaUploadScript.PNG',
        title: 'File Upload Script'
    }, {
        src: '../images/projects/knabba/KnabbaGalleryScript.PNG',
        title: 'View Photo Gallery Script'
    }, {
        src: '../images/projects/knabba/KnabbaOffersScript.PNG',
        title: 'Offers Script'
    }];
});

portfolio.controller('carischSliderController', function ($scope) {
    $scope.images = [{
        src: '../images/projects/carischApp/AppIndex.PNG',
        title: 'Main Page'
    }, {
        src: '../images/projects/carischApp/AppContext.PNG',
        title: 'Context Code'
    }, {
        src: '../images/projects/carischApp/AppModel.PNG',
        title: 'Model Code'
    }, {
        src: '../images/projects/carischApp/AppRoutes.PNG',
        title: 'Routes'
    }, {
        src: '../images/projects/carischApp/AppController1.PNG',
        title: 'Controller'
    }, {
        src: '../images/projects/carischApp/AppController2.PNG',
        title: 'Controller 2'
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

portfolio.controller('carischModalController', ['$uibModal', function ($uibModal) {
    var vm = this;
    vm.open = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '../views/carischModal.html',
            controller: 'closeController as vm',
            windowClass: 'app-modal-window'
        });
    };
}]);

portfolio.controller('closeController', ['$uibModalInstance', '$location', function ($uibModalInstance, $location) {

       var vm = this;

        vm.close = function () {
            $uibModalInstance.close();
            $location.path('/projects');
        };

}]);


portfolio.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}])