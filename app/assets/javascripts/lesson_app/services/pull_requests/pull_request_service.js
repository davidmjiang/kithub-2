Lesson.factory("pullRequestService", ["Restangular",
                                  "$state",
                                  "Auth",
                                  function(Restangular, $state, Auth) {
  // array of all pull requests with their
  var _pullRequests = [];
  var _pendingPRs = [];

  // all copies a json object of all the pull requests and their respective '
  // comments for the teachers page you are on and angular.copies them locally
  var all = function(lesson_id) {
    return Restangular.one("lesson_plans", lesson_id).all("pull_requests").getList().then(function(response) {
        angular.copy(response, _pullRequests);
        resetPendingPRs();
        return _pullRequests;
    });
  };

  // resets pending PR variable from _pullRequests array
  var resetPendingPRs = function() {
    var pending = _.filter(_pullRequests, function (pr) {
      return pr.status === "pending";
    });
    angular.copy(pending, _pendingPRs);
  };

  // removes the frontend copy of the PR from _pullRequests
  var removePR = function(id) {
    _.remove(_pullRequests, function (pr) {
      return pr.id === id;
    });
    resetPendingPRs();
  };

  // returns all pending requests stored in the service for the current lesson in _pullRequests
  var getPendingPRs = function() { 
    return _pendingPRs;
  };

  // getPullRequests retrieves the _pullRequests array which has all the
  // Restangularized pullRequest objects and their comments for a given teacher
  var getPullRequests = function() {
    return _pullRequests;
  };

  // returns scaffolding for a new pull request including pending status and the
  // id of the forked lesson plan
  var getNewPullRequest = function(lessonId, parentId) {
    return {
      forked_plan_id: lessonId,
      status: "pending",
      parent_plan_id: parentId
    };
  };

  // sends restangular post request and adds the response to the front end
  // pull request model
  var createNewPullRequest = function(data, lessonId) {
    return Restangular.one("lesson_plans", lessonId).all("pull_requests").post({
      pull_request: data
    }).then(function(response){
      _pullRequests.push(response);
    });
  };

  // sends restangular post request to create a new comment and returns the
  // response
  var createNewComment = function(data) {
    return Restangular.all("comments").post({
      comment: data
    }).then(function(response) {
      return response;
    });
  };

  // deletes a comment and returns restangular response
  var removeComment = function(id) {
    return Restangular.one("comments", Number(id)).remove();
  };

  var pullRequestMade = function(forked_id) {
    return all(forked_id).then(function() {
      for(var i in _pullRequests) {
        if(_pullRequests[i].forked_plan_id === Number(forked_id)
            && _pullRequests[i].status === "pending") {
          return true;
        }
      }
      return false;
    });
  };

  var acceptChanges = function(pullRequest, contributorData, lessonId) {
    pullRequest.status = 'accepted';
    pullRequest.accept_reject_time = Date.now();
    // console.log(contributorData);
    Restangular.all("lesson_plan_contributors").post(contributorData);
    return Restangular.one("lesson_plans", lessonId).one("pull_requests", pullRequest.id).patch(pullRequest).then(function(response) {
        LessonService.setFlash('alert-success', 'Changes accepted!');
        removePR(response.id);
        return response;
    });
  };

  var rejectChanges = function(pullRequest, lessonId) {
    pullRequest.status = 'rejected';
    pullRequest.accept_reject_time = Date.now();
    return Restangular.one("lesson_plans", lessonId).one("pull_requests", pullRequest.id).patch(pullRequest).then(function(response) {
        LessonService.setFlash('alert-success', 'Changes rejected!');
        removePR(response.id);
        return response;
    });
  };

  return {
    all: all,
    getPullRequests: getPullRequests,
    getNewPullRequest: getNewPullRequest,
    createNewPullRequest: createNewPullRequest,
    createNewComment: createNewComment,
    removeComment: removeComment,
    pullRequestMade: pullRequestMade,
    acceptChanges: acceptChanges,
    rejectChanges: rejectChanges,
    getPendingPRs: getPendingPRs
  };
}]);
