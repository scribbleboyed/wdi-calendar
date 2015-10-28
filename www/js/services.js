angular.module('starter.services', ['ngResource'])
.factory('Friends', function($resource) {
	return $resource('http://localhost:3000/api/friends/:id');
})
.factory('Events', function($resource) {
	return $resource('http://localhost:3000/api/events/:id');
});