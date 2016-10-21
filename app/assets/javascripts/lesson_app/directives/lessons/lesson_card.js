Lesson.directive('lessonCard', [
   function() {
    return {
      restrict: 'A',
      templateUrl: "lesson_templates/directives/lesson_card.html",
      scope: {
        lesson: "=",
        notTeacherShow: "="
      },
      link: function(scope){
        console.log(scope.notTeacherShow)
        console.log(scope.lesson)
      }
    };
  }
]);
