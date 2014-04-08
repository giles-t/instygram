'use strict';

/* Controllers */

app.controller('mediaListController', function ($scope, $stateParams, $timeout, userService, mediaListService, mediaService, modalService, activeUserService) {

  console.log('List Controller');

  var users = activeUserService;

  // Let the transition finish before loading content
  $timeout( function () {
    $scope.user = users[$stateParams.user];
    console.log($scope.user);
    userService.async($scope.user.instagramID).then(function(res) {
      $scope.userData = res.data;
      console.log($scope.userData);
    });

    mediaListService.async(users[$stateParams.user].instagramID).then(function(res) {
      $scope.mediaListData = res.data;
    });
  }, 500);

  $scope.$on('$stateChangeSuccess', function (scope, args) {
    if (args.name === 'user') {
      $('#modal').modal('hide');
      $('body').removeClass('modal-open');
      console.log('Close Modal');
      modalService.set(null);
    }
  });

});

app.controller('mediaController', function ($scope, $stateParams, $state, $timeout, mediaService, modalService) {

  console.log('Media Controller');

  $('#modal').modal('show');

  var media = modalService.get();

  if (media) {
    $scope.media = media;
  } else {
    mediaService.async($stateParams.media).then(function(res) {
      $scope.media = res.data;
    });
  }

  $scope.closeModal = function (e) {
    if ( $(e.target).is('#modal') || $(e.target).is('#modal_close') ) {
      $('#modal').modal('hide');
      // Let the modal transition finish
      $timeout( function () {
        $state.go('^');
      }, 400);
    }
  }

});

app.controller('contentController', function ($scope) {
  $scope.faded = false;
});

app.controller('addController', function ($scope, pendingPeopleService, categoryService) {

  $scope.success = false;
  $scope.pendingPeople = pendingPeopleService;
  $scope.categories = categoryService;

  console.log('Add Controller');
  $scope.update = function(person) {
    var added = angular.copy(person);
    added.id = person.name.first.toLowerCase() +'_'+ person.name.last.toLowerCase();
    $scope.pendingPeople.$add(added);
    $scope.success = true;
  };

  $scope.alreadyExists = function(person) {
    return angular.equals(person, $scope.pendingPeople);
  };

  $scope.successMessage = 'Thanks for contributing to follow.la, your submission will be reviewed and added shortly.';

});

app.controller('adminController', function ($scope, activeUserService, pendingPeopleService, categoryService) {
  
  $scope.activePeople = activeUserService;
  $scope.pendingPeople = pendingPeopleService;
  $scope.categories = categoryService;

  $scope.approve = function (key, person) {
    $scope.activePeople[person.id] = person;
    $scope.activePeople[person.id].$priority = parseFloat(person.category);
    $scope.activePeople.$save(person.id);
    $scope.pendingPeople.$remove(key);
  };

  $scope.delete = function (key) {
    $scope.pendingPeople.$remove(key);
  };

  $scope.personAlreadyExists = function(person) {
    return $scope.activePeople[person.name.first + '_' + person.name.last];
  };

  $scope.categoryAlreadyExists = function (category) {
    return $scope.categories[category.name.toLowerCase()];
  };

  $scope.addCategory = function (category) {
    var added = angular.copy(category);
    if ($scope.categories.$getIndex().length) {
      added.id = $scope.categories.$getIndex().length;
    } else {added.id = 0}
    var cat = $scope.categories.$child(added.id);
    cat.$set(added);
    $scope.category.name = '';
  };

  $scope.removeCategory = function (category) {
    $scope.categories.$remove(category.id);
  };

  $scope.editingCat = false;
  $scope.editCategory = function (id) {
    $scope.editingCat = true;
  };

  $scope.doneEditCategory = function (id) {
    $scope.categories.$save(id);
    $scope.editingCat = false;
  };

  $scope.editingActivePerson = false;
  $scope.editActivePerson = function (key) {
    $scope.editingActivePerson = key;
  };

  $scope.doneEditActivePerson = function (id) {
    $scope.activePeople.$save(id);
    $scope.editingActivePerson = false;
  };

});
