Gradebook.factory("StudentService", ["Restangular", function(Restangular) {
  var StudentService = {}

  StudentService.getAllStudents = function(studentId) {
    console.log("geting all students")
  }

  return StudentService
}])