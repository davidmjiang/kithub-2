Gradebook.controller("StudentNewCtrl", ["$scope", "course", "StudentService", "_", "$rootScope", "close", function($scope, course, StudentService,  _, $rootScope, close) {

	$scope.course = course
	//StudentService.addStudent(course);	
	$scope.student = {}

	$scope.capitalize = function(string) {
		return string.slice(0, 1).toUpperCase() + string.slice(1);
	}

	$scope.addStudent = function(student) {
		if($scope.course.students.length) {
			console.log("IS")
			for(var i = 0; i < $scope.course.students.length; i++) {
				if($scope.course.students[i].email === student.email) {
					alert("Someone in this course has that email. Try again")
					break;
				}
				else if(i === $scope.course.students.length - 1) {
					student.course_ids = [course.id];
					student.first_name = $scope.capitalize(student.first_name);
					student.last_name = $scope.capitalize(student.last_name);
					$scope.close();
					StudentService.addStudent(student).then(function(newStudent) {
						$rootScope.$broadcast('student.added', newStudent);
						return newStudent;
					})	
				}
			}
		}
		else {
					console.log("Is not")
			student.course_ids = [course.id];
			student.first_name = $scope.capitalize(student.first_name);
			student.last_name = $scope.capitalize(student.last_name);
			$scope.close();
			StudentService.addStudent(student).then(function(newStudent) {
				$rootScope.$broadcast('student.added', newStudent);
				return newStudent;
			})	
		}
	}

	$scope.close = function() {
   	angular.element('body').removeClass('modal-open');
   	angular.element(".modal-backdrop").remove();
   	close();
   };

}])