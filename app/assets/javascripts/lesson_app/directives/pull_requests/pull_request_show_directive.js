app.directive("pullRequestShow",  [ "pullRequestService", function(pullRequestService) {
  return {
    templateUrl:"template/lesson_templates/pull_requests/show.html",
    scope: { pullRequest: "=" },
    restrict: "E",
    link: function(scope) {

    }
  }
}]);