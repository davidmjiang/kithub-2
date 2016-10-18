Lesson.factory("pullRequestService", ["Restangular",
                                  "$state",
                                  "Auth",
                                  function(Restangular, $state, Auth) {
  // array of all pull requests with their
  var _pullRequests = [];

  // all copies a json object of all the pull requests and their respective '
  // comments for the teachers page you are on and angular.copies them locally
  var all = function(lesson_id) {
    return Restangular.one("lesson_plans", lesson_id).all("pull_requests").getList().then(function(response) {
        return angular.copy(response, _pullRequests);
    });
  };

  // getPullRequests retrieves the _pullRequests array which has all the
  // Restangularized pullRequest objects and their comments for a given teacher
  var getPullRequests = function() {
    return _pullRequests;
  };

  // returns scaffolding for a new pull request including pending status and the
  // id of the forked lesson plan
  var getNewPullRequest = function(lessonId) {
    return {
      forked_plan_id: lessonId,
      status: "pending"
    }
  }

  // sends restangular post request and adds the response to the front end
  // pull request model
  var createNewPullRequest = function(data, lessonId) {
    Restangular.one("lesson_plans", lessonId).all("pull_requests").post({
      pull_request: data
    }).then(function(response){
      _pullRequests.push(response);
    })
  }

  // sends restangular post request to create a new comment and returns the
  // response
  var createNewComment = function(data) {
    return Restangular.all("comments").post({
      comment: data
    }).then(function(response) {
      return response;
    });
  };

  var removeComment = function(id) {
    return Restangular.one("comments", Number(id)).remove()
  };

  return {
    all: all,
    getPullRequests: getPullRequests,
    getNewPullRequest: getNewPullRequest,
    createNewPullRequest: createNewPullRequest,
    createNewComment: createNewComment,
    removeComment: removeComment
  }
}]);