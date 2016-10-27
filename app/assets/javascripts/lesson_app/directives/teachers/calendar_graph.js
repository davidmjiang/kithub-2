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

			scope.total = ContributionsService.getTotal(scope.teacher.id);

			if(scope.total === 0){
				scope.header = "No contributions";
			}
			else if(scope.total === 1){
				scope.header = "1 contribution";
			}
			else{
				scope.header = scope.total.toString() + " contributions";
			}
			scope.header += " this year";

			scope.getWeeks = function(){
				var startingDate = ContributionsService.getStartingDate();
				var starting_days = [];
				starting_days.push(startingDate);
				var copy = new Date(startingDate.valueOf());
				for(var i = 0; i < 52; i++){
					var newDay = new Date(copy.setDate(copy.getDate() + 7));
					if(newDay.getFullYear() === 2017){
						break;
					}
					starting_days.push(newDay);
				}
				return starting_days;
			};

			scope.weeks = scope.getWeeks();

			//headers
			scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		}
	};
}]);