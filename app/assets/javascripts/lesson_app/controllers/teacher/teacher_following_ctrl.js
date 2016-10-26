"use strict";
angular.module('Lesson').controller('TeacherFollowingCtrl', ['$scope', 'currentUser', '$stateParams', 'FollowingService', 'populate', function($scope, currentUser, $stateParams, FollowingService){

	$scope.following = FollowingService.getFollowedBy()[$stateParams.id];

  $scope.currentUser = currentUser;

}]);
