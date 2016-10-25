"use strict";

Syllabi.controller('SyllabiCoursesShowCtrl', ['$scope', '$state', 'currentUser', 'SyllabiCourseService', "courses", 'course', 'teacher',
  function($scope, $state, currentUser, SyllabiCourseService, courses, course, teacher) {


    $scope.currentUser = currentUser;
    $scope.courses = courses;
    $scope.course = course;
    $scope.teacher = teacher;

    $scope.meeting_days = JSON.parse($scope.course.meeting_days)

    $scope.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    $scope.findDay = function(day) {
      var index = Number(day);
      return $scope.days[index];
    };

    $scope.setDragParams = function(event, ui, lesson) {
      $scope.draggedLesson = lesson;
    };

    $scope.addLessonPlan =function(event, ui, courseDay){
      courseDay.lesson_plans.push($scope.draggedLesson);
      console.log(courseDay);
      SyllabiCourseService.addLessonPlanDay(courseDay.id, $scope.draggedLesson.id);
    }

    $scope.deleteLessonPlan = function(lesson_plan, courseDay) {
      _.remove(courseDay.lesson_plans, function(lp){
        return lesson_plan.id == lp.id
      });
      SyllabiCourseService.removeLessonPlanDay(courseDay.id, lesson_plan.id);
    }





}]);
