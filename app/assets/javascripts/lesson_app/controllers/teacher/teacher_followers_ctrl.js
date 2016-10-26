"use strict";
angular.module('Lesson').controller('TeacherFollowersCtrl', ['$scope', 'currentUser', '$stateParams', 'FollowingService', '$rootScope', function($scope, currentUser, $stateParams, FollowingService, $rootScope){

	$rootScope.$broadcast("on:page", "followers");

  $scope.followers = FollowingService.getFollowersOf()[$stateParams.id];
  $scope.currentUser = currentUser;

}]);
