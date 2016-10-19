Gradebook.controller("StudentNewCtrl", ["$scope", "course", "StudentService", "_", "$rootScope", "close", function($scope, course, StudentService,  _, $rootScope, close) {

	$scope.course = course
	//StudentService.addStudent(course);	
	$scope.student = {}

	$scope.addStudent = function(student) {
		student.course_ids = [course.id];
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