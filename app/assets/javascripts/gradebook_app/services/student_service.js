Gradebook.factory("StudentService", ["Restangular", function(Restangular) {
  var StudentService = {}

  StudentService.getStudentSubmissions = function(studentId) {
    return Restangular.one("students", studentId).get();
  }

  StudentService.addStudent = function(course) {
  	var student;
    return Restangular.all("students").post({student: {course_ids: [course.id]}}).then(function(createStudent) {
    	return createStudent
    })
  
    // return Restangular.all("submissions").post({student: {course_ids: [course.id]}}).then(function(createStudent) {
    //   return createStudent;
    // })
  }

  StudentService.createSubmissions = function(id) {
  	console.log(id)
  }

  return StudentService
}])