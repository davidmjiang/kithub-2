Gradebook.factory("StudentService", ["Restangular", function(Restangular) {
  var StudentService = {}

  StudentService.getStudentSubmissions = function(studentId) {
    return Restangular.one("students", studentId).get();
  }

  StudentService.addStudent = function(course) {
	// var student = {}
 //    student.course_id = course.id
    return Restangular.all("students").post({student: {course_ids: [course.id]}}).then(function(createStudent) {
      return createStudent;
    })
  }

  return StudentService
}])