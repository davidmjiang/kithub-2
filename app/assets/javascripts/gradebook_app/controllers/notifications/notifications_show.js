Gradebook.controller("NotificationsShowCtrl", ["$scope", "exceptionalStudents", "failingStudents", "students", "course", "_", "StudentService", "close", function($scope, exceptionalStudents, failingStudents, students, course, _, StudentService, close) {

	$scope.exceptionalStudents = exceptionalStudents;
	$scope.failingStudents = failingStudents;
	$scope.students = students;
	$scope.course = course;


  $scope.getLengthFailing = function() {
    count = 0;
    for(key in $scope.failingStudents) {
      count ++
    }
    return count;
  }

  $scope.getLengthPassing = function() {
    count = 0;
    for(key in $scope.exceptionalStudents) {
      count ++
    }
    return count;
  }

  $scope.anyFailingStudents = $scope.getLengthFailing();
  $scope.anyExceptionalStudents = $scope.getLengthPassing();

  $scope.notifyParent = function(student, score) {
    for(key in $scope.students) {
      if ($scope.students[key].first_name + $scope.students[key].last_name  === 
        student.split(" ").slice(0)[0] + student.split(" ").slice(1)[0]) {
        if(score > 60) {
          StudentService.sendPass($scope.students[key].id, $scope.course.teacher_id, score)
        }
        else {
          StudentService.sendFail($scope.students[key].id, $scope.course.teacher_id, score)
        }
        
      }
    }
  }



	$scope.close = function() {
   	angular.element('body').removeClass('modal-open');
   	angular.element(".modal-backdrop").remove();
   	close();
   };

}]);