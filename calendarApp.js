// Defining angular module====================================
//Author: Yeshwant Dasari=====================================
//============================================================
var calendarApp = angular.module('calendarApp',['ui.calendar']);
calendarApp.controller('calendarCtrl', ['$scope', 'uiCalendarConfig', function($scope, uiCalendarConfig){
	//initializing jquery dependencies on load of controller
	$(function () {
        $('#datetimepicker1').datetimepicker();
        $('#datetimepicker2').datetimepicker({
            useCurrent: false //Important! See issue #1075
        });
        $("#datetimepicker1").on("dp.change", function (e) {
            $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker1").on("dp.change", function (e) {
            $('#datetimepicker2').data("DateTimePicker").maxDate(e.date);
        });
    });
    //getting all dates
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	$scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
    //events that appear on calendar
	$scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
    
    //configurations for calendar
	$scope.uiConfig = {
		calendar: {
			height: 500,
			editable: true,
			header: {
				left: 'month basicWeek basicDay agendaWeek agendaDay',
          		center: 'title',
          		right: 'today prev,next'
			},
			eventClick: function(event) {
				console.log("you clicked me", event);
			},
	        eventDrop: function(event) {
	        	console.log("the event drop is: ",event);
	        },
	        eventResize: $scope.alertOnResize,
	        eventRender: $scope.eventRender,
	        dayClick: function(date, allDay, jsEvent, view) {
	        	console.log("all events for the day are: ",date._d);
	        	$scope.startEvent = date._d;
		      $('#addEventModal').modal('show');
	        }
		}
	};
	

	/* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };
    $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [ 
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };
    //binding calendar directive with all the events=========================
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
}]);