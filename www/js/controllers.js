angular.module('starter.controllers', ['ngDraggable'])

.controller('DashCtrl', function($scope, Events) {

  var hour = function(name, color) {
    this.name = name;
    this.color = color;
    this.attendees = [];
    this.onDropComplete = function(data, evt) {
      var index = this.attendees.indexOf(data);
      if (index == -1) this.attendees.push(data);
    };
    this.onDragSuccess = function(data,evt){
      var index = this.attendees.indexOf(data);
      if (index > -1) this.attendees.splice(index, 1);
    };
  };

  var day = function(name, date, color) {
    this.name = name;
    this.date = date;
    this.hours = [new hour('morning', '#DDDDDD'),
    new hour('lunch', '#CCCCCC'),
    new hour('afternoon', '#BBBBBB'),
    new hour('dinner', '#AAAAAA'),
    new hour('night', '#999999')];
  };

  $scope.events = Events.all();
  $scope.remove = function(event) {
    Events.remove(event);
  };
  $scope.centerAnchor = true;
  $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}
  
  $scope.friends = [
  {image_url:'https://scontent-lax3-1.xx.fbcdn.net/hphotos-xtf1/v/t1.0-9/1004495_10102484715591856_812774478_n.jpg?oh=a18f07d19db317f86c5d32236a47c4bf&oe=56BD4F72'},
  {image_url:'https://scontent-lax3-1.xx.fbcdn.net/hphotos-xfa1/t31.0-8/s960x960/10604617_10103661940149406_3130356463444826570_o.jpg'}
  ];

  $scope.days = [
    new day('Mon', '10/29'),
    new day('Tue', '10/31'),
    new day('Wed', '11/01'),
    new day('Thu', '11/02'),
    new day('Fri', '11/03')
  ];

})

.controller('EventsCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('EventDetailCtrl', function($scope, $stateParams, Events) {
  $scope.event = Events.get($stateParams.eventId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
