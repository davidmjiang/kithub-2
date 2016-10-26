"use strict";
angular.module("Lesson").directive('calendarGraph', ['ContributionsService', function(ContributionsService){
	return{
		templateUrl: "lesson_templates/directives/calendar_graph.html",
		restrict: "E",
		scope: {
			teacher: "="
		},
		link: function(scope){
			var c = ContributionsService.getAll();
			scope.all = c[scope.teacher.id];

			scope.getWeeks = function(){
				//first Monday of the year
				var startingDate = new Date("January 4, 2016");
				var starting_days = [];
				starting_days.push(startingDate);
				var copy = new Date(startingDate.valueOf());
				for(var i = 0; i < 52; i++){
					var newDay = new Date(copy.setDate(copy.getDate() + 7));
					starting_days.push(newDay);
				}
				return starting_days;
			};

			scope.weeks = scope.getWeeks();
		}
	};
}]);