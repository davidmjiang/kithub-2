Lesson.directive("newPrComment",  [ "pullRequestService", function(pullRequestService) {
  return {
    templateUrl:"lesson_templates/pull_requests/comments/show.html",
    scope: { comment: "=" },
    restrict: "E"
  }
}]);