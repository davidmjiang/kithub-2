Gradebook.controller("AssignmentShowCtrl", ["$scope", "course", "assignment", "GPAService", "close", "AssignmentService", "CurveService", "$rootScope", "students", "VisualService", "$timeout", function($scope, course, assignment, GPAService, close, AssignmentService, CurveService, $rootScope, students, VisualService, $timeout) {

  this.closeModal = function () {
    close(null, 200);
    this.closed = true;
  }

  $scope.$watch('curve.flatRate', function (newValue) {
    $scope.curve.flatRate = Number(newValue);
    $scope.updateData();
  });

  $scope.$watch('curve.slideA', function (newValue) {
    $scope.curve.slideA = Number(newValue);
    $scope.curve.curvedA = $scope.curve.slideA + $scope.curve.rawA;
    $scope.applyLinearCurve();
  });

  $scope.$watch('curve.slideB', function (newValue) {
    $scope.curve.slideB = Number(newValue);
    $scope.curve.curvedB = $scope.curve.slideB + $scope.curve.rawB;
    $scope.applyLinearCurve();
  });

  $scope.closed = false;

  $scope.assignment = assignment
  $scope.gpa = {}
  $scope.gpa.raw = GPAService.rawGPA(course, assignment)
  $scope.hasCurve = assignment.has_curve
  $scope.curve = {};
  $scope.editingTitle = false
  $scope.modifyingCurve = false
  $scope.assignmentTitle = assignment.title
  $scope.numStudents = course.students.length
  $scope.students = students;
  $scope.curveAlert = false;

  if ($scope.assignment.flat_curve) {
    $scope.curve.flatRate = $scope.assignment.flat_curve.flat_rate;
  } else {
    $scope.curve.flatRate = 0;
  }

  if ($scope.assignment.linear_curve) {
    _fillLinearCurveEditInputs;
  } else {
    $scope.curve.rawA = 0;
    $scope.curve.rawB = 100;
    $scope.curve.slideA = 0;
    $scope.curve.slideB = 0;
    $scope.curve.curvedA = 0;
    $scope.curve.curvedB = 100;
  }

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

  _fillCurveEditInputs;

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

  var _removeCurve = function() {
    if (assignment.has_curve) {
      CurveService.removeCurve($scope.assignment)
      .then(function(response) {
        console.log("response in controller")
        console.log(response)
        $scope.assignment.has_curve = false
        assignment.has_curve = false
        $scope.assignment.flat_curve = null
        assignment.flat_curve = null
        $scope.assignment.linear_curve = null
        assignment.linear_curve = null
        $scope.assignment.updated_at = response.assignment.updated_at
        assignment.updated_at = response.assignment.updated_at
      })
    }
  }

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
    $scope.closed = true;
  }

  $scope.addCurve = function() {
    $scope.modifyingCurve = true
    if ($scope.assignment.has_curve) {
      $scope.editingCurve = true
    } 
  }

  // $scope.applyFlatCurve = function() {
  //   $scope.gpa.real = $scope.curve.flatRate + $scope.gpa.raw
  //   $scope.curveApplied = true
  // }

  $scope.applyLinearCurve = function() {
    $scope.gpa.real = _simulateLinearCurve()
    $scope.curveApplied = true
  }

  $scope.resetCurve = function() {
    // $scope.curveApplied = false
    $scope.gpa.real = $scope.gpa.raw
    $scope.curve.flatRate = 0
    $scope.curve.rawA = 0
    $scope.curve.rawB = 100
    $scope.curve.slideA = 0
    $scope.curve.slideB = 0
    _removeCurve();
  }

  $scope.saveChanges = function() {
    if ($scope.curveType === "Flat") {
      if ($scope.assignment.has_curve) {
        _editFlatCurve();
      } else {
        _applyFlatCurve();
      }
      $scope.gpa.real = $scope.gpa.raw + $scope.curve.flatRate;
    } else if ($scope.curveApplied && $scope.curveType === "Linear") {
      _applyLinearCurve();
    } else if (!$scope.curveApplied && $scope.assignment.has_curve) {
      _removeCurve();
    } else if ($scope.editingCurve && $scope.assignment.flat_curve) {
      _editFlatCurve();
    } else if ($scope.editingCurve && $scope.assignment.linear_curve) {
      _editLinearCurve();
    }
  }


  // private 

  var _unchangedLinearCurveInputs = function() {
    return $scope.curve.rawA === $scope.assignment.linear_curve.rawA &&
           $scope.curve.rawB === $scope.assignment.linear_curve.rawB &&
           $scope.curve.curvedA === $scope.assignment.linear_curve.curvedA &&
           $scope.curve.curvedB === $scope.assignment.linear_curve.curvedB
  }

  var _editFlatCurve = function() {
    // do nothing if flatRate hasn't changed
    if ($scope.assignment.flat_curve.flat_rate === $scope.curve.flatRate) {
      return
    // if flatRate has changed to 0, remove the curve
    } else if ($scope.curve.flatRate === "0") {
      _removeCurve();
    // else, CurveService.editFlatCurve($scope.assignment)
    } else {
      CurveService.editFlatCurve($scope.assignment, $scope.curve.flatRate)
      .then(function(response) {
        console.log("response in controller")
        console.log(response)
        $scope.assignment.flat_curve = response
        assignment.flat_curve = response // ?
        $scope.assignment.updated_at = response.assignment.updated_at
        assignment.updated_at = response.assignment.updated_at
      })
    }
  }

  var _editLinearCurve = function() {
    // do nothing if inputs haven't changed
    if (_unchangedLinearCurveInputs()) {
      return
    } else {
      CurveService.editLinearCurve($scope.assignment, $scope.curve)
      .then(function(response) {
        console.log("response in controller")
        console.log(response)
        $scope.assignment.linear_curve = response
        assignment.linear_curve = response // ?
        $scope.assignment.updated_at = response.assignment.updated_at
        assignment.updated_at = response.assignment.updated_at
      })
    }
  }

  var _updateModal = function(response) {
    console.log("response in controller")
    console.log(response)
    $scope.assignment.has_curve = true
    $scope.assignment.flat_curve = response
    // not sure which is necessary
    // assignment.has_curve = true
    // assignment.flat_curve = response
    $scope.assignment.updated_at = response.assignment.updated_at
    assignment.updated_at = response.assignment.updated_at
  };

  var _applyFlatCurve = function() {
    CurveService.applyFlatCurve($scope.curve.flatRate, assignment.id)
    .then(function(response) {
      _updateModal(response)
    })
  };

  var _editFlatCurve = function() {
    CurveService.editFlatCurve(assignment, $scope.curve.flatRate)
    .then(function(response) {
      _updateModal(response)
    })
  };

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
      $scope.assignment.updated_at = response.assignment.updated_at
      assignment.updated_at = response.assignment.updated_at
    })
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

  var assignDist = VisualService.gradeDistribution(_scores)
  $scope.colors = ['#4caf50', '#81c784', '#c8e6c9', '#ef9a9a', '#f44336']
  $scope.assignLabels = _.map(assignDist, function(amount, grade){return grade});
  $scope.assignData = _.map(assignDist, function(amount, grade){return amount});

  $scope.pieOpts = {
    legend: { display: true },
    showTooltips: true,
  };

  $scope.updateData = function() {
    angular.copy([_.map(_scores, function(score){
      var updatedScore = score.percent + $scope.curve.flatRate;
      return updatedScore.toFixed(2);
    })], $scope.scoreData)
  }

  var _simulateLinearCurve = function() {
    angular.copy([_.map(_scores, function(score){
      var updatedScore = CurveService.linearFormula($scope.curve, score.percent);
      return updatedScore.toFixed(2);
    })], $scope.scoreData)
    var _simulatedAssignment = {}
    angular.copy($scope.assignment, _simulatedAssignment)
    _simulatedAssignment.linear_curve = $scope.curve
    return GPAService.realGPA(course, _simulatedAssignment)
  }

  $scope.alertShow = function() {
    $scope.curveAlert = true;
    $timeout(function() {
      $scope.curveAlert = false;
    }, 4000)
  }

  $scope.failingStudents = function() {
    
  }

}])