"use strict";
angular.module('Lesson').directive("userBox",  ["Restangular", "$http", "$rootScope", function(Restangular, $http, $rootScope) {
  return {
    templateUrl:"lesson_templates/teacher/user_box.html",
    scope: { teacher: "=",
             user: "="
            },
    restrict: "E",
    link: function(scope){

        //no button if it's the current user
        if(scope.teacher.id === scope.user.id){
            scope.isCurrentUser = true;
        }

        if(scope.teacher.following){
            scope.following = true;
        }
        else{
            scope.following = false;
        }
        //check for profile photo
        if(scope.teacher.avatar_file_name){
            scope.profile_photo = scope.teacher.image;
        }
        else{
    	   scope.profile_photo = "https://placehold.it/50x50";
    	}

        scope.follow = function(){
            var params = {following: {follower_id: scope.user.id,
                followed_id: scope.teacher.id}};
            Restangular.all("teacher_followings").post(params).then(function(response){
                scope.following = true;
                //broadcast that there is a new follow
                if(scope.teacher.id === scope.user.id){
                    $rootScope.$broadcast('follow:created'); 
                }
            });
        };

        scope.unfollow = function(){
            $http.delete('api/v1/teacher_followings/'+scope.teacher.following[0].id);
            scope.following = false;
            //broadcast that a follow has been removed
            if(scope.teacher.id === scope.user.id){
                $rootScope.$broadcast('follow:removed', scope.teacher);
             }
        };
    }
  };
}]);