"use strict";

Syllabi.controller('SyllabiCoursesCtrl', ['$scope', '$state', 'currentUser', 'SyllabiCourseService', "courses",
  function($scope, $state, currentUser, SyllabiCourseService, courses) {

    $scope.currentUser = currentUser;
    $scope.courses = courses;

    $scope.updateCourse = function(course){
      console.log(course);
      course.patch({
        start_date: course.newStartDate.toString(),
        end_date: course.newEndDate.toString()
      });
    };





}]);
