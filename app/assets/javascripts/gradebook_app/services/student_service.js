Gradebook.factory("StudentService", ["Restangular", function(Restangular) {

  var StudentService = {}

  StudentService.getStudentSubmissions = function(studentId) {
    return Restangular.one("students", studentId).get();
  }

  StudentService.addStudent = function(student) {
    return Restangular.all("students").post(student).then(function(createStudent) {
      return createStudent;
    })
  }

  StudentService.studentData = function(createStudent) {
    var response = [];
    response.push(createStudent.id);
    response.push(createStudent.first_name);
    response.push(createStudent.last_name);
    response.push(createStudent.email);
    for(var i = 0; i < createStudent.submissions.length; i ++) {
      response.push(createStudent.submissions[i].raw_score);
    }
    response.push(0);
    return response;
  };

  StudentService.editStudent = function(student, index, item) {
    if(index === 1) {
      student.first_name = item;
      Restangular.one("students").customPUT(student, student.id)
    }
    else if (index === 2) {
      student.last_name = item;
      Restangular.one("students").customPUT(student, student.id)
    }

    else if (index === 3) {
      student.email = item;
      Restangular.one("students").customPUT(student, student.id)
    }
  }

  StudentService.createSubmissions = function(id) {
  	console.log(id)
  }

  StudentService.updateStudent = function(params, student) {
    Restangular.restangularizeElement(null, student, 'students');
    student.patch(params);
  }

  StudentService.removeStudent = function(student) {
    return Restangular.one("students", student.id).remove()
  }

  return StudentService
}])
