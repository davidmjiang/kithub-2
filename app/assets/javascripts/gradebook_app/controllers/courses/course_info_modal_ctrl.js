Gradebook.controller("CourseInfoModalCtrl", ["$scope", "course", "close", function($scope, course, close) {

  console.log("modal ctrl")
  console.log(course)

  $scope.course = course

  this.closeModal = function () {
    close(null, 200);
    this.closed = true;
  }

  $scope.close = function() {
    close(null, 200)
  }


}])