"use strict";
angular.module("Lesson").directive('calendarSquare',  ['ContributionsService', function(ContributionsService){
	return{
		templateUrl: "lesson_templates/directives/calendar_square.html",
		restrict: "E",
		scope:{
			date: "=",
			data: "=",
			teacher: "="
		},
		link: function(scope){
			if(scope.data === 0){
				scope.message = "No contributions";
			}
			else if(scope.data === 1){
				scope.message = "1 contribution";
			}
			else{
				scope.message = scope.data.toString() + " contributions";
			}
			var date_part = " on " + scope.date.toDateString();
			scope.message += date_part;
			//color
			if(scope.data > 0){
				scope.color = ContributionsService.getColor(scope.teacher, scope.data);
			}
			else{
				scope.color = "rgb(224, 224, 224)";
			}
		}
	};
}]);