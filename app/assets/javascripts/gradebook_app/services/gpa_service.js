Gradebook.factory("GPAService", function() {

  var GPAService = {}

  // calculates course average raw GPA. 
  // if assignment argument is passed in, 
  // calculates assignment average raw GPA
  GPAService.rawGPA = function(course, assignment) {
    var pointsEarned = 0
    _.each(course.students, function(student) {
      _.each(student.submissions, function(submission) {
        if (assignment) {
          if (submission.assignment_id === assignment.id) {
            pointsEarned += submission.raw_score
          }
        } else {
          pointsEarned += submission.raw_score
        }
      })
    })
    if (assignment) {
      return (pointsEarned / course.students.length) / assignment.possible_score * 100
    } else {
      return (pointsEarned / course.students.length) / course.points_possible * 100
    }
  }

  // calculates an assignment's average grade after the curve 
  GPAService.realGPA = function(course, assignment) {
    var pointsEarned = 0
    _.each(course.students, function(student) {
      _.each(student.submissions, function(submission) {
        if (submission.assignment_id === assignment.id) {
          var rawPercent = submission.raw_score/assignment.possible_score * 100
          var curvedPercent = _applyCurve(assignment, rawPercent)
          pointsEarned += (curvedPercent/100 * assignment.possible_score)
        }
      })
    })
    var gpa = (pointsEarned / course.students.length) / assignment.possible_score * 100
    return gpa
  }



  // private

  var _applyCurve = function(assignment, rawPercent) {
    if (assignment.flat_curve) {
      return _applyFlatCurve(assignment, rawPercent)
    } else if (assignment.linear_curve) {
      return _applyLinearCurve(assignment, rawPercent)
    }
  }

  var _applyFlatCurve = function(assignment, rawPercent) {
    return assignment.flat_curve.flat_rate + rawPercent
  }

  var _applyLinearCurve = function(assignment, rawPercent) {
    return _linearFormula(assignment.linear_curve, rawPercent)
  }

  var _linearFormula = function(input, rawPercent) {
    return input.curvedA + (((input.curvedB - input.curvedA)/(input.rawB - input.rawA)) * (rawPercent - input.rawA));
  }

  return GPAService

})