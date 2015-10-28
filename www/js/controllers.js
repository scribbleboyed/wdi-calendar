angular.module('starter.controllers', ['ngDraggable'])

.controller('CalendarCtrl', function($scope, Friends, Events) {

  $scope.friendsDiv = 0; // hide/show friends div parameter

  var eventObject = function(attendee, date, hour) {
    this.attendees = [];
    this.attendees.push(attendee);
    this.date = date;
    this.hour = hour;
  };

  $scope.getEvent = function(queryDate, queryHour) {
    return Events.query({date: queryDate, hour: queryHour});
  };

  // hour and day constructors

  var hourObject = function(date, hour, color) {
    this.date = date;
    this.hour = hour;
    this.color = color;
    this.event = $scope.getEvent(this.date, this.hour);
    this.onDropComplete = function(data, evt) {
      if (!this.event) {
        this.event = new eventObject
      }
      var index = this.event.indexOf(data);
      if (index == -1) this.event.push(data);
    };
  };

  var dayObject = function(name, date) {
    this.name = name;
    this.date = date;
    this.hours = [new hourObject(this.date, 'morning', '#DDDDDD'),
    new hourObject(this.date, 'lunch', '#CCCCCC'),
    new hourObject(this.date, 'afternoon', '#BBBBBB'),
    new hourObject(this.date, 'dinner', '#AAAAAA'),
    new hourObject(this.date, 'night', '#999999')];
  };

  // update calendar days

  var dayDiff = 0;

  $scope.updateCalendar = function() {
    $scope.days = [];
    for (var i=0; i<7; i++) {
      var day = moment().add(dayDiff + i, 'days');
      $scope.days.push(new dayObject(day.format('dddd').substring(0,3), day.format('ll')));
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
