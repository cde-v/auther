'use strict';

app.controller('SignupCtrl', function ($scope, Auth) {
  $scope.submitSignup = function(email, password) {
    Auth.signup(email, password);
  };
});