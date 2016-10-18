"use strict";
angular.module('Lesson').controller('TeacherFollowersCtrl', ['$scope', 'currentUser', 'followers', '_', function($scope, currentUser, followers, _){
	
  $scope.followers = followers.teachers;

  $scope.followings = followers.following;

  $scope.isFollowing = function(teacher){
  	var ids = _.map($scope.followings, function(el){
  		return el.id;
  	});
  	return _.includes(ids, teacher.id);
  };

}]);