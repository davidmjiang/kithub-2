"use strict";
angular.module('Lesson').controller('TeacherFollowersCtrl', ['$scope', 'currentUser', '$stateParams', 'FollowingService', 'populate', function($scope, currentUser, $stateParams, FollowingService){

  $scope.followers = FollowingService.getFollowersOf()[$stateParams.id];
  $scope.currentUser = currentUser;

}]);
