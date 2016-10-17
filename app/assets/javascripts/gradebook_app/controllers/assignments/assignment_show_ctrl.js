Gradebook.controller("AssignmentShowCtrl", ["$scope", "course", "assignment", "close", function($scope, course, assignment, close) {

  $scope.assignment = assignment 

  $scope.editingTitle = false
  $scope.assignmentTitle = assignment.title

  $scope.editTitle = function() {
    $scope.editingTitle = true
  }

  $scope.submitTitleEdits = function() {
    // // do stuff with Restangular, then:
      // $scope.assignmentTitle = response.title
      // angular.copy(response, $scope.assignment)
      $scope.editingTitle = false
  }

  $scope.cancelEditTitle = function() {
    $scope.editingTitle = false
    $scope.assignmentTitle = assignment.title
  }

  $scope.close = function(result) {
    close(result, 200)
  }

}])