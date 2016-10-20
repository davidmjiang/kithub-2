"use strict";
angular.module('Lesson').controller('TeacherFollowingCtrl', ['$scope', 'currentUser', 'following', function($scope, currentUser, following){

  $scope.following = following.teachers;
  $scope.currentUser = currentUser;

}]);