Gradebook.factory("GPAService", function() {

  var GPAService = {}

  GPAService.rawGPA = function(course) {
    var pointsPossible = course.points_possible;
    var pointsEarned = 0
    _.each(course.students, function(student) {
      _.each(student.submissions, function(submission) {
        pointsEarned += submission.raw_score
      })
    })
    // var student
    return (pointsEarned / course.students.length) / pointsPossible
  }

  return GPAService

})