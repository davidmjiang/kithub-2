angular.module('Lesson').controller('PullRequestIndexCtrl', ['$scope', 'currentUser', "pullRequestService", "_", function($scope, currentUser, pullRequestService, _){

  // $scope.pullRequests = pullRequestService.getPullRequests();
  // $scope.currentUser = currentUser.id;

  $scope.pendingPRs = pullRequestService.getPendingPRs();



}]);