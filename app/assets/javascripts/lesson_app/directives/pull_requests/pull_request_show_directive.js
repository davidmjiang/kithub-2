Lesson.directive("pullRequestShow",  [ "pullRequestService", "DiffService", 'LessonService',
  function(pullRequestService, DiffService, LessonService) {
  return {
    templateUrl:"lesson_templates/pull_requests/show.html",
    scope: { pullRequest: "=" },
    restrict: "E",
    link: function(scope) {
      scope.comments = scope.pullRequest.comments
      scope.diffs = DiffService(scope.pullRequest.parent_plan.content, scope.pullRequest.forked_plan.content);

      //Porbably need to update version, make pull requests as accepted somehow.
      scope.acceptChanges = function() {
        console.log('Hello')
        scope.pullRequest.parent_plan.content = scope.pullRequest.forked_plan.content
        LessonService.save(scope.pullRequest.parent_plan).then(function() {
          pullRequestService.acceptChanges(scope.pullRequest)
        });
      }

      scope.rejectChanges = function() {
        pullRequestService.rejectrequest();
      }
    }
  };

}]);
