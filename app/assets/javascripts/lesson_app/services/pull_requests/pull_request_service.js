Lesson.factory("pullRequestService", ["Restangular",
                                  "$stateParams",
                                  "$state",
                                  "Auth",
                                  function(Restangular, $stateParams, $state, Auth) {

  var _pullRequests = []

  // all copies a json object of all the pull requests and their respective '
  // comments for the teachers page you are on and angular.copies them locally
  var all = function() {
    return Restangular.all("pull_requests").getList().then(function(response) {
        return angular.copy(response, _pullRequests);
    });
  };

  // getPullRequests retrieves the _pullRequests array which has all the
  // Restangularized pullRequest objects and their comments for a given teacher
  var getPullRequests = function() {
    return _pullRequests;
  }

  // var getBoard = function(id) {
  //   return Restangular.one('boards', Number(id)).get()
  // }

  // var _updateBoard = function(params) {

  //   Restangular.one('boards', $stateParams.id).patch({
  //     board: {
  //       name: params.name,
  //       user_id: Auth.currentUser()
  //     }
  //   }).then(function() {
  //     $state.go("boards.show", {id: $stateParams.id});
  //   });
  // };

  // var deleteBoard = function(id) {
  //   for(var b in _boards) {
  //     if(_boards[b].id === id) { _boards.splice(b, 1); break; }
  //   }
  // }

  // var createBoard = function(params) {
  //   return Restangular.all('boards').post({
  //         board: {
  //           name: params.name,
  //           user_id: 2
  //         }
  //       }).then(function(response) {
  //         _boards.push(response)
  //       })

  // }

  // Restangular.extendModel('boards', function(board){
  //   board.update = _updateBoard;
  //   return board;
  // });


  return {
    all: all,
    getPullRequests: getPullRequests,
  }
}]);