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
        console.log('start')
        updateObj.start_date = course.newStartDate.toString()
      }
      if (course.newEndDate) {
        console.log('end')
        updateObj.end_date = course.newEndDate.toString()
      }
      if (course.selectedDays) {
        console.log('days')
        updateObj.meeting_days = JSON.stringify(course.selectedDays)
      }
      course.patch(updateObj).then(function(response){
        SyllabiCourseService.updateCourses();
        $scope.toggleEditCourse(course);
      });
    };

    $scope.checkDates = function(){
      if (this.course.newStartDate && this.course.newEndDate) {
        if (this.course.newStartDate > this.course.newEndDate) {
          this.course.invalidDates = true;
        } else {
          this.course.invalidDates = false;
        }
      } else if (this.course.newStartDate && this.course.end_date) {
        if (this.course.newStartDate > new Date(this.course.end_date)) {
          this.course.invalidDates = true;
        } else {
          this.course.invalidDates = false;
        }
      } else if (this.course.newEndDate && this.course.start_date) {
        if (new Date(this.course.start_date) > this.course.newEndDate) {
          this.course.invalidDates = true;
        } else {
          this.course.invalidDates = false;
        }
      }
    }


    $scope.toggleEditCourse = function(course){
      course.editingCourse = !course.editingCourse
    }

    $scope.dayArray = function(meeting_days) {
      return JSON.parse(meeting_days)
    }





}]);
