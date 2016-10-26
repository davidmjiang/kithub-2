"use strict";
angular.module("Lesson").directive('calendarColumn', function(){
	return{
		templateUrl: "lesson_templates/directives/calendar_column.html",
		restrict: "E",
		scope: {
			start: "=",
			contributions: "="
		},
		link: function(scope){
			scope.getData = function(date){
				if(scope.contributions[date]){
					return scope.contributions[date];
				}
				else{
					return 0;
				}
			};

			scope.getDays = function(){
				var days = [];
				days.push(scope.start);
				var copy = new Date(scope.start.valueOf());
				for(var i = 0; i < 7; i++){
					var newDay = new Date(copy.setDate(copy.getDate() + 1));
					days.push(newDay);
				}
				return days;
			};

			scope.days = scope.getDays();
		}
	};
});