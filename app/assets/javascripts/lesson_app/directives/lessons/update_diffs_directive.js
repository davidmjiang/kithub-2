Lesson.directive("updateDiffs",  [ "DiffService", "LessonService",
  function(DiffService, LessonService) {
    return {
      templateUrl:"lesson_templates/pull_requests/diff.html",
      scope: { lesson: "=", diffs: "=" },
      restrict: "E",

      link: function(scope) {

        // sets all diffs shown in window to unaccepted
        scope.clearAllChanges = function () {
          scope.diffs.forEach(function(element) {
            element.accepted = false;
          });
        };

        // sets all diffs shown in window to accepted
        scope.addAllChanges = function () {
          scope.diffs.forEach(function(element) {
            element.accepted = true;
          });
        };
      }
    };

}]);