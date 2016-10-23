Gradebook.factory("VisualService", ["Restangular", "_", "CurveService", function(Restangular, _, CurveService) {

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
      sum += submission.raw_score
      possible += assignment.possible_score
    }
    return (sum / possible)*100
  };

  VisualService.studentAverages = function(students, assignments) {
    var studentArray = [];
    angular.forEach(students, function(student) {
      studentArray.push({
        'name': student.first_name + " " + student.last_name[0] + ".",
        'average': VisualService.studentAvg(student, assignments)})
    })
    studentArray.sort(function(a, b){
      return a.average-b.average
    })
    return studentArray
  };

  VisualService.studentScores = function(students, assignment) {
    var scoreArray = [];
    angular.forEach(students, function(student) {
      var submission = _.find(student.submissions,
       {'assignment_id': assignment.id});
      var score = VisualService.getPercent(assignment, submission.raw_score)
      scoreArray.push({
        'name': student.first_name + " " + student.last_name[0] + ".",
        'percent': score})
    })
    scoreArray.sort(function(a, b){
      return a.percent-b.percent
    })
    return scoreArray
  }

  var _applyLinearCurve = function(assignment, rawPercent) {
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

  VisualService.classAvgPerformanceToDate = function(course, date) {
    // declare a variable "classPointsEarned" and set it to 0
    // delcare a variable "classPointsPossible" and set it to 0
    // iterate over course.assignments
        // declare a variable "scores", an empty array
        // iterate over assignment.submissions
            // divide submission.raw_score by assignment.possible_score to get rawPercent
            // run rawPercent through curve function (if any)
            // add post-curve (if any) score to scores array
        // sum "scores" and divide by scores.length to get classAvgPerformance for that assignment
        // multiply that by assignment.possible_score to get curvedAvgPoints for that assignment
        // increment classPointsEarned by curvedAvgPoints
        // increment classPointsPossible by assignment.possible_score
    // return classPointsEarned divided by classPointsPossible
    var classPointsEarned = 0,
        classPointsPossible = 0
    _.each(course.assignments, function(assignment) {
      var scores = []
      if (assignment.created_at <= date) {
        _.each(assignment.submissions, function(submission) {
          var rawPercent = (submission.raw_score / assignment.possible_score) * 100 
          var realPercent = assignment.has_curve ? _applyCurve(assignment, rawPercent) : rawPercent
          scores.push(realPercent)
        })
        var curvedAvgPerformance = _.reduce(scores, function(sum, n) {
          return sum + n
        }, 0) / scores.length
        var curvedAvgPoints = curvedAvgPerformance/100 * assignment.possible_score
        classPointsEarned += curvedAvgPoints
        classPointsPossible += assignment.possible_score
      }
    })
    return classPointsEarned / classPointsPossible * 100
  }

  VisualService.coursesPerformanceOverTime = function(courses) {
    var coursesData = []
    _.each(courses, function(course) {
      console.log("each course")
      var courseData = []
      _.each(course.assignments, function(assignment) {
        console.log("each course's assignment")
        var assignmentData = {}
        assignmentData.date = assignment.created_at
        assignmentData.class_performance = VisualService.classAvgPerformanceToDate(course, assignment.created_at)
        courseData.push(assignmentData)
      })
      coursesData.push(courseData)
    })
    return coursesData
  }

  return VisualService

}])