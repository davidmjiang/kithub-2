Lesson.directive("pullRequestShow",  [ "pullRequestService", "DiffService", 'LessonService', "$stateParams", "Restangular", "Auth", function(pullRequestService, DiffService, LessonService, $stateParams, Restangular, Auth) {
  return {
    templateUrl:"lesson_templates/pull_requests/show.html",
    scope: { pullRequest: "=" },
    restrict: "E",
    link: function(scope) {
      scope.comments = scope.pullRequest.comments
      scope.diffs = DiffService(scope.pullRequest.parent_plan.content, scope.pullRequest.forked_plan.content);

      LessonService.getLesson($stateParams.id).then(function(lesson) {
        Auth.currentUser().then(function(currentUser){
          if (currentUser.id === lesson.teacher_id) {
            scope.lessonBelongsToCurrentUser = true

          } else {
            scope.lessonBelongsToCurrentUser = false
          }
        })

      })

      //Porbably need to update version, make pull requests as accepted somehow.
      scope.acceptChanges = function() {
        angular.element(".modal-backdrop").remove()
        scope.pullRequest.parent_plan.content = scope.pullRequest.forked_plan.content
        scope.pullRequest.parent_plan = Restangular.restangularizeElement(null, scope.pullRequest.parent_plan, "lesson_plans")

        LessonService.save(scope.pullRequest.parent_plan).then(function() {
          pullRequestService.acceptChanges(scope.pullRequest, $stateParams.id)
        });
      }

      scope.rejectChanges = function() {
        angular.element(".modal-backdrop").remove()
        pullRequestService.rejectChanges(scope.pullRequest, $stateParams.id);
      }
    }
  };

}]);
