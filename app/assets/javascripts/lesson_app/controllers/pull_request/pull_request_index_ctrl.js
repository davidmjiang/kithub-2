angular.module('Lesson').controller('PullRequestIndexCtrl', ['$scope', 'currentUser', "pullRequestService", "_", "pullRequests", function($scope, currentUser, pullRequestService, _, pullRequests){

  $scope.pullRequests = pullRequestService.getPullRequests();

  $scope.currentUser = currentUser.id

  $scope.pendingPRs = _.find($scope.pullRequests, function(pr) {
          return pr.status === "pending" });

}]);