'use strict';

app.factory('Auth', function($http, $state) {
  function Auth(props) {
    angular.extend(this, props);
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
  return Auth;
});