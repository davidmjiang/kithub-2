Lesson.directive("updateLessonModal",  [ "DiffService", 'LessonService', "Restangular", "$window", function(DiffService, LessonService, Restangular, $window) {
  return {
    templateUrl:"lesson_templates/lessons/update_lesson_modal.html",
    scope: { lesson: "=", currentUser: "=", diffs: "=", parent: "=" },
    restrict: "E",
    link: function(scope) {
      scope.lessonBelongsToCurrentUser = (scope.currentUser.id === scope.lesson.teacher_id) ? true : false;
      console.log(scope.lesson)
      setTimeout(function() {console.log(scope.parent)}, 500)

      //Porbably need to update version, make pull requests as accepted somehow.
      scope.acceptChanges = function() {
        var oldContent = scope.lesson.content;
        var oldVersion = scope.lesson.parent_version;
        scope.lesson.content = DiffService.acceptChanges(scope.diffs);
        // angular.element(".modal-backdrop").remove();
        
        scope.lesson.parent_version = scope.parent.version;
        console.log(oldVersion + " -> " + scope.lesson.parent_version)
        LessonService.save(scope.lesson).then(
          function() {
            LessonService.setFlash('alert-success', 'Lesson updated!');
          },
          function() {
            LessonService.setFlash('alert-danger', 'Could not update lesson');
            scope.lesson.content = oldContent;
            scope.lesson.parent_version = oldVersion;
        });
      };

      scope.rejectChanges = function() {
        var oldVersion = scope.lesson.parent_version;
        // angular.element(".modal-backdrop").remove();
        
        scope.lesson.parent_version = scope.parent.version;
        console.log(oldVersion + " -> " + scope.lesson.parent_version)
        LessonService.save(scope.lesson).then(
          function() {
            LessonService.setFlash('alert-success', 'Lesson updated!');
          },
          function() {
            LessonService.setFlash('alert-danger', 'Could not update lesson');
            scope.lesson.parent_version = oldVersion;
        });
      };
    }
  };

}]);