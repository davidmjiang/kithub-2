Gradebook.controller('SpreadsheetCtrl', ['$scope', 'ModalService', function($scope, ModalService){
  // student modal
  $scope.showStudent = function(student) {
    ModalService.showModal({
      templateUrl: 'gradebook_templates/students/show.html',
      controller: ["$scope", function($scope) {
        var location = "student controller, showStudent modal"
        console.log(location)
        $scope.message = location
      }]
      inputs: {
        student: student
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
      // something with result
    })
    })
  }

  // Assignment Modal
  $scope.showAssignment = function(assignment) {
    ModalService.showModal({
      templateUrl: 'gradebook_templates/assignments/show.html',
      controller: ["$scope", function($scope) {
        var location = 'AssignmentCtrl, assignmentShowModal'
        console.log(location)
        $scope.message = location
      }]
      inputs: {
        assignment: assignment
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        // something with result
      })
    })
  }

  // Class Summary Modal
  $scope.showSummary = function() {
    ModalService.showModal({
      templateUrl: 'gradebook_templates/classes/show.html',
      controller: ["$scope", function($scope) {
        var info = 'SummaryCtrl, summaryModal'
        console.log(info)
        $scope.message = info
      }]
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
      // something with result
      })
    })
  }

}])