"use strict";
angular.module("Lesson").directive('daysColumn', function(){
	return{
		templateUrl: "lesson_templates/directives/days_column.html",
		restrict: "E"
	};
});