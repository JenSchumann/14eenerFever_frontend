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
    console.log("this climber is " + this.userId);

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

  //climber section
  // for logged in user to see all the climbers/users

//////////////////////////////////////////////////////////////////////////

this.showClimbers = function(){
  console.log('showClimbers here');
        $http({
          url: this.url + '/climbers',
          method: 'GET',
        }).then(function(response) {
          console.log(response.data);
          controller.climbersIndex = response.data;
          console.log("--------------");
          console.log("this is this.climbersIndex, which is response.data", controller.climbersIndex);
          console.log("--------------");
        })
      }

//error thrown w/this function:
this.setCurrentClimber = function(userId){
  console.log('setCurrentClimber talking');
        $http({
          url: this.url + '/climbers/' + this.userId,
          method: 'GET'

        }).then(function(response) {
          console.log(response.data);

          console.log("--------------");
          controller.currentClimber = response.data;
          console.log("this is controller.currentClimber, which is response.data", controller.currentClimber);
          console.log("--------------");

        }, function(error){

          //setcurrentClimber error is appearing
          console.log(error,'setCurrentClimber error')

        // }.bind(this),function(error){
        //   console.log(error);
      })
};

//create new climber Profile
this.createClimberProfile = function(newClimberProfile) {
  console.log("createClimberProfile talking");
  $http({
    url: this.url + '/climbers',
    method: 'POST',
    data: { climber: { name: this.newClimberProfile.name, img: this.newClimberProfile.img, about: this.newClimberProfile.about, level: this.newClimberProfile.level, summits: this.newClimberProfile.summits }},
  }).then(function(response) {
        console.log(response);
        console.log("------------");
        console.log("response is: ", response);
      }.bind(this),function(error){
        console.log(error);
      })
    };

//get request to edit climber profile
this.editClimberProfile = function(currentClimber) {
   $http({
     method: 'GET',
     url: this.url + '/climbers/' + this.currentClimber.id,
   }).then(function(response){
     controller.currentClimber = response.data;
     console.log("--------------");
     console.log("this is editClimberProfile trying to get ahold of the selected climber which is controller.currentClimber, which is response", controller.currentClimber);
     console.log("--------------");
   }, function(error) {
     console.log(error, 'editClimberProfile error');
   })
 }

//POST request to show updated climber profile
this.pushEditedClimberProfile = function(name, img, about, level, summits){
   console.log("trying to update the climber profile");


   $http({
     method: 'PUT',
     url: this.url + '/climbers/' + this.currentClimber.id,
     data: { climber: { name: this.updatedClimber.name, img: this.updatedClimber.img, about: this.updatedClimber.about, level: this.updatedClimber.level, summits: this.updatedClimber.summits }}
   }).then(function(response){
     console.log(response);
     console.log("--------------");
     controller.currentClimber = response.data;

     // console.log("this is controller.updatedClimber which should be the updated climber, which is response", controller.updatedClimber);
     console.log("--------------");

 }.bind(this));
}

this.deleteClimberProfile = function(currentClimber) {
      $http({
        method: 'DELETE',
        url: this.url + '/climbers/' + this.currentClimber.id,
      }).then(function(response) {
        console.log(response);
        console.log('this is deleteClimberProfile');

      }.bind(this),function(error){
        console.log(error);
      })
    };



//////////////////////////////////////////////////////////////////////////

  //summit section

//////////////////////////////////////////////////////////////////////////

this.summit = {};
this.editedSummit = {};
this.currentSummit = {};

// create Summit
this.createSummit = function(newSummit) {
  $http({
    url: this.url + '/summits',
    method: 'POST',
    data: { summit: { name: newSummit.name, description: newSummit.description, difficulty: newSummit.difficulty, img: newSummit.img, location: newSummit.location }}
  }).then(function(response) {
    console.log(response);
    this.summit = response.data.summit;
  })
}

