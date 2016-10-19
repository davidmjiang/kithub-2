Gradebook.controller("AssignmentNewCtrl", ["$scope", "course", "AssignmentService", "_", "$rootScope", "close", function($scope, course, AssignmentService,  _, $rootScope, close) {
	
	$scope.course = course	
	$scope.assignment = {}

	$scope.addAssignment = function(assignment) {
		assignment.course_id = course.id
		AssignmentService.addAssignment(assignment).then(function(newAssignment) {
			$rootScope.$broadcast('assignment.added', newAssignment);
			$scope.close();
			return newAssignment;
		})
	}

	$scope.close = function() {
   	angular.element('body').removeClass('modal-open');
   	angular.element(".modal-backdrop").remove();
   	close();
   };

}])