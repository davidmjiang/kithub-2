"use strict";

Lesson.controller('SearchCtrl', ['$scope', '$state', '$stateParams', 'Restangular', 'LessonService',
  function($scope, $state, $stateParams, Restangular, LessonService) {

    $scope.lessons = Restangular.all('searches').getList({q: $stateParams}).$object
    $scope.query = $stateParams.title_cont
    $scope.notTeacherShow = true;

    $scope.states = LessonService.getStates();
    $scope.lessonTypes = LessonService.getLessonTypes();
    $scope.grades = LessonService.getGrades();
    $scope.subjects = LessonService.getSubjects();

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
    };

    $scope.between = function(prop, min, max){
      return function(item){
        return item[prop] >= min && item[prop] <= max;
      }
    };

    $scope.resetFilters = function(){
      $scope.filters.hourMin = 0;
      $scope.filters.hourMax = 10;
      $scope.filters.gradeMin = 0;
      $scope.filters.gradeMax = 12;
      $scope.filters.subject = "";
      $scope.filters.lessonType = "";
    };

}]);
