console.log('14eener Fever is hiking it');

const app = angular.module('mtnfever', []);

//main controller
app.controller('mtnController', ['$http', '$scope', function($http, $scope) {
  $scope.modalShown1 = false;

  const controller = this;
  this.message = "this mtnController works";
  this.url = 'http://localhost:3000';
  this.user = {};
  this.users = [];
  this.userPass = {};
  this.loggedIn = false;
  this.displayReg = false;
  this.displayLog = false;

  //////////////////////////////////////////////////////////////////////////

  //user section

  //////////////////////////////////////////////////////////////////////////

this.login = function(userPass) {
  $http({
    method: 'POST',
    url: this.url + '/users/login',
    data: { user: { username: userPass.username, password: userPass.password }},
  }).then(function(response) {
    console.log(response);
    this.user = response.data.user;
    localStorage.setItem('token', JSON.stringify(response.data.token));
    if(this.user === undefined){
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
    console.log('user logged in? ', this.loggedIn);
    console.log('user is: ', this.user);
    this.userId = response.data.user.id;
    console.log(this.userId);

  }.bind(this));
};


//register new user
this.createUser = function(userPass){
    $http({
      url: this.url + '/users',
      method: 'post',
      data: {user: {username: userPass.username, password: userPass.password}}
    }).then(function(response){
      console.log(response);
      this.user = response.data.user;
      this.loggedIn = true;
    }.bind(this))
};

//see index of all logged in users - for admin functionality
this.getUsers = function() {
  $http({
    url: this.url + '/users',
    method: 'GET',
    headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response) {
      if (response.data.status == 401) {
      this.error = "Unauthorized";
    } else {
      this.users = response.data;
    }
  }.bind(this));
}

//logout
this.logout = function() {
  localStorage.clear('token');
  location.reload();
}







  //////////////////////////////////////////////////////////////////////////

    //modal section

  //////////////////////////////////////////////////////////////////////////

    $scope.toggleAboutModal = function() {
        $scope.modalShown1 = !$scope.modalShown1;
      };














//end of mtnController
}]);


app.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
      template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});
