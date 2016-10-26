"use strict";
angular.module('Lesson').directive("userBox",  ["FollowingService", "$rootScope", function(FollowingService, $rootScope) {
  return {
    templateUrl:"lesson_templates/teacher/user_box.html",
    scope: { teacher: "=",
             user: "="
            },
    restrict: "E",
    link: function(scope){
        FollowingService.populate(scope.teacher.id).then(function(response){
            scope.following = FollowingService.checkFollowing(scope.user, scope.teacher);
        });
        //no button if it's the current user
        if(scope.teacher.id === scope.user.id){
            scope.isCurrentUser = true;
        }

        //check for profile photo
        if(scope.teacher.avatar_file_name){
            scope.profile_photo = scope.teacher.image;
        }
        else{
    	   scope.profile_photo = "https://placehold.it/50x50";
    	}

        scope.follow = function(){
            FollowingService.create(scope.user, scope.teacher).then(function(){
                scope.following = true;
                $rootScope.$broadcast('follow:new', scope.user);
            });
        };

        scope.unfollow = function(){
            FollowingService.delete(scope.user, scope.teacher).then(function(){
                scope.following = false;
                $rootScope.$broadcast('follow:delete', scope.user);
            });
        };
    }
  };
}]);
