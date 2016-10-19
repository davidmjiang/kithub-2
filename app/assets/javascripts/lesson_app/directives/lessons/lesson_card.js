Lesson.directive('lessonCard', [
   function() {
    return {
      restrict: 'A',
      templateUrl: "lesson_templates/directives/lesson_card.html",
      scope: {
        lesson: "="
      }
    };
  }
]);
