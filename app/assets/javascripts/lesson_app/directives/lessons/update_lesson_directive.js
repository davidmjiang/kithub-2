Lesson.directive("updateLessonModal",  [ "DiffService", 'LessonService', function(DiffService, LessonService) {
  return {
    templateUrl:"lesson_templates/lessons/update_lesson_modal.html",
    scope: { lesson: "=", currentUser: "=", diffs: "=", parent: "=", current: "=" },
    restrict: "E",
    link: function(scope) {
      scope.lessonBelongsToCurrentUser = (scope.currentUser.id === scope.lesson.teacher_id) ? true : false;

      angular.element('#updateModal').on('show.bs.modal', function(e) {
        console.log("Update diffs here");
        angular.copy(DiffService.getDiffs(scope.lesson.content, scope.parent.content), scope.diffs);
      });

      scope.acceptChanges = function() {
        var oldContent = scope.lesson.content;
        var oldVersion = scope.lesson.parent_version;
        scope.lesson.content = DiffService.acceptChanges(scope.diffs);
        
        scope.lesson.parent_version = scope.parent.version;

        LessonService.save(scope.lesson).then(
          function() {
            scope.current = true;
            LessonService.setFlash('alert-success', 'Changes accepted!');
          },
          function() {
            LessonService.setFlash('alert-danger', 'Could not accept changes');
            scope.lesson.content = oldContent;
            scope.lesson.parent_version = oldVersion;
        });
      };

      scope.rejectChanges = function() {
        var oldVersion = scope.lesson.parent_version;
        
        scope.lesson.parent_version = scope.parent.version;

        LessonService.save(scope.lesson).then(
          function() {
            scope.current = true;
            LessonService.setFlash('alert-success', 'Changes rejected!');
          },
          function() {
            LessonService.setFlash('alert-danger', 'Could not reject changes');
            scope.lesson.parent_version = oldVersion;
        });
      };
    }
  };

}]);