'use strict';

/* Directives */

app.directive('topnav', function () {
  return {
    restrict: 'E',
    templateUrl: 'partials/topNav.html',
    controller: function ($scope, $rootScope, navService, activeUserService, categoryService) {

      $scope.nav = navService;
      $scope.categories = categoryService;
      setTimeout( function () {
        var users = _.groupBy(activeUserService, 'category');
        delete users['undefined'];
        $scope.people = users;
      }, 500);
      
      // Open and close the mobile nav
      $rootScope.menuActive = false;
      $scope.menuToggle = function () {
        $rootScope.menuActive = !$rootScope.menuActive;
      }

      // Set the active node on each state change
      $scope.$on('$stateChangeSuccess', function (scope, args) {
        $scope.activeNode = args.name;
      });

    },
    link: function(scope, element, attrs) {

    }
  };
});

app.directive('media', function($rootScope, $state, $location) {
	return {
    restrict: 'E',
    templateUrl: 'partials/media.html',
    controller: function($scope, $sce, modalService) {

      $scope.launchModal = function () {
        modalService.set($scope.media);
        $state.go('user.media', {media: $scope.media.id});
      };

      // Check if video
      if ($scope.media.type === 'video') {
        // Authorize URL
        $scope.media.videoSrcLow = $sce.trustAsResourceUrl($scope.media.videos.low_resolution.url);
      }

    },
    link: function(scope, element, attrs, controller) {

      var $thumbnail = element.children().children();
      var $content = element.parent();

      $thumbnail.bind('mouseenter', function() {
        $content.addClass('blur');
        element.removeClass('faded');
        if (scope.media.type === 'video') {
          $thumbnail.find('video')[0].play();
        }
      });
      $thumbnail.bind('mouseleave', function() {
        $content.removeClass('blur');
        element.addClass('faded');
        if (scope.media.type === 'video') {
          $thumbnail.find('video')[0].pause();
        }
      });
      $thumbnail.bind('click', function() {
        if (scope.media.type === 'video') {
          $thumbnail.find('video')[0].pause();
        }
      });

    }
	};
});

