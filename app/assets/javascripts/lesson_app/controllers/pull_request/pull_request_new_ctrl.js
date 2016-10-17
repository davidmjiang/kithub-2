angular.module('Lesson').controller('PullRequestNewCtrl', ['$scope', 'currentUser', "pullRequestService",  function($scope, currentUser, pullRequestService){

  $scope.newPR = pullRequestService.getNewPullRequest();
  // Work with lessons people to figure out how to get access to forkedLP and parentLP
  // $scope.forkedLessonPlan = pullRequestService.getNewPullRequest();
  // $scope.parentLessonPlan = pullRequestService.getNewPullRequest();

  $scope.createNewPullRequest = function() {
    pullRequestService.createNewPullRequest($scope.newPR)
  }

}]);