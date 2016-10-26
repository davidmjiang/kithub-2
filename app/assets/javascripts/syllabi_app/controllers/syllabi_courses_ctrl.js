"use strict";

Syllabi.controller('SyllabiCoursesCtrl', ['$scope', '$state', 'currentUser', 'SyllabiCourseService', "courses",
  function($scope, $state, currentUser, SyllabiCourseService, courses) {

    $scope.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    $scope.findDay = function(day) {
      var index = Number(day);
      return $scope.days[index];
    };

    $scope.currentUser = currentUser;
    $scope.courses = courses;

    $scope.updateCourse = function(course){
      var updateObj = {};
      if (course.newStartDate) {
        updateObj.start_date = course.newStartDate.toString()
      }
      if (course.newEndDate) {
        updateObj.end_date = course.newEndDate.toString()
      }
      if (course.selectedDays) {
        updateObj.meeting_days = JSON.stringify(course.selectedDays)
      }
      course.patch(updateObj).then(function(response){
        SyllabiCourseService.updateCourses();
        $scope.toggleEditCourse(course);
      });
    };


    $scope.toggleEditCourse = function(course){
      course.editingCourse = !course.editingCourse
    }

    $scope.dayArray = function(meeting_days) {
      return JSON.parse(meeting_days)
    }





}]);
