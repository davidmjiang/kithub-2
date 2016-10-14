Gradebook.controller("NewClassCtrl", ["$scope", "ClassService", "close", function($scope, ClassService, close) {

  $scope.courseParams = {}

  $scope.submit = function() {
    ClassService.newCourse($scope.courseParams).then(function(response) {
      close(response, 1000)
    })
  }

  $scope.cancel = function() {
    close(false, 1000)
  }

}])