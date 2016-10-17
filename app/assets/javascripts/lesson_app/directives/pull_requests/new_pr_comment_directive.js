Lesson.directive("newPrComment",  [ "pullRequestService", "$stateParams", "Auth", function(pullRequestService, $stateParams, Auth) {
  return {
    templateUrl:"lesson_templates/pull_requests/comments/new.html",
    scope: { pullRequest: "=" },
    restrict: "E",
    link: function(scope) {
      scope.comment = {
        commentable_type: "PullRequest",
        commentable_id: Number($stateParams.id)
      }

      Auth.currentUser().then(function(response){
        scope.comment.teacher_id = response.id })

      scope.createNewComment = function() {
        pullRequestService.createNewComment(scope.comment);
      }
    }
  }
}]);