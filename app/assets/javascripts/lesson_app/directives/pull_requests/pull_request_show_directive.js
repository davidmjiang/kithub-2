Lesson.directive("pullRequestShow",  [ "pullRequestService", "DiffService",
  function(pullRequestService, DiffService) {
  return {
    templateUrl:"lesson_templates/pull_requests/show.html",
    scope: { pullRequest: "=" },
    restrict: "E",
    link: function(scope) {
      scope.comments = scope.pullRequest.comments
      scope.diffs = DiffService(scope.pullRequest.parent_plan.content, scope.pullRequest.forked_plan.content);
    }
  };

}]);