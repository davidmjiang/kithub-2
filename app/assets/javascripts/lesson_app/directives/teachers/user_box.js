"use strict";
angular.module('Lesson').directive("userBox",  ["Restangular", function(Restangular) {
  return {
    templateUrl:"lesson_templates/teacher/user_box.html",
    scope: { teacher: "=",
             following: "=",
             user: "="
            },
    restrict: "E",
    link: function(scope){
        //if follow is true, set scope.restangularFollow to a Restangular version of that following
        //check for profile photo
        if(scope.teacher.avatar_file_name){
            scope.profile_photo = scope.teacher.image;
        }
        else{
    	   scope.profile_photo = "http://placehold.it/50x50";
    	}

        scope.follow = function(){
            var params = {following: {follower_id: scope.user.id,
                followed_id: scope.teacher.id}};
            Restangular.all("teacher_followings").post(params).then(function(response){
                scope.restangularFollow = response;
                scope.following = true;
            });
        };

        scope.unfollow = function(){
            scope.restangularFollow.remove();
            scope.following = false;
        };
    }
  };
}]);