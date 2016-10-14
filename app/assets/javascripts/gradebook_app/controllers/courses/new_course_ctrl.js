Gradebook.controller("NewCourseCtrl", ["$scope", "CourseService", "close", function($scope, CourseService, close) {

  $scope.courseParams = {}

  $scope.submit = function() {
    CourseService.addCourse($scope.courseParams).then(function(response) {
      close(response, 1000)
    })
  }

  $scope.cancel = function() {
    close(false, 1000)
  }

}])