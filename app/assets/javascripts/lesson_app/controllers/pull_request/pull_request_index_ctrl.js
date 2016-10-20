angular.module('Lesson').controller('PullRequestIndexCtrl', ['$scope', 'currentUser', "pullRequestService",  function($scope, currentUser, pullRequestService){

  $scope.pullRequests = pullRequestService.getPullRequests();
  $scope.currentUser = currentUser.id

  // LessonService.getLesson($stateParams.id).then(function(response){
  //   $scope.lessonBelongsToCurrentUser = (currentUser.id === response.teacher_id)
  // })

}]);