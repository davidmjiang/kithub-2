angular.module('Lesson').controller('PullRequestNewCtrl', ['$scope', '$stateParams', "pullRequestService", "lessonService", function($scope, $stateParams, pullRequestService, lessonService){

  $scope.newPR = pullRequestService.getNewPullRequest($stateParams.id);
  // Work with lessons people to figure out how to get access to forkedLP and parentLP
  $scope.forkedLessonPlan = lessonService.getLesson($stateParams.id);
  $scope.parentLessonPlan = lessonService.getLesson($scope.forkedLessonPlan.parent_plan_id);

  $scope.createNewPullRequest = function() {
    pullRequestService.createNewPullRequest($scope.newPR, $stateParams.id);
  }

}]);