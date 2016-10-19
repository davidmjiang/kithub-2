angular.module('Lesson').controller('PullRequestNewCtrl', ['$scope', '$stateParams', "pullRequestService", "LessonService", "forkedLesson", "currentUser", function($scope, $stateParams, pullRequestService, LessonService, forkedLesson, currentUser){

  $scope.newPR = pullRequestService.getNewPullRequest($stateParams.id);

  $scope.forkedLesson = forkedLesson

  // LessonService.getLesson(forkedLesson.parent_plan_id).then(function(response){
  //     $scope.parentLesson = response;
  // });

  $scope.createNewPullRequest = function() {
    pullRequestService.createNewPullRequest($scope.newPR, $stateParams.id);
  };

  LessonService.getLesson($stateParams.id).then(function(response){
    $scope.lessonBelongsToCurrentUser = (currentUser.id === response.teacher_id)
  })
}]);