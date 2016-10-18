Gradebook.factory("GPAService", function() {

  var GPAService = {}

  // calculates course average raw GPA. 
  // if assignment argument is passed in, 
  // calculates assignment average raw GPA
  GPAService.rawGPA = function(course, assignment) {
    var pointsPossible = course.points_possible;
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
    // var student
    if (assignment) {
      return (pointsEarned / course.students.length) / assignment.possible_score * 100
    } else {
      return (pointsEarned / course.students.length) / pointsPossible * 100
    }
  }

  return GPAService

})