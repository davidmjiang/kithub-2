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
    hourMin: 0,
    hourMax: 10,
    gradeMin: 0,
    gradeMax: 12,
    subject: "",
    lessonType: "",
    options: {
      hideLimitLabels: true
    }
  }
  $scope.advancedFilters = false;


  // filter for grade slide
  $scope.between = function(prop, min, max){
    return function(item){
      return item[prop] >= min && item[prop] <= max;
    }
  }

  // turn advanced filters on and off

  $scope.toggleAdvancedFilters = function(){
    $scope.advancedFilters = !$scope.advancedFilters
  }

  $scope.resetFilters = function(){
    $scope.filters.hourMin = 0;
    $scope.filters.hourMax = 10;
    $scope.filters.gradeMin = 0;
    $scope.filters.gradeMax = 12;
    $scope.filters.subject = "";
    $scope.filters.lessonType = "";
  }


}]);