'use strict';

/* Services */

app.factory('userService', function ($http, instagramApiURL, instagramClienId) {
  var service = {
    async: function(user) {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http({
        method: 'JSONP',
        responseType: 'json',
        url: instagramApiURL + 'users/' + user + '/?callback=JSON_CALLBACK&client_id=' + instagramClienId
      }).then(function (response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return service;
});

app.factory('mediaListService', function ($http, instagramApiURL, instagramClienId) {
  var service = {
    async: function(user) {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http({
        method: 'JSONP',
        responseType: 'json',
        url: instagramApiURL + 'users/' + user + '/media/recent/?callback=JSON_CALLBACK&client_id=' + instagramClienId
      }).then(function (response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return service;
});

app.factory('mediaService', function ($http, instagramApiURL, instagramClienId) {
  var service = {
    async: function(mediaId) {
      
      console.log('Requesting Media:');
      console.log(instagramApiURL + '/media/' + mediaId + '?callback=JSON_CALLBACK&client_id=' + instagramClienId);

      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http({
        method: 'JSONP',
        responseType: 'json',
        // url: 'https://api.instagram.com/v1/tags/'+tagName+'/media/recent?callback=JSON_CALLBACK&client_id=39e8f05d556240808c7e98e5926d1f7d'
        url: instagramApiURL + '/media/' + mediaId + '?callback=JSON_CALLBACK&client_id=' + instagramClienId
      }).then(function (response) {
        // The then function here is an opportunity to modify the response
        // console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return service;
});

app.service('modalService', function () {

  var modalData = null;

  this.set = function (data) {
    modalData = data;
  }

  this.get = function () {
    return modalData;
  }

});

app.factory('navService', ['$firebase', 'firebaseURL', function($firebase, firebaseURL) {
  var ref = new Firebase(firebaseURL + 'nav/top');
  return $firebase(ref);
}]);

app.factory('activeUserService', ['$firebase', 'firebaseURL', function($firebase, firebaseURL) {
  var ref = new Firebase(firebaseURL + 'active/people');
  return $firebase(ref);
}]);

app.factory('pendingPeopleService', ['$firebase', 'firebaseURL', function($firebase, firebaseURL) {
  var ref = new Firebase(firebaseURL + 'pending/people');
  return $firebase(ref);
}]);

app.factory('categoryService', ['$firebase', 'firebaseURL', function($firebase, firebaseURL) {
  var ref = new Firebase(firebaseURL + 'categories');
  return $firebase(ref);
}]);
