Gradebook.controller("StudentNewCtrl", ["$scope", "course", "StudentService", "_", "$rootScope", "close", function($scope, course, StudentService,  _, $rootScope, close) {

	$scope.course = course
	//StudentService.addStudent(course);	
	$scope.student = {}

	$scope.capitalize = function(string) {
		return string.slice(0, 1).toUpperCase() + string.slice(1);
	}

	$scope.addStudent = function(student) {
		student.course_ids = [course.id];
		student.first_name = $scope.capitalize(student.first_name);
		student.last_name = $scope.capitalize(student.last_name);
		$scope.close();
		StudentService.addStudent(student).then(function(newStudent) {
			$rootScope.$broadcast('student.added', newStudent);
			return newStudent;
		})
	}

	$scope.close = function() {
   	angular.element('body').removeClass('modal-open');
   	angular.element(".modal-backdrop").remove();
   	close();
   };

}])