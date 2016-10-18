"use strict";
angular.module('Lesson').controller('TeacherFollowersCtrl', ['$scope', 'currentUser', 'followers', function($scope, currentUser, followers){

  $scope.followers = followers

}]);