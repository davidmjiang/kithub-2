Gradebook.controller("StudentNewCtrl", ["$scope", "course", "StudentService", "_", "$rootScope", function($scope, course, StudentService,  _, $rootScope) {

	$scope.course = course
	//StudentService.addStudent(course);	
	$scope.student = {}

	$scope.addStudent = function(student) {
		student.course_ids = [course.id];
		StudentService.addStudent(student).then(function(newStudent) {
			$rootScope.$broadcast('student.added', newStudent);
			return newStudent;
		})
	}

}])