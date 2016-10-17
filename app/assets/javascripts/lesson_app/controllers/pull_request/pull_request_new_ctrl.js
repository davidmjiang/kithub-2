angular.module('Lesson').controller('PullRequestNewCtrl', ['$scope', '$stateParams', "pullRequestService", "LessonService", "forkedLesson", function($scope, $stateParams, pullRequestService, LessonService, forkedLesson){

  $scope.newPR = pullRequestService.getNewPullRequest($stateParams.id);
  $scope.forkedLesson = forkedLesson
  console.log($scope.forkedLesson)
  LessonService.getLesson(forkedLesson.parent_plan_id).then(function(response){
      $scope.parentLesson = response;
  });


  $scope.createNewPullRequest = function() {
    pullRequestService.createNewPullRequest($scope.newPR, $stateParams.id);
  }

}]);