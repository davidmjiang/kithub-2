Lesson.directive("pullRequestShow",  [ "pullRequestService", "DiffService", 
  function(pullRequestService, DiffService) {
  return {
    templateUrl:"lesson_templates/pull_requests/show.html",
    scope: { pullRequest: "=" },
    restrict: "E",
    link: function(scope) {
      console.log("forked", scope.pullRequest.forked_plan)
      console.log("parent", scope.pullRequest.parent_plan)
      scope.diffs = DiffService(scope.pullRequest.parent_plan.content, scope.pullRequest.forked_plan.content);
      console.log(scope.diffs)
    }
  };

}]);