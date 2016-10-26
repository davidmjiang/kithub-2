"use strict";
angular.module("Lesson").directive('calendarColumn', function(){
	return{
		templateUrl: "lesson_templates/directives/calendar_column.html",
		restrict: "E",
		scope: {
			start: "=",
			contributions: "=",
			teacher: "="
		},
		link: function(scope){
			scope.tId = scope.teacher.id;

			scope.getData = function(date){
				var hours = date.setHours(0,0,0,0);
				if(scope.contributions[hours]){
					return scope.contributions[hours];
				}
				else{
					return 0;
				}
			};

			scope.getDays = function(){
				var days = [];
				days.push(scope.start);
				var copy = new Date(scope.start.valueOf());
				for(var i = 0; i < 6; i++){
					var newDay = new Date(copy.setDate(copy.getDate() + 1));
					days.push(newDay);
				}
				return days;
			};

			scope.days = scope.getDays();
		}
	};
});