"use strict";
angular.module('Lesson').controller('LessonPlanCtrl', ['$scope', 'currentUser', 'teacher',  function($scope, currentUser, teacher){

  $scope.isCurrentUser = currentUser.id === teacher.id;
  $scope.teacher = teacher;
  $scope.lessons = teacher.lesson_plans;
  $scope.states = teacher.states;
  $scope.subjects = teacher.subjects;
  $scope.lessonTypes = teacher.lesson_types;
  $scope.hourFilter = 5;
  $scope.gradeFilter = 0;
  $scope.subjectFilter = "";
  $scope.lessonTypeFilter = "";
  $scope.filters = {
    hour: 0,
    grade: 0,
    subject: "",
    lessonType: ""
  }
  $scope.advancedFilters = false;


  // filter for grade slide
  $scope.greaterThan = function(prop, val){
    return function(item){
      return item[prop] >= val;
    }
  }

  // turn advanced filters on and off

  $scope.toggleAdvancedFilters = function(){
    $scope.advancedFilters = !$scope.advancedFilters
  }

  $scope.resetFilters = function(){
    $scope.filters.hour = 0;
    $scope.filters.grade = 0;
    $scope.filters.subject = "";
    $scope.filters.lessonType = "";
  }


}]);