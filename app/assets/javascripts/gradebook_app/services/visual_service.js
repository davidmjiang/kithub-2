Gradebook.factory("VisualService", ["Restangular", "_", "CurveService", "GPAService", function(Restangular, _, CurveService, GPAService) {

  var VisualService = {}

  var _assignments = []

  VisualService.courseGPAs = function() {
    return Restangular.all('submissions').getList().then(function(response) {
      return angular.copy(response, _assignments)
    })
  }

  VisualService.getPercent = function(assignment, score) {
    var possible = assignment.possible_score;
    return ((score/possible)*100);
  };

  VisualService.assignmentAvg = function(assignment) {
    var sum = 0;
    var possible = 0;
    for (var i = 0; i < assignment.submissions.length; i++) {
      sum += assignment.submissions[i].raw_score
      possible += assignment.possible_score;
    }
    return (sum / possible)*100
  };

  VisualService.studentAvg = function(student, assignments) {
    var sum = 0;
    var possible = 0;
    for (var i = 0; i < student.submissions.length; i++) {
      var submission = student.submissions[i]
      var assignment = _.find(assignments, {'id': submission.assignment_id});
      if (submission.raw_score === -1) {
      } else {
        if (assignment.has_curve) {
          var rawPercent = submission.raw_score/assignment.possible_score * 100
          var curvedPercent = GPAService.applyCurve(assignment, rawPercent)
          sum += (curvedPercent/100 * assignment.possible_score)
        } else {
          sum += submission.raw_score
        }
        possible += assignment.possible_score
      }
    }
    return (sum / possible)*100
  };

  VisualService.studentAverages = function(students, assignments) {
    var studentArray = [];
    angular.forEach(students, function(student) {
      studentArray.push({
              'name': student.first_name + " " + student.last_name[0] + ".",
              'percent': VisualService.studentAvg(student, assignments)})
    })
    studentArray.sort(function(a, b){
      return a.percent-b.percent
    })
    return studentArray
  };

  VisualService.studentScores = function(students, assignment) {
    var scoreArray = [];
    angular.forEach(students, function(student) {
      var submission = _.find(student.submissions,
       {'assignment_id': assignment.id});
      if (submission.raw_score === -1) {
      } else {
        var score = VisualService.getPercent(assignment, submission.raw_score)
        scoreArray.push({
          'name': student.first_name + " " + student.last_name[0] + ".",
          'percent': score})
      }
    })
    scoreArray.sort(function(a, b){
      return a.percent-b.percent
    })
    return scoreArray
  }

  var _applyFlatCurve = function(assignment, rawPercent) {
    return assignment.flat_curve.flat_rate + rawPercent
  }
  var _applyLinearCurve = function(assignment, rawPercent) {
    return CurveService.linearFormula(assignment.linear_curve, rawPercent)
  }

  var _applyCurve = function(assignment, rawPercent) {
    if (assignment.flat_curve) {
      return _applyFlatCurve(assignment, rawPercent)
    } else if (assignment.linear_curve) {
      return _applyLinearCurve(assignment, rawPercent)
    } else {
      return rawPercent
    }
  }

  // returns average % performance after curve to date by averaging each 
  // assignment's submissions' curved percent scores (note: works using
  // assignment average curved % scores, not student average scores)
  VisualService.classAvgPerformanceToDate = function(courseAssignments, date) {
    var classPointsEarned = 0,
        classPointsPossible = 0;
    _.each(courseAssignments, function(assignment) {
      if (assignment.created_at <= date) {
        var scores = []
        _.each(assignment.submissions, function(submission) {
          if (submission.raw_score !== -1) {
            var rawPercent = (submission.raw_score / assignment.possible_score) * 100 
            var realPercent = assignment.has_curve ? _applyCurve(assignment, rawPercent) : rawPercent
            scores.push(realPercent)
          } 
        })
        if (scores.length) {
          var curvedAvgPerformance = _.reduce(scores, function(sum, n) {
            return sum + n
          }, 0) / scores.length;
          var curvedAvgPoints = curvedAvgPerformance/100 * assignment.possible_score
          classPointsEarned += curvedAvgPoints
          classPointsPossible += assignment.possible_score
        }
      } 
    })
    return classPointsEarned / classPointsPossible * 100
  }

  VisualService.coursePerformanceOverTime = function(course) {
    var courseData = []
    var sortedAssignments = _.sortBy(course.assignments, [function(a) {return a.created_at }])
    _.each(sortedAssignments, function(assignment) {
      var assignmentData = {}
      assignmentData.date = assignment.created_at
      assignmentData.class_performance = VisualService.classAvgPerformanceToDate(sortedAssignments, assignment.created_at)
      courseData.push(assignmentData)
    })
    return courseData
  }

  VisualService.gradeDistribution = function(scores) {
    var grades = {"A": 0, "B": 0, "C": 0, "D": 0, "F": 0}
    angular.forEach(scores, function(score){
      if (score >= 90) {
        grades["A"] += 1
      } else if (score >= 80) {
        grades["B"] += 1
      } else if (score >= 70) {
        grades["C"] += 1
      } else if (score >= 60) {
        grades["D"] += 1
      } else {
        grades["F"] += 1
      }
    })
    return grades
  }

  return VisualService

}])