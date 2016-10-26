Lesson.directive("updateLessonModal",  [ "DiffService", 'LessonService', "Restangular", "$window", function(DiffService, LessonService, Restangular, $window) {
  return {
    templateUrl:"lesson_templates/lessons/update_lesson_modal.html",
    scope: { lesson: "=", currentUser: "=", diffs: "=" },
    restrict: "E",
    link: function(scope) {
      scope.lessonBelongsToCurrentUser = (scope.currentUser.id === scope.lesson.teacher_id) ? true : false;
      // scope.comments = scope.pullRequest.comments;
      // scope.diffs = DiffService.getDiffs(scope.pullRequest.parent_plan.content, scope.pullRequest.forked_plan.content);

      // LessonService.getLesson($stateParams.id).then(function(lesson) {
      //   Auth.currentUser().then(function(currentUser){
      //     if (currentUser.id === lesson.teacher_id) {
      //       scope.lessonBelongsToCurrentUser = true;
      //     } else {
      //       scope.lessonBelongsToCurrentUser = false;
      //     }
      //   });
      // });

      // //Porbably need to update version, make pull requests as accepted somehow.
      // scope.acceptChanges = function() {
      //   var newContent = DiffService.acceptChanges(scope.diffs);
      //   angular.element(".modal-backdrop").remove();
      //   scope.pullRequest.parent_plan.content = newContent;
      //   scope.pullRequest.parent_plan = Restangular.restangularizeElement(null, scope.pullRequest.parent_plan, "lesson_plans");

      //   contributorData = { teacher_id: scope.pullRequest.forked_plan.teacher_id,
      //                       lesson_plan_id: scope.pullRequest.parent_plan.id };

      //   LessonService.save(scope.pullRequest.parent_plan).then(function() {
      //     pullRequestService.acceptChanges(scope.pullRequest, contributorData, $stateParams.id);
      //     scope.lesson.content = newContent;
      //   });
      //   $window.location.reload();
      // };

      // scope.rejectChanges = function() {
      //   angular.element(".modal-backdrop").remove();
      //   pullRequestService.rejectChanges(scope.pullRequest, $stateParams.id);
      //   $window.location.reload();
      // };
    }
  };

}]);