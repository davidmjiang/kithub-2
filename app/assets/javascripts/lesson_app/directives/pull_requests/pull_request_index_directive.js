Lesson.directive("pullRequestIndex",  [ "pullRequestService", function(pullRequestService) {
  return {
    templateUrl:"template/lesson_templates/pull_requests/index.html",
    scope: { pullRequests: "=" },
    restrict: "E",
    link: function(scope) {
      scope.pullRequests = pullRequestService.getPullRequests
    }
  }
}]);