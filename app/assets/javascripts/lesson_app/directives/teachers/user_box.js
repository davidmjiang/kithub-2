"use strict";
angular.module('Lesson').directive("userBox",  [function() {
  return {
    templateUrl:"lesson_templates/teacher/user_box.html",
    scope: { teacher: "=",
             following: "="
            },
    restrict: "E",
    link: function(scope){
        //check for profile photo
        if(scope.teacher.avatar_file_name){
            scope.profile_photo = scope.teacher.image;
        }
        else{
    	   scope.profile_photo = "http://placehold.it/50x50";
    	}

    }
  };
}]);