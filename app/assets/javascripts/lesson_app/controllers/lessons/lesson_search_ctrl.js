"use strict";

Lesson.controller('SearchCtrl', ['$scope', '$state', 'currentUser', '$stateParams', 'Restangular', 'LessonService', 
  function($scope, $state, currentUser, $stateParams, Restangular, LessonService) {

    if ($stateParams.searchTerm == null) {
      $state.go('main.teachers.overview', {id: currentUser.id})
    }

    $scope.searchType = $stateParams.searchType;
    if ($stateParams.searchType === "name") {
      $scope.teachers = Restangular.all('searches').getList({q: $stateParams}).$object;
      $scope.results_num = $scope.teachers.length
      $scope.searchStyle = "users"
    } else {
      $scope.lessons =  Restangular.all('searches').getList({q: $stateParams}).$object
      console.log($scope.lessons); 
      $scope.results_num = $scope.lessons.length
      $scope.searchStyle = "lesson plans' " + $stateParams.searchType
    }
    $scope.query = $stateParams.searchTerm
    $scope.newQuery = angular.copy($scope.query)
    $scope.notTeacherShow = true;
    $scope.currentUser = currentUser
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
      state: "",
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
      $scope.filters.state = "";
    };

}]);
