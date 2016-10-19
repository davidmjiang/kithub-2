Gradebook.controller("AssignmentShowCtrl", ["$scope", "course", "assignment", "GPAService", "SubmissionService", "close", "AssignmentService", "$rootScope", "students", "VisualService", function($scope, course, assignment, GPAService, SubmissionService, close, AssignmentService, $rootScope, students, VisualService) {

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
    $scope.gpa.real = $scope.curve.flatOffset + $scope.gpa.raw
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


  var _applyFlatCurve = function() {
    SubmissionService.applyFlatCurve($scope.submissions, $scope.curve.flatOffset, assignment.possible_score)
      .then(function(response) {
        _applyResponseSubmissions(response)
    })
  }

  var _applyLinearCurve = function() {
    SubmissionService.applyLinearCurve($scope.submissions, $scope.curve, assignment.possible_score)
      .then(function(response) {
        console.log("response in controller")
        console.log(response)
        _applyResponseSubmissions(response)
    })
  }

  var _applyResponseSubmissions = function(response) {
    _.each(response, function(responseSubmission) {
      _.each(course.students, function(student) {
        _.each(student.submissions, function(studentSubmission) {
          if (studentSubmission.id === responseSubmission.id) {
            studentSubmission.real_score = responseSubmission.real_score
          }
        })
      })
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

  var scores = VisualService.studentScores(students, assignment)
  $scope.scoreLabels = _.map(scores, 'name');
  $scope.scoreData = [_.map(scores, function(score){
    return score.percent.toFixed(2);
  })];

}])