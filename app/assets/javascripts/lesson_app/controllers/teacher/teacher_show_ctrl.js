"use strict";
angular.module('Lesson').controller('TeacherShowCtrl', ['$scope', 'currentUser', 'teacher', function($scope, currentUser, teacher){

	$scope.teacher = teacher;

}]);