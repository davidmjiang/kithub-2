"use strict";

Syllabi.controller('SyllabiCoursesShowCtrl', ['$scope', '$state', 'currentUser', 'SyllabiCourseService', "courses", 'course', 'teacher', 'Restangular',
  function($scope, $state, currentUser, SyllabiCourseService, courses, course, teacher, Restangular) {


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
      $scope.draggedLesson.used = true;
      Restangular.restangularizeElement(null, $scope.draggedLesson, 'lesson_plans')
      $scope.draggedLesson.patch({used: true})
      SyllabiCourseService.addLessonPlanDay(courseDay.id, $scope.draggedLesson.id);
    };

    $scope.deleteLessonPlan = function(lesson_plan, courseDay) {
      _.remove(courseDay.lesson_plans, function(lp){
        return lesson_plan.id == lp.id
      });
      Restangular.restangularizeElement(null, lesson_plan, 'lesson_plans')
      lesson_plan.used = false;
      lesson_plan.patch({used: false});
      SyllabiCourseService.removeLessonPlanDay(courseDay.id, lesson_plan.id);
    }

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

     $scope.states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

    $scope.grades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    $scope.subjects = ['Math', 'Science', 'English', 'Foreign Language', 'Art', 'Physical Education', 'History'];

    $scope.lessonTypes = ['Individual', 'Group', 'Teacher-led'];





}]);
