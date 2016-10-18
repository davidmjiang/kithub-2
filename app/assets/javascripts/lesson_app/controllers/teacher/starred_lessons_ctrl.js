"use strict";
angular.module('Lesson').controller('StarredLessonsCtrl', ['$scope', 'currentUser', 'starred_lessons', function($scope, currentUser, starred_lessons){

  $scope.starred_lessons = starred_lessons

}]);