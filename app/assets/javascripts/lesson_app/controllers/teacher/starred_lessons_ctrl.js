"use strict";
angular.module('Lesson').controller('StarredLessonsCtrl', ['$scope', 'currentUser', 'starred_lessons', '$rootScope', function($scope, currentUser, starred_lessons, $rootScope){

	$rootScope.$broadcast("on:page", "starred");

  $scope.starred_lessons = starred_lessons

}]);