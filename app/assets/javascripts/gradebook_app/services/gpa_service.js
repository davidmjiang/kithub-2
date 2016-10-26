Gradebook.factory("GPAService", function() {

  var GPAService = {}

  // calculates course average raw GPA. 
  // if assignment argument is passed in, 
  // calculates assignment average raw GPA
  GPAService.rawGPA = function(course, assignment) {
    var pointsEarned = 0;
    var pointsPossible = 0;
    _.each(course.students, function(student) {
      _.each(student.submissions, function(submission) {
        if (submission.raw_score === -1) {
        } else {
          if (assignment) {
            if (submission.assignment_id === assignment.id) {
              pointsEarned += _realScore(submission.raw_score, assignment)
              pointsPossible += assignment.possible_score
            }
          } else {
            var correct = _.find(course.assignments, {'id': submission.assignment_id})
            pointsEarned += _realScore(submission.raw_score, correct)
            pointsPossible += correct.possible_score
          }
        }
      })
    })
    if (assignment) {
      return (pointsEarned / pointsPossible) * 100
    } else {
      return (pointsEarned / pointsPossible) * 100
    }
  }

  // calculates an assignment's average grade after the curve 
  GPAService.realGPA = function(course, assignment) {
    var pointsEarned = 0;
    var studentCount = 0;
    _.each(course.students, function(student) {
      _.each(student.submissions, function(submission) {
        if (submission.assignment_id === assignment.id) {
          if (submission.raw_score === -1) {
          } else {
            var rawPercent = submission.raw_score/assignment.possible_score * 100
            var curvedPercent = GPAService.applyCurve(assignment, rawPercent)
            pointsEarned += (curvedPercent/100 * assignment.possible_score)
            studentCount += 1
          } 
        }
      })
    })
    var gpa = (pointsEarned / studentCount) / assignment.possible_score * 100
    return gpa
  }

  // calculates an assignment's average grade curve or no curve
  GPAService.getAverages = function(course, assignment) {
    if (assignment.has_curve) {
      return GPAService.realGPA(course, assignment)
    } else {
      return GPAService.rawGPA(course, assignment)
    }
  }

  GPAService.applyCurve = function(assignment, rawPercent) {
    if (assignment.flat_curve) {
      return _applyFlatCurve(assignment, rawPercent)
    } else if (assignment.linear_curve) {
      return _applyLinearCurve(assignment, rawPercent)
    } else {
      return rawPercent
    }
  }

  // private

  var _applyFlatCurve = function(assignment, rawPercent) {
    return assignment.flat_curve.flat_rate + rawPercent
  }

  var _applyLinearCurve = function(assignment, rawPercent) {
    return _linearFormula(assignment.linear_curve, rawPercent)
  }

  var _linearFormula = function(input, rawPercent) {
    return input.curvedA + (((input.curvedB - input.curvedA)/(input.rawB - input.rawA)) * (rawPercent - input.rawA));
  }

  var _realScore = function(rawScore, assignment) {
    var rawPercent = rawScore/assignment.possible_score * 100
    var curvedPercent = GPAService.applyCurve(assignment, rawPercent)
    return (curvedPercent/100 * assignment.possible_score)
  }

  return GPAService

})