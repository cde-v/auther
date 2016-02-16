'use strict';

app.factory('Login', function($http, $state) {
  function Login (props) {
    angular.extend(this, props);
  }

  Login.url = '/login';


  Login.login = function (email, password) {
    return $http.post(Login.url, {
      "email": email,
      "password": password
    })
    .then(function (res) {
      if(res.data === "OK") $state.go('stories');
      // else window.alert("Invalid username or password"); //doesn't work??
    });
  };

  return Login;
});
