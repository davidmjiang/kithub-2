Lesson.directive('lessonDetailsForm', ['LessonService',
   function(LessonService) {
    return {
      restrict: 'E',
      templateUrl: "lesson_templates/directives/lesson_details_form.html",
      scope: {
        lesson: "=",
        editing: "="
      },
      link: function(scope) {
        scope.states = LessonService.getStates();
        scope.grades = LessonService.getGrades();
        scope.lessonTypes = LessonService.getLessonTypes();
        scope.subjects = LessonService.getSubjects();
      }
    };
  }
]);