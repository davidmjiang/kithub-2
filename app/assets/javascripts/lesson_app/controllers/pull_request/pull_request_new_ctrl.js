angular.module('Lesson').controller('PullRequestNewCtrl', ['$scope', '$stateParams', "pullRequestService", "LessonService", "lesson", "currentUser", "teacher", "DiffService", 'owner', '_',
 function($scope, $stateParams, pullRequestService, LessonService, lesson, currentUser, teacher, DiffService, owner, _){

  $scope.newPR = pullRequestService.getNewPullRequest($stateParams.id);
  $scope.forkedLesson = lesson;
  $scope.owner = owner;
  $scope.currentUser = currentUser;
  $scope.upToDate = true; // determines if there's a newer version of parent plan

  $scope.prSent = _.filter($scope.forkedLesson.pull_requests_sent, [ 'status', 'pending' ]);

  // check for a parent plan
  if(lesson.parent_plan_id) {
    $scope.newPR = pullRequestService.getNewPullRequest($stateParams.id, lesson.parent_plan_id);

    LessonService.getLesson($scope.newPR.parent_plan_id).then(function(parent) {
      $scope.newPR.parent_plan = parent;
      if ($scope.newPR.parent_plan.version > $scope.forkedLesson.parent_version) {
        $scope.updateDiffs = DiffService.getDiffs($scope.forkedLesson.content, $scope.newPR.parent_plan.content);
        if ($scope.updateDiffs.length > 1) {
          $scope.upToDate = false;
        }
      }
    });
  }

  $scope.lessonBelongsToCurrentUser = (currentUser.id === lesson.teacher_id);
  pullRequestService.pullRequestMade(lesson.id).then(function(response) {$scope.pullRequestMade = response;});


  if(!$scope.lessonBelongsToCurrentUser) {
    for(var i in teacher.lesson_plans) {
      if (teacher.lesson_plans[i].parent_plan_id === Number($stateParams.id)) {
        $scope.alreadyForked = true;
      }
    }
    $scope.alreadyForked = $scope.alreadyForked || false;
  }


  $scope.getDiffInfo = function() {
      LessonService.getLesson($scope.newPR.forked_plan_id).then(function(forked) {
       $scope.newPR.forked_plan = forked;
       $scope.diffs = DiffService.getDiffs($scope.newPR.parent_plan.content, $scope.newPR.forked_plan.content);
      });
  };

  $scope.createNewPullRequest = function(valid) {
    if(valid){
      pullRequestService.createNewPullRequest($scope.newPR, $stateParams.id).then(function(response) {
        $scope.prSent.push(response);
        angular.element(document.querySelector('#newPRModal' + $scope.newPR.forked_plan_id)).modal('hide');
      });

    } else {
      angular.element(document.querySelector('#newPRTitleInput')).addClass('error');
    }
  };

}]);