angular.module('Lesson').controller('PullRequestIndexCtrl', ['$scope', 'currentUser', "pullRequestService",  function($scope, currentUser, pullRequestService){

  $scope.pullRequests = pullRequestService.getPullRequests();
  $scope.currentUser = currentUser.id
}]);