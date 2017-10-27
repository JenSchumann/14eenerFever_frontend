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
