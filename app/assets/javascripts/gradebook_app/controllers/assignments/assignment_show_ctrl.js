Gradebook.controller("AssignmentShowCtrl", ["$scope", "course", "assignment", "GPAService", "SubmissionService", "close", function($scope, course, assignment, GPAService, SubmissionService, close) {

  $scope.assignment = assignment
  $scope.gpa = {}
  $scope.gpa.raw = GPAService.rawGPA(course, assignment)
  $scope.gpa.real = GPAService.realGPA(course, assignment)
  var _realGPA = GPAService.realGPA(course, assignment)
  if (_realGPA ) {
    $scope.curveApplied = true 
    $scope.gpa.real = _realGPA
  } else {
    $scope.curveApplied = false
    $scope.gpa.real = $scope.gpa.raw
  }

  (function() {
    var out = []
    _.each(course.students, function(student) {
      _.each(student.submissions, function(submission) {
        if (submission.assignment_id === assignment.id) {
          out.push(submission)
        }
      })
    })
    $scope.numSubmissions = out.length
    $scope.submissions = out
  })()

  $scope.curve = {}

  $scope.editingTitle = false
  $scope.addingCurve = false
  $scope.assignmentTitle = assignment.title
  $scope.numStudents = course.students.length

  

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
    $scope.gpa.real = $scope.curve.flatOffset + $scope.gpa.raw
    $scope.curveApplied = true
  }

  $scope.resetCurve = function() {
    $scope.curveApplied = false
    $scope.gpa.real = $scope.gpa.raw
  }

  $scope.saveChanges = function() {
    if ($scope.curveApplied) {
      SubmissionService.applyFlatCurve($scope.submissions, $scope.curve.flatOffset, assignment.possible_score).then(function(response) {
          _.each(response, function(responseSubmission) {
            _.each(course.students, function(student) {
              _.each(student.submissions, function(studentSubmission) {
                if (studentSubmission.id === responseSubmission.id) {
                  studentSubmission.real_score = responseSubmission.real_score
                }
              })
            })
          })
      })
    }
  }

}])