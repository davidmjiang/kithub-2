Gradebook.controller("AssignmentShowCtrl", ["$scope", "course", "assignment", "GPAService", "close", "AssignmentService", "CurveService", "$rootScope", function($scope, course, assignment, GPAService, close, AssignmentService, CurveService, $rootScope) {

  $scope.assignment = assignment
  $scope.gpa = {}
  $scope.gpa.raw = GPAService.rawGPA(course, assignment)
  $scope.hasCurve = assignment.has_curve

  // this will have to change
  if ($scope.assignment.has_curve ) {
    console.log("assignment has curve!!")
    $scope.gpa.real = GPAService.realGPA(course, $scope.assignment)
    $scope.curveApplied = true 
  } else {
    $scope.gpa.real = $scope.gpa.raw
    $scope.curveApplied = false
  }

  (function() {
    var _submissions = []
    _.each(course.students, function(student) {
      _.each(student.submissions, function(submission) {
        if (submission.assignment_id === assignment.id) {
          _submissions.push(submission)
        }
      })
    })
    $scope.numSubmissions = _submissions.length
    $scope.submissions = _submissions
  })()

  $scope.curve = {}

  $scope.editingTitle = false
  $scope.addingCurve = false
  $scope.assignmentTitle = assignment.title
  $scope.numStudents = course.students.length

  $scope.editAssignment = function(assignment) {
    AssignmentService.editAssignment(assignment)
    $rootScope.$broadcast('assignment.edit', assignment);
    
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
    $scope.gpa.real = $scope.curve.flatRate + $scope.gpa.raw
    $scope.curveApplied = true
  }

  $scope.applyLinearCurve = function() {
    $scope.gpa.real = _simulateLinearCurve()
    $scope.curveApplied = true
  }

  $scope.resetCurve = function() {
    $scope.curveApplied = false
    $scope.gpa.real = $scope.gpa.raw
  }

  $scope.saveChanges = function() {
    if ($scope.curveApplied && $scope.curveType === "Flat") {
      _applyFlatCurve();
    } else if ($scope.curveApplied && $scope.curveType === "Linear") {
      _applyLinearCurve();
    }
  }


  // private 

  var _applyFlatCurve = function() {
    CurveService.applyFlatCurve($scope.curve.flatRate, assignment.id)
    .then(function(response) {
      console.log("response in controller")
      console.log(response)
      $scope.assignment.has_curve = true
      assignment.flat_curve = response
    })
  }

  var _applyLinearCurve = function() {
    CurveService.applyLinearCurve($scope.curve, assignment.id)
      .then(function(response) {
        console.log("response in controller")
        console.log(response)
        $scope.assignment.linear_curve = response
        $scope.assignment.has_curve = true
        assignment.linear_curve = response
    })
  }

  var _simulateLinearCurve = function() {
    var _simulatedSubmissions = []
    angular.copy($scope.submissions, _simulatedSubmissions)
    _.each(_simulatedSubmissions, function(submission) {
      var _rawPercent = submission.raw_score / $scope.assignment.possible_score * 100
      submission.real_score = _linearFormula($scope.curve, _rawPercent)
    })
    return _averageRealScore(_simulatedSubmissions)
    // to simulate linear curve:
    // create a copy of $scope.assignment with a linear curve as per the input data
    // send that info over to GPAService.realGPA
    // apply the result to $scope.realGPA
    var _simulatedAssignment = {}
    angular.copy($scope.assignment, _simulatedAssignment)
    _simulatedAssignment.linear_curve = $scope.curve
    return GPAService.realGPA(course, _simulatedAssignment)
  }

  var _linearFormula = function(input, rawPercent) {
    return input.curvedA + (((input.curvedB - input.curvedA)/(input.rawB - input.rawA)) * (rawPercent - input.rawA));
  }

  var _averageRealScore = function(submissions) {
    var total = 0;
    _.each(submissions, function(submission) {
      total += submission.real_score
    })
    return total / submissions.length
  }

}])