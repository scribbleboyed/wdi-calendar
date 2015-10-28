angular.module('starter.controllers', ['ngDraggable'])

.controller('CalendarCtrl', function($scope, $http, Friends) {

  $scope.friendsDiv = 0; // hide/show friends div parameter

  // hour and day constructors

  var hourObject = function(date, hour, color) {
    this.date = date;
    this.hour = hour;
    this.color = color;
    this.event = null;
    this.onDropComplete = function(data, evt) {
      var index = this.event.indexOf(data);
      if (index == -1) this.event.push(data);
    };
  };

  var dayObject = function(day_name, date_string, date) {
    this.name = day_name;
    this.date_string = date_string;
    this.date = date;
    this.hours = [new hourObject(this.date, 'morning', '#DDDDDD'),
    new hourObject(this.date, 'lunch', '#CCCCCC'),
    new hourObject(this.date, 'afternoon', '#BBBBBB'),
    new hourObject(this.date, 'dinner', '#AAAAAA'),
    new hourObject(this.date, 'night', '#999999')];
  };

  // update calendar days

  var dayDiff = 0;

  $scope.updateEvent = function(dayIndex, hourIndex, date, hour) {
    var urlString = 'http://sooperplanner.herokuapp.com/api/events/' + date + '/' + hour;
    $http
      .get(urlString)
      .then(function(response) {
        $scope.days[dayIndex].hours[hourIndex].event = response.data[0];
      });
  };

  $scope.updateCalendar = function() {
    $scope.days = [];
    for (var i=0; i<7; i++) {
      var current_day = moment().add(dayDiff + i, 'days');
      var current_day_name = current_day.format('dddd').substring(0,3);
      var current_day_date_string = current_day.format('ll').split(',')[0];
      var current_day_date = current_day.format('YYYYMMDD');
      var day = new dayObject(current_day_name, current_day_date_string, current_day_date);
      $scope.days.push(day);
    }

    for (var j=0; j<$scope.days.length; j++) {
      for (var k=0; k<$scope.days[j].hours.length; k++) {
        $scope.updateEvent(j, k, $scope.days[j].date, $scope.days[j].hours[k].hour);
      }
    }
  };

  $scope.updateCalendar();

  $scope.nextWeek = function() {
    dayDiff += 7;
    $scope.updateCalendar();
  };

  $scope.prevWeek = function() {
    dayDiff -= 7;
    $scope.updateCalendar();
  };

  // show friends

  var getFriends = function() {
    Friends.query(function(data) {
      $scope.friends = data;
    });
  };

  getFriends();

  $scope.showFriends = function() {
    $scope.friendsDiv = 1;
  };

  $scope.hideFriends = function() {
    $scope.friendsDiv = 0;
  };

})

.controller('EventsCtrl', function($scope, Events) {

  $scope.getEvents = function() {
    $scope.events = Events.query();
  };

  $scope.getEvents();

})

.controller('EventDetailCtrl', function($scope, $stateParams, Events) {
  $scope.event = Events.get({id: $stateParams.id});
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
