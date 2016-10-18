Lesson.directive("newPrComment",  [ "pullRequestService", "$stateParams", "Auth", function(pullRequestService, $stateParams, Auth) {
  return {
    templateUrl:"lesson_templates/pull_requests/comments/new.html",
    scope: { pullRequest: "=", comments: "="},
    restrict: "E",
    link: function(scope) {
      console.log(scope.comments)
      scope.comment = {
        commentable_type: "PullRequest",
        commentable_id: Number(scope.pullRequest.id)
      }

      Auth.currentUser().then(function(response){
        scope.comment.teacher_id = response.id })

      scope.createNewComment = function() {
        pullRequestService.createNewComment(scope.comment).then(function(response) {
           scope.comments.push(response)
           scope.comment.body = ""
        })
      }
    }
  }
}]);