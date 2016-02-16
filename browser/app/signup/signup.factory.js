'use strict';

app.factory('Signup', function($http, $state, Login) {
  function Signup (props) {
    angular.extend(this, props);
  }

  Signup.url = '/api/users';


  Signup.signup = function (email, password) {
    return $http.post(Signup.url, {
      "email": email,
      "password": password
    })
    .then(function (res) {
      if(res.data._id) Login.login(res.data.email, res.data.password);
      // else window.alert("Invalid username or password"); //doesn't work??
    });
  };

  return Signup;
});
