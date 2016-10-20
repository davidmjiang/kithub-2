"use strict";
angular.module('Lesson').controller('TeacherFollowersCtrl', ['$scope', 'currentUser', 'followers', 'Restangular', '$stateParams', function($scope, currentUser, followers, Restangular, $stateParams){
	
  $scope.followers = followers.teachers;

  $scope.currentUser = currentUser;

  $scope.$on("unfollow:new", function(event, data){
  	var index = $scope.followers.indexOf(data);
  	$scope.followers.splice(index, 1);
  });

  $scope.$on("follow:new", function(){
  	Restangular.all('teacher_followings').customGET(
            "", {followed_id: $stateParams.id}
          ).then(function(response){
            angular.copy(response.teachers, $scope.followers);
          });
  });

}]);