"use strict";
angular.module('Lesson').controller('TeacherFollowingCtrl', ['$scope', 'currentUser', 'following', function($scope, currentUser, following){

  $scope.following = following.teachers;
  $scope.currentUser = currentUser;

  $scope.$on("follow:removed", function(event, data){
  	var index = $scope.following.indexOf(data);
  	$scope.following.splice(index, 1);
  });

}]);