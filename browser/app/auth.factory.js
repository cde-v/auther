'use strict';

app.factory('Auth', function($http, $state) {
  function Auth(props) {
    angular.extend(this, props);
  }
  Auth.val = null;
  Auth.getCurrentUser = function () {
    return Auth.val;
  }
  Auth.signup = function(email, password) {
    return $http.post('/api/users', {
        "email": email,
        "password": password
      })
      .then(function(res) {
        if(res.data._id) Auth.login(res.data.email, res.data.password);
        // else window.alert("Invalid username or password"); //doesn't work??
      });
  };

  Auth.login = function(email, password) {
    return $http.post('/auth/login', {
        "email": email,
        "password": password
      })
      .then(function(res) {
        // console.log(res);
        if(res.statusText === "OK") {
          Auth.val = res.data.val;
          // console.log(res)
          $state.go('stories');
        }
        // else window.alert("Invalid username or password"); //doesn't work??
      });
  };
  Auth.logout = function() {
    return $http.post('/auth/logout')
      .then(function(res) {
        if(res.data === "OK") $state.go('login');
        // else window.alert("Invalid username or password"); //doesn't work??
      });
  };

  Auth.isAuthenticated = function() {
    return !!Auth.val
  }

  Auth.isAuthorized = function () {
    return $http.put('/auth/me', {"userId": Auth.val})
      .then(function(res) {
        if(res.statusText === "OK") return true
      })
  }

  return Auth;
});
