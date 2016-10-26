"use strict";
angular.module("Lesson").directive('calendarSquare', function(){
	return{
		templateUrl: "lesson_templates/directives/calendar_square.html",
		restrict: "E",
		scope:{
			date: "=",
			data: "="
		},
		link: function(scope){
			
		}
	};
});