// get 1 Summits
// from rails routes: summit GET    /summits/:id(.:format)   summits#show
this.getSummit = function(id){
  console.log('getSummit talking');
    $http({

      url: this.url + '/summits/' + id,
      method: 'GET'

    }).then(function(response){
      console.log(response.data);
      console.log("--------------");
      //do i have this line for the climbers?
      controller.currentSummit = response.data;
      console.log("--------------");
    }, function(error){
      console.log(error,'getSummit error')
    })
  };

// get all Summits
this.getSummits = function() {
  console.log('getSummits talking');
  $http({
    url: this.url + '/summits',
    method: 'GET',
  }).then(function(response) {
    console.log(response.data);
    controller.summitIndex = response.data;
  })
}

// edit summit
//commenting out this functionality until I build admin user CRUD

// this.editSummit = function(currentSummit){
//     $http({
//       method: 'GET',
//       url: this.url + '/summits/' + this.currentSummit.id,
//     }).then(function(response){
//       controller.currentSummit = response.data;
//     }, function(error){
//       console.log(error,'summit edit error')
//     })
//   };
//
//   this.pushSummitEdit = function(){
//     $http({
//       method: 'PUT',
//       url: this.url + '/summits/' + this.currentSummit.id,
//       data: this.currentSummit
//     }).then(function(response){
//       console.log(response);
//       controller.getSummits();
//     }, function(error){
//       console.log(error, 'pushSummitEdit error');
//     })
//   };
//
// // delete summit
// this.deleteSummit = function(id) {
//   $http({
//     method: 'DELETE',
//     url: this.url + '/summits/' + id
//   }).then(function(response) {
//     console.log(response);
//     controller.getSummits();
//   });
// }

//////////////////////////////////////////////////////////////////////////

  //ascension section

//////////////////////////////////////////////////////////////////////////
this.ascension = {};
this.ascensions = [];
this.newAscensionSearch = {};
this.showAscension = {};


//show one ascension
// from rails routes: ascension GET    /ascensions/:id(.:format)    ascensions#show
this.showAscension = function(id){
  console.log('showAscension talking');
  $http({
    url: this.url + '/ascensions/' + id,
    method: 'GET',
  }).then(function(response) {
    console.log(response.data);
          controller.currentAscension = response.data;
          console.log("--------------");
          console.log("this is controller.currentAscension, which is response.data", controller.currentAscension);
          console.log("--------------");
        }.bind(this),function(error){
          console.log(error);
        })
      };


// create ascension
this.createAscension = function(newAscension) {
  console.log('this createAscension works');
  $http({
    url: this.url + '/ascensions',
    method: 'POST',
    data: { ascension: { climber_id: newAscension.climber_id, summit_id: newAscension.summit_id, comments: newAscension.comments, likes: newAscension.likes }}
  }).then(function(response) {
    console.log(response);
    controller.getAscensions();
  })
}

// get all ascensions
this.getAscensions = function() {
  console.log('getAscensions talking');
  $http({
    url: this.url + '/ascensions',
    method: 'GET',
  }).then(function(response) {
    console.log(response.data);
    controller.ascensionIndex = response.data;
    console.log('ascensionIndex response is ' + controller.ascensionIndex);
  })
}


















//end of mtnController
}]);

// for climber profile select options
//still null in database when option is selected
angular.module('climberLevelSelect', [])
 app.controller('SelectController', ['$scope', function($scope) {
   $scope.data = {
     //this doesn't work:
    // model: null,
    model: this.climbers,
    ClimberProfileLevels: [
         {value: 'Beginner', name: 'Beginner'},
         {value: 'Intermediate', name: 'Intermediate'},
         {value: 'Accomplished', name: 'Accomplished'},
         {value: 'Advanced', name: 'Advanced'},
         {value: 'Expert', name: 'Expert'}
    ]
   };
}]);

// for bootstrap cards
$('#myList a[href="#profile"]').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
})

// for bootstrap modals
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
