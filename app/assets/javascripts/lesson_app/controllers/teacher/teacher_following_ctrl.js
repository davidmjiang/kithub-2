"use strict";
angular.module('Lesson').controller('TeacherFollowingCtrl', ['$scope', 'currentUser', '$stateParams', 'FollowingService', '$rootScope', function($scope, currentUser, $stateParams, FollowingService, $rootScope){

	$rootScope.$broadcast("on:page", "following");

	$scope.following = FollowingService.getFollowedBy()[$stateParams.id];
  $scope.currentUser = currentUser;

}]);
