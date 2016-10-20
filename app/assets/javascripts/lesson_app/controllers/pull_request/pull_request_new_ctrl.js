angular.module('Lesson').controller('PullRequestNewCtrl', ['$scope', '$stateParams', "pullRequestService", "LessonService", "lesson", "currentUser", "teacher", "DiffService", function($scope, $stateParams, pullRequestService, LessonService, lesson, currentUser, teacher, DiffService){

  $scope.newPR = pullRequestService.getNewPullRequest($stateParams.id);
  $scope.forkedLesson = lesson;

  LessonService.getLesson($stateParams.id).then(function(response){
    $scope.newPR = pullRequestService.getNewPullRequest($stateParams.id, response.parent_plan_id);

    LessonService.getLesson($scope.newPR.parent_plan_id).then(function(parent) {
       $scope.newPR.parent_plan = parent
    }).then(function() {

    })

    $scope.lessonBelongsToCurrentUser = (currentUser.id === response.teacher_id)
      pullRequestService.pullRequestMade(response.id).then(function(response) {$scope.pullRequestMade = response;})
    });

  if(!$scope.lessonBelongsToCurrentUser) {
    for(var i in teacher.lesson_plans) {
      if (teacher.lesson_plans[i].parent_plan_id === Number($stateParams.id)) {
        // fix this
        $scope.alreadyForked = true
      }
    }
    $scope.alreadyForked = $scope.alreadyForked || false
  }


  $scope.getDiffInfo = function() {
      LessonService.getLesson($scope.newPR.forked_plan_id).then(function(forked) {
       $scope.newPR.forked_plan = forked
       $scope.diffs = DiffService($scope.newPR.parent_plan.content, $scope.newPR.forked_plan.content);
      })
  }

  $scope.createNewPullRequest = function() {

    pullRequestService.createNewPullRequest($scope.newPR, $stateParams.id);
  };



}]);