Gradebook.controller('CourseShowCtrl', ['$scope', 'course', "StudentService", "AssignmentService", "GPAService", "ModalService", "$state", "CourseService", "SubmissionService", function($scope, course, StudentService, AssignmentService, GPAService, ModalService, $state, CourseService, SubmissionService){


  var cols =[];
  var allRows= [];
  $scope.failingStudents = {};
  $scope.exceptionalStudents = {};
  $scope.getLengthFailing = function() {
    count = 0;
    for(key in $scope.failingStudents) {
      count ++
    }
    return count;
  }

  $scope.getLengthPassing = function() {
    count = 0;
    for(key in $scope.exceptionalStudents) {
      count ++
    }
    return count;
  }

  $scope.course = course;

  $scope.rawGPA = GPAService.rawGPA(course);
  $scope.students = $scope.course.students;

  

  StudentService.sortSubmissions($scope.course.students);

  $scope.students = StudentService.sortStudents($scope.course.students);

  var assignments = $scope.course.assignments.sort(function(a,b) {
    var createdAtA = a.id;
    var createdAtB = b.id;
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

  $scope.assignments = assignments

  $scope.percentScore = function(item, index) {
    if(index > 3 && index < $scope.colCount - 1 && $scope.assignments[index - 4]) {
      return ((item / $scope.assignments[index - 4].possible_score * 100).toFixed(2) + "%");
    }
  }

  $scope.isItemScore = function(item, index) {
    if(index > 3 && index < $scope.colCount - 1) {
      return "(" + item + ")";
    }
    else {
      return item;
    }
  }

  $scope.studentDetailModal = function(email, overall) {
    ModalService.showModal({
      templateUrl: '/gradebook_templates/students/detail.html',
      controller: 'StudentModalCtrl',
      inputs: {
        students: $scope.students,
        email: email,
        assignments: $scope.assignments,
        overall: overall
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close;
    })
  }

  $scope.courseDetailModal = function(gpa) {
    ModalService.showModal({
      templateUrl: '/gradebook_templates/courses/detail.html',
      controller: 'CourseModalCtrl',
      inputs: {
        course: $scope.course,
        assignments: $scope.assignments,
        gpa: gpa,
        students: $scope.students
      }
    }).then(function(modal) {
      modal.element.one('hidden.bs.modal', function () {
        if (!modal.controller.closed) {
            modal.controller.closeModal();
        }
      })
      modal.element.modal();
      modal.close;
    })
  }

  $scope.update = function(title) {
    CourseService.updateCourse({course: {title: title}}, $scope.course);
  }


  for (var i = 0; i < $scope.assignments.length; i++){
      cols.push(($scope.assignments[i].title) + ": " +
                        $scope.assignments[i].assignment_type
                        + "(" + ($scope.assignments[i].possible_score) +")"  );
  }

  var rowData = [];
  for(var j = 0; j < $scope.students.length; j++ ) {
    var rawTotal = 0;
    var possibleTotal = 0;
    rowData.push($scope.students[j].id);
    rowData.push($scope.students[j].first_name);
    rowData.push($scope.students[j].last_name);
    rowData.push($scope.students[j].email);
    for(var i = 0; i < $scope.students[j].submissions.length; i++) {
      var rawScore = $scope.students[j].submissions[i].raw_score;
      var possibleScore = $scope.assignments[i].possible_score;
      //Put default value here;
      if(rawScore === -1) {

      }
      else {
        rawTotal += rawScore;
        possibleTotal += possibleScore;
      }
      rowData.push(rawScore);
    }
    allRows.push(rowData);
    rowData = [];
  }

  //Go through the failing students and remove now passing students
  $scope.removePassingStudents = function(passingStudent) {
    for(key in $scope.failingStudents) {
      if (key === passingStudent) {
        delete $scope.failingStudents[key];
      }
    }
  }
  //Go through exceptional students and remove any that are not doing exceptional anymore
  $scope.removeExceptionalStudents = function(notExceptionalStudent) {
    for(key in $scope.exceptionalStudents) {
      if (key === notExceptionalStudent) {
        delete $scope.exceptionalStudents[key];
      }
    }
  }

  $scope.showScore = function(j) {
    //Get the overall score of all the students
    $scope.students = StudentService.sortStudents($scope.course.students);
    if (j > -1) {
      var rawTotal = 0;
      var possibleTotal = 0;
      for (var i = 0; i < $scope.assignments.length; i++) {
        var rawScore = $scope.students[j].submissions[i].raw_score;
        var possibleScore = $scope.assignments[i].possible_score;
        //Put default value here;
        if(rawScore === -1) {
        }
        else {
          rawTotal += rawScore;
          possibleTotal += possibleScore;
        }
      } 
      //Get all of the failing students and put it in an object for display to the teacher
      if((Number(rawTotal / possibleTotal * 100).toFixed(2)) < 60) {
        var failingStudent = $scope.students[j].first_name + " " + $scope.students[j].last_name;
        $scope.failingStudents[failingStudent] = Number(rawTotal / possibleTotal * 100).toFixed(2);
        $scope.removeExceptionalStudents(failingStudent);
      }
      //Remove students who were failing and are no longer failing
      else if((Number(rawTotal / possibleTotal * 100) > 60) && (Number(rawTotal / possibleTotal * 100) < 90)) {
        var passingStudent = $scope.students[j].first_name + " " + $scope.students[j].last_name;
        $scope.removePassingStudents(passingStudent);
      }
      //Get all exceptional students and put them in an object to display to the teacher
      else if((Number(rawTotal / possibleTotal * 100)) > 90) {
        var exceptionalStudent = $scope.students[j].first_name + " " + $scope.students[j].last_name;
        $scope.exceptionalStudents[exceptionalStudent] = Number(rawTotal / possibleTotal * 100).toFixed(2);
        $scope.removePassingStudents(exceptionalStudent);
      }
    $scope.anyFailingStudents = $scope.getLengthFailing();
    $scope.anyExceptionalStudents = $scope.getLengthPassing();
    return Number(rawTotal / possibleTotal * 100).toFixed(2);
    }
  }
      


  $scope.colCount = $scope.assignments.length + 5;
  $scope.rowCount = $scope.students.length;



  $scope.incrementRow = function(direction){
    if(direction === "up") {
      $scope.rowCount ++;
    }
    else {
      if($scope.rowCount > 0) {
        $scope.rowCount --;
      }
    }
  }

  $scope.submitEdit = function(row, item, index) {
    var assignmentId = $scope.assignments[index - 4].id
    var rowIndex = $scope.allRows.indexOf(row);
    if(index > 0 && index < 4) {
      var student = $scope.students[rowIndex];
      StudentService.editStudent(student, index, item);
    }
    else if (index > 3 && index < row.length) {
      var submission;
      for(var i = 0; i < $scope.students.length; i ++) {
        if($scope.students[i].id == row[0]) {
          for(var j = 0; j < $scope.students[i].submissions.length; j++) {
            if($scope.students[i].submissions[j].assignment_id == assignmentId) {
              var submission = $scope.students[i].submissions[j]
            }
          }
          
        }
      }
      submission.raw_score = parseInt(item);
      SubmissionService.editSubmission(submission);
    }
    $scope.rawGPA = GPAService.rawGPA(course);
  }


  $scope.checkItem = function(index, item) {
    if (index === 0) {
      return "You cannot update the student's id";
    }
    if(index === 3 && !item.includes("@")) {
      return "Please enter a valid student email";
    }
    else if(index === $scope.colCount - 1) {
      return "You cannot update the overall score. Update specific scores.";
    }
    else if(index > 3 && !(parseInt(item) > -2)) {
      return "The score needs to be a positive number greater than 0";
    }
    else if(index < $scope.colCount - 1) {
      return true;
    }
  }

  $scope.showAssignmentModal = function(assignment) {
    ModalService.showModal({
      templateUrl: "gradebook_templates/assignments/show.html",
      controller: "AssignmentShowCtrl",
      inputs: {
        assignment: assignment,
        course: course,
        students: $scope.students
      }
    }).then(function(modal) {

      modal.element.one('hidden.bs.modal', function () {
        if (!modal.controller.closed) {
          modal.controller.closeModal();
        }
      });
      modal.element.modal();
      modal.close.then(function(response) {

      })
    })
  }

  $scope.addStudentModal = function(course) {
    ModalService.showModal({
      templateUrl: "gradebook_templates/students/new.html",
      controller: "StudentNewCtrl",
      inputs: {
        course: course
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(response) {

      })
    })
  }

  $scope.addAssignmentModal = function(course) {
    ModalService.showModal({
      templateUrl: "gradebook_templates/assignments/new.html",
      controller: "AssignmentNewCtrl",
      inputs: {
        course: course
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(response) {

      })
    })
  }


  $scope.removeStudentModal = function(course) {
    ModalService.showModal({
      templateUrl: "gradebook_templates/students/destroy.html",
      controller: "StudentDestroyCtrl",
      inputs: {
        course: course
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(response) {
        // console.log(response)
      })
    })
  }


  $scope.$on("student.added", function(event, response) {
    var data = StudentService.studentData(response)
    console.log(response)
    $scope.rowCount ++;
    allRows.push(data);
    $scope.students.push(response);
    CourseService.sortRows($scope.allRows);
    StudentService.sortStudents($scope.course.students);
  })

  $scope.$on("assignment.edit", function(event, data) {
    var newAssignment = data.assignment_type + ": " + data.title +
                        "(" + data.possible_score + ")";
    for(var i = 0; i < $scope.assignments.length; i++) {
      if($scope.assignments[i].id === data.id) {
        $scope.cols[i] = newAssignment;
      }
    }
  })

  $scope.$on("assignment.added", function(event, data) {
    //Add student to the scope
    $scope.course.assignments.push(data);
    //Goes through all the students and pushes the newly
    //created blank submissions to the correct student's submissions array 
    for(var i = 0; i < data.submissions.length; i++) {
      for(var j = 0; j < $scope.students.length; j++) {
        if(data.submissions[i].student_id == $scope.students[j].id) {
          $scope.students[j].submissions.push(data.submissions[i]);
        }
      }
    };
    //Add student to the table and move over overall score
    $scope.colCount ++;
    $scope.cols[$scope.cols.length] =  data.title + ": " + data.assignment_type
                                        + "(" + data.possible_score
                                        + ")";
    for(var i = 0; i < $scope.allRows.length; i++) {
      //var temp = $scope.allRows[i].slice(-2)[0]
      //$scope.allRows[i][$scope.allRows[i].length - 1] = 0;
      $scope.allRows[i].push(-1);
    };
  })

  $scope.$on("student.deleted", function(event, data) {
    for(var i = 0; i < $scope.allRows.length; i ++) {
      if($scope.allRows[i][0] == data.id) {
        $scope.allRows.splice(i,1);
      }
    }
  })

  $scope.deleteCourse = function() {
    if (confirm('Are you sure?')) {
      CourseService.deleteCourse($scope.course).then(function(response) {
        $state.go("gradebook.courseIndex");
      })
    }
  };

  $scope.notifyParent = function(student, score) {
    for(key in $scope.students) {
      if ($scope.students[key].first_name + $scope.students[key].last_name  === 
        student.split(" ").slice(0)[0] + student.split(" ").slice(1)[0]) {
        StudentService.sendMail($scope.students[key].id, $scope.course.teacher_id, score)
      }
    }
  }


  $scope.cols = cols;
  $scope.allRows = allRows;
  allRows = CourseService.sortRows($scope.allRows);

}])
