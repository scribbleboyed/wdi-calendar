angular.module('starter.services', [])

.factory('Events', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var events = [{
    id: 0,
    date: '2014-08-11',
    time: 'dinner',
    title: 'bday party',
    attendees: ['Edward', 'Tina']
  },
  {
    id: 1,
    date: '2014-08-11',
    time: 'lunch',
    attendees: ['Edward', 'Tina']
  },
  {
    id: 2,
    date: '2014-08-11',
    time: 'dinner',
    title: 'bday party'
  },
  {
    id: 3,
    date: '2014-08-11',
    time: 'dinner',
    title: 'bday party'
  },
  ];

  return {
    all: function() {
      return events;
    },
    remove: function(event) {
      events.splice(events.indexOf(event), 1);
    },
    get: function(eventId) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === parseInt(eventId)) {
          return events[i];
        }
      }
      return null;
    }
  };
});
