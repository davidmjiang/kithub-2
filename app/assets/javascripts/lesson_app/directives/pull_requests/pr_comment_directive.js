Lesson.directive("prComment",  [ "pullRequestService", "Auth", function(pullRequestService, Auth) {
  return {
    templateUrl:"lesson_templates/pull_requests/comments/show.html",
    scope: { comment: "=", comments: "=" },
    restrict: "E",
    link: function(scope) {

      Auth.currentUser().then(function(response){

        if (response.id === scope.comment.teacher.id) {
          scope.commentBelongsToUser = true
        } else {
          scope.commentBelongsToUser = false
        }
      })

      // calls the removeComment function in the postRequestService
      scope.removeComment = function() {
        pullRequestService.removeComment(scope.comment.id).then(function(response) {
          // makes comment dissapear from view
          for (var c in scope.comments) {
            if(scope.comments[c].id === response.id) {
              scope.comments.splice(c, 1)
              break;
            }
          }
        })
      }
    }
  }
}]);