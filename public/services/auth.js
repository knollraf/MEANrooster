angular.module('MyApp')
  .factory('Auth', function($http, $location, $rootScope, $alert, $window) {
    var token = $window.localStorage.token;
    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      $rootScope.currentUser = payload.user;
    }
    return {
      login: function(user) {
        return $http.post('/auth/login', user)
          .success(function(data) {
            $window.localStorage.token = data.token;
            var payload = JSON.parse($window.atob(data.token.split('.')[1]));
            $rootScope.currentUser = payload.user;
            $location.path('/');
            $alert({
              title: 'Cheers!',
              content: 'You have successfully logged in.',
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          })
          .error(function() {
            delete $window.localStorage.token;
            $alert({
              title: 'Error!',
              content: 'Invalid username or password.',
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          });
      },
      signup: function(user) {
        return $http.post('/auth/signup', user)
          .success(function() {
            $location.path('/login');
            $alert({
              title: 'Congratulations!',
              content: 'Your account has been created.',
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          })
          .error(function(response) {
            $alert({
              title: 'Error!',
              content: response.data,
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          });
      },
      logout: function() {
        delete $window.localStorage.token;
        $rootScope.currentUser = null;
        $alert({
          content: 'You have been logged out.',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      }
    };
  });