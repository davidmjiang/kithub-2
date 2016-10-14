Gradebook.factory("StudentService", ["Restangular", function(Restangular) {
  var StudentService = {}

  StudentService.getAllStudents = function() {
    console.log("geting all students")
  }

  return StudentService
}])