Gradebook.factory("StudentService", ["Restangular", function(Restangular) {

  var StudentService = {}

  StudentService.sortStudents = function(students) {
    var students = students.sort(function(a,b) {
      var lastNameA = a.last_name
      var lastNameB = b.last_name
      if(lastNameA < lastNameB) {
        return -1;
      }
      if(lastNameB < lastNameA) {
        return 1;
      }
      else {
        return 0;
      }
    })
    // StudentService.sortSubmissions(students);
    return students;
  }

  StudentService.sendFail = function(student_id, teacher_id, score) {
    Restangular.one("student_progress/fail").customPOST({student_id: student_id, teacher_id: teacher_id, score: score}).then(function() {
      console.log("Success")
    })
  }


  StudentService.sendPass = function(student_id, teacher_id, score) {
    Restangular.one("student_progress/exceptional").customPOST({student_id: student_id, teacher_id: teacher_id, score: score}).then(function() {
      console.log("Success")
    })
  }

  StudentService.sendPassAssignment = function(student_id, teacher_id, score, assignmentName) {
    Restangular.one("student_progress/exceptional_assignment").customPOST({student_id: student_id, teacher_id: teacher_id, score: score, assignment_name: assignmentName}).then(function() {
      console.log("Success")
    })
  }

  StudentService.sendFailAssignment = function(student_id, teacher_id, score, assignmentName) {
    Restangular.one("student_progress/fail_assignment").customPOST({student_id: student_id, teacher_id: teacher_id, score: score, assignment_name: assignmentName}).then(function() {
      console.log("Success")
    })
  }

  StudentService.sortSubmissions = function(students) {
    for(var i = 0; i < students.length; i++) {
      students[i].submissions.sort(function(a,b) {
        var createdAtA = a.created_at;
        var createdAtB = b.created_at;
        if(createdAtA < createdAtB) {
          return -1;
        }
        if(createdAtB < createdAtA) {
          return 1;
        }
        else {
          return 0;
        }
      })
    }
  }

  StudentService.getStudentSubmissions = function(studentId) {
    return Restangular.one("students", studentId).get();
  }

  StudentService.addStudent = function(student) {
    return Restangular.all("students").post(student).then(function(createStudent) {
      return createStudent;
    })
  }


  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  StudentService.studentData = function(createStudent) {
    var response = [];
    response.push(createStudent.id);
    response.push(capitalize(createStudent.first_name));
    response.push(capitalize(createStudent.last_name));
    response.push(createStudent.email);
    for(var i = 0; i < createStudent.submissions.length; i ++) {
      response.push(createStudent.submissions[i].raw_score); // maybe add a filter here to get curved score (via submission.assignment.flat_curve or linear_curve)
    }
    return response;
  };

  StudentService.editStudent = function(student, index, item) {
    if(index === 1) {
      student.first_name = item;
      Restangular.one("students").customPUT(student, student.id);
    }
    else if (index === 2) {
      student.last_name = item;
      Restangular.one("students").customPUT(student, student.id);
    }

    else if (index === 3) {
      student.email = item;
      Restangular.one("students").customPUT(student, student.id);
    }
  }

  StudentService.createSubmissions = function(id) {
  	console.log(id);
  }

  StudentService.updateStudent = function(params, student) {
    Restangular.restangularizeElement(null, student, 'students');
    student.patch(params);
  }

  StudentService.removeStudent = function(student) {
    return Restangular.one("students", student.id).remove();
  }

  return StudentService
}])
