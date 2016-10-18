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

  // calculates real GPA> 
  GPAService.realGPA = function(course, assignment) {
    var noRealGPA
    var pointsEarned = 0
    _.each(course.students, function(student) {
      _.each(student.submissions, function(submission) {
        if (assignment) {
          if (submission.assignment_id === assignment.id) {
            if (submission.real_score) {
              pointsEarned += (submission.real_score/100 * assignment.possible_score)
            } else {
              noRealGPA = true
            }
          }
        } else {
          pointsEarned += (submission.real_score/100 * assignment.possible_score)
        }
      })
    })
    if (noRealGPA) return undefined
    if (assignment) {
      var assignmentGPA = (pointsEarned / course.students.length) / assignment.possible_score * 100
      return assignmentGPA
    } else {
      var courseGPA = (pointsEarned / course.students.length) / course.points_possible * 100
      return courseGPA 
    }
  }

  return GPAService

})