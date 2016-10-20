Gradebook.controller("AssignmentShowCtrl", ["$scope", "course", "assignment", "GPAService", "close", "AssignmentService", "CurveService", "$rootScope", "students", "VisualService", function($scope, course, assignment, GPAService, close, AssignmentService, CurveService, $rootScope, students, VisualService) {

  $scope.assignment = assignment
  $scope.gpa = {}
  $scope.gpa.raw = GPAService.rawGPA(course, assignment)
  $scope.hasCurve = assignment.has_curve
  $scope.curve = {}
  $scope.editingTitle = false
  $scope.modifyingCurve = false
  $scope.assignmentTitle = assignment.title
  $scope.numStudents = course.students.length

  var _fillFlatRateEditInput = function() {
    var curve = {}
    angular.copy($scope.assignment.flat_curve, curve)
    $scope.curve.flatRate = curve.flat_rate
  }

  var _fillLinearCurveEditInputs = function() {
    var curve = {}
    angular.copy($scope.assignment.linear_curve, curve)
    $scope.curve.rawA = curve.rawA
    $scope.curve.rawB = curve.rawB
    $scope.curve.curvedA = curve.curvedA
    $scope.curve.curvedB = curve.curvedB
  }

  var _fillCurveEditInputs = function() {
    if ($scope.assignment.flat_curve) {
      _fillFlatRateEditInput()
    } else if ($scope.assignment.linear_curve) {
      _fillLinearCurveEditInputs()
    }
  }

  if ($scope.assignment.has_curve ) {
    console.log("assignment has curve!")
    _fillCurveEditInputs()
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
    $scope.modifyingCurve = true
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
      $scope.assignment.flat_curve = response
      // not sure which is necessary
      assignment.has_curve = true
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
        // not sure if either above or below or both are necessary
        assignment.has_curve = true 
        assignment.linear_curve = response
    })
  }

  var _simulateLinearCurve = function() {
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

  $scope.opts = {
    scales: {
      yAxes: [
        {ticks: {
          beginAtZero: true,
          steps: 10,
          stepValue: 10,
          max: 100
        }}
      ]
    }
  }

  var _scores = VisualService.studentScores(students, assignment)
  $scope.scoreLabels = _.map(_scores, 'name');
  $scope.scoreData = [_.map(_scores, function(score){
    return score.percent.toFixed(2);
  })];

}])