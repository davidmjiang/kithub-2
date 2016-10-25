Lesson.directive("pullRequestShow",  [ "pullRequestService", "DiffService", 'LessonService', "$stateParams", "Restangular", "Auth", "$window", function(pullRequestService, DiffService, LessonService, $stateParams, Restangular, Auth, $window) {
  return {
    templateUrl:"lesson_templates/pull_requests/show.html",
    scope: { pullRequest: "=", pendingPrs: "="},
    restrict: "E",
    link: function(scope) {
      scope.comments = scope.pullRequest.comments;
      scope.diffs = DiffService.getDiffs(scope.pullRequest.parent_plan.content, scope.pullRequest.forked_plan.content);

      LessonService.getLesson($stateParams.id).then(function(lesson) {
        Auth.currentUser().then(function(currentUser){
          if (currentUser.id === lesson.teacher_id) {
            scope.lessonBelongsToCurrentUser = true;
          } else {
            scope.lessonBelongsToCurrentUser = false;
          }
        });
      });

      //Porbably need to update version, make pull requests as accepted somehow.
      scope.acceptChanges = function() {
        console.log(scope.diffs)
        console.log( DiffService.acceptChanges(scope.diffs) );
        return
        angular.element(".modal-backdrop").remove();
        scope.pullRequest.parent_plan.content = scope.pullRequest.forked_plan.content;
        scope.pullRequest.parent_plan = Restangular.restangularizeElement(null, scope.pullRequest.parent_plan, "lesson_plans");

        contributorData = { teacher_id: scope.pullRequest.forked_plan.teacher_id,
                            lesson_plan_id: scope.pullRequest.parent_plan.id };

        LessonService.save(scope.pullRequest.parent_plan).then(function() {
          pullRequestService.acceptChanges(scope.pullRequest, contributorData, $stateParams.id);
        });
        $window.location.reload();
      };

      scope.rejectChanges = function() {
        angular.element(".modal-backdrop").remove();
        pullRequestService.rejectChanges(scope.pullRequest, $stateParams.id);
        $window.location.reload();
      };
    }
  };

}]);
