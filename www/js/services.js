angular.module('starter.services', ['ngResource'])
.factory('Friends', function($resource) {
	return $resource('http://sooperplanner.herokuapp.com/api/friends/:id');
});