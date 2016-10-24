Lesson.directive("diff",  [ "pullRequestService", "DiffService", "LessonService",
  function(pullRequestService, DiffService, LessonService) {
    return {
      templateUrl:"lesson_templates/pull_requests/diff.html",
      scope: { pullRequest: "=" },
      restrict: "E",

      link: function(scope) {
        if (!scope.pullRequest.parent_plan) {
          LessonService.getLesson(scope.pullRequest.parent_plan_id).then(function(response) {
            pullRequest.parent_plan = response
            scope.diffs = DiffService(scope.pullRequest.parent_plan.content, scope.pullRequest.forked_plan.content);
          })
        } else {
          scope.diffs = DiffService(scope.pullRequest.parent_plan.content, scope.pullRequest.forked_plan.content);
        }

        scope.showPopover = function() {
          scope.popoverIsVisible = true;
        };

        scope.hidePopover = function () {
          scope.popoverIsVisible = false;
        };
      }
    };

}]);