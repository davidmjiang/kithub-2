angular.module('Lesson').controller('PullRequestIndexCtrl', ['$scope', 'currentUser', "pullRequestService", "_", "pullRequests", function($scope, currentUser, pullRequestService, _, pullRequests){

  $scope.pullRequests = pullRequestService.getPullRequests();

  $scope.currentUser = currentUser.id
   $scope.pendingPRs = _.filter($scope.pullRequests, function(pr) { console.log(pr); pr.status === "pending" }).length;
}]);