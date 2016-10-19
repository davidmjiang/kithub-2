Gradebook.controller("AssignmentNewCtrl", ["$scope", "course", "AssignmentService", "_", "$rootScope", function($scope, course, AssignmentService,  _, $rootScope) {
	
	$scope.course = course	
	$scope.assignment = {}

	$scope.addAssignment = function(assignment) {
		assignment.course_id = course.id
		AssignmentService.addAssignment(assignment).then(function(newAssignment) {
			$rootScope.$broadcast('assignment.added', newAssignment);
			return newAssignment;
		})
	}
}])