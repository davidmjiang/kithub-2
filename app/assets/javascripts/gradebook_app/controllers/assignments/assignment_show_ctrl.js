Gradebook.controller("AssignmentShowCtrl", ["$scope", "course", "assignment", "GPAService", "SubmissionService", "close", function($scope, course, assignment, GPAService, SubmissionService, close) {

  $scope.assignment = assignment
  $scope.gpa = {}
  $scope.gpa.raw = GPAService.rawGPA(course, assignment)

  var _realGPA = GPAService.realGPA(course, assignment)
  $scope.gpa.real = _realGPA ? _realGPA : $scope.gpa.raw

  $scope.curve = {}

  $scope.editingTitle = false
  $scope.addingCurve = false
  $scope.assignmentTitle = assignment.title

  $scope.numStudents = course.students.length
  $scope.numSubmissions = function() {
    var count = 0
    _.each(course.students, function(student) {
      _.each(student.submissions, function(submission) {
        if (submission.assignment_id === assignment.id) {
          count += 1
        }
      })
    })
    return count
  }

  $scope.editTitle = function() {
    $scope.editingTitle = true
  }

  $scope.submitTitleEdits = function() {
    // // do stuff with Restangular, then:
      // $scope.assignmentTitle = response.title
      // angular.copy(response, $scope.assignment)
      $scope.editingTitle = false
  }

  $scope.cancelEditTitle = function() {
    $scope.editingTitle = false
    $scope.assignmentTitle = assignment.title
  }

  $scope.close = function(result) {
    close(result, 200)
  }

  $scope.addCurve = function() {
    $scope.addingCurve = true
  }

  $scope.applyFlatCurve = function() {
    if (!$scope.curveApplied) {
      $scope.gpa.real = $scope.curve.flatOffset + $scope.gpa.raw
      $scope.curveApplied = true
    }
  }

}])