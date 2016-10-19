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
    console.log("points earned: " + pointsEarned)
    var gpa = (pointsEarned / course.students.length) / assignment.possible_score * 100
    console.log("gpa: " + gpa)
    return gpa
  }

  var _applyCurve = function(assignment, rawPercent) {
    if (assignment.flat_curve) {
      return _applyFlatCurve(assignment, rawPercent)
    } else if (assigment.linear_curve) {
      return _applyLinearCurve(assignment, rawPercent)
    }
  }

  var _applyFlatCurve = function(assignment, rawPercent) {
    return assignment.flat_curve.flat_rate + rawPercent
  }

  var _applyLinearCurve = function(assignment, rawPercent) {

  }

  return GPAService

})