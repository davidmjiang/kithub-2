"use strict";
angular.module('Lesson').controller('TeacherFollowersCtrl', ['$scope', 'currentUser', '$stateParams', 'FollowingService', function($scope, currentUser, $stateParams, FollowingService){
	
  $scope.followers = FollowingService.getFollowersOf()[$stateParams.id];

  $scope.currentUser = currentUser;

}]);