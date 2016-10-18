
Gradebook.controller('CourseShowCtrl', ['$scope', 'course', "StudentService", "GPAService", "ModalService", "AssignmentService", "SubmissionsService", function($scope, course, StudentService, GPAService, ModalService, AssignmentService, SubmissionsService){

  var cols =[];
  var allRows= [];

  $scope.course = course;

  $scope.rawGPA = GPAService.rawGPA(course)
  $scope.students = $scope.course.students;

  $scope.assignments = $scope.course.assignments;

  $scope.studentDetailModal = function(email) {
    ModalService.showModal({
      templateUrl: '/gradebook_templates/students/detail.html',
      controller: 'StudentModalCtrl',
      inputs: {students: $scope.students, email: email, assignments: $scope.assignments}
    }).then(function(modal) {
      modal.element.modal();
      modal.close;
    })
  }


  for (var i = 0; i < $scope.assignments.length; i++){
      cols.push($scope.assignments[i].assignment_type +
       ($scope.assignments[i].title)
       + "(" + ($scope.assignments[i].possible_score) +")"  );
  }
  cols.push("Overall")

  var rowData = [];
  for(var j = 0; j < $scope.students.length; j++ ) {
    var rawTotal = 0;
    var possibleTotal = 0;
    rowData.push($scope.students[j].id)
    rowData.push($scope.students[j].first_name)
    rowData.push($scope.students[j].last_name)
    rowData.push($scope.students[j].email)
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
    rowData.push(Number(rawTotal / possibleTotal * 100).toFixed(2));
    allRows.push(rowData)
    rowData = []
  }


  $scope.colCount = $scope.assignments.length + 5;
  $scope.rowCount = $scope.students.length;

  // $scope.incrementCol = function(direction){
  //   if(direction === "up") {
  //     $scope.colCount ++;
  //   }
  //   else {
  //     if($scope.colCount > 3) {
  //       $scope.colCount --;
  //     }
  //   }
  // }

  $scope.addAssignment = function(course){
    $scope.colCount ++;
    $scope.cols[$scope.cols.length - 1] = "New Title";
    $scope.cols.push("Overall");
    for(var i = 0; i < $scope.allRows.length; i++) {
      var temp = $scope.allRows[i].slice(-1)[0]
      $scope.allRows[i][$scope.allRows[i].length - 1] = 0;
      $scope.allRows[i].push(temp);
    }
    AssignmentService.addAssignment(course);
  }


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
    var rowIndex = $scope.allRows.indexOf(row)
    if(index > 0 && index < 4) {
      var student = $scope.students[rowIndex]
      StudentService.editStudent(student, index, item)

    }
    else if (index > 3 && index < row.length - 1) {
      var submission = $scope.students[rowIndex].submissions[index - 4]
      submission.raw_score = parseInt(item)
      SubmissionsService.editSubmission(submission)
    }
  }


  $scope.checkItem = function(index, item) {
    console.log(!parseInt(item))
    if (index === 0) {
      return "You cannot update the student's id";
    }
    if(index === 3 && !item.includes("@")) {
      return "Please enter a valid student email";
    }
    else if(index === $scope.colCount - 1) {
      return "You cannot update the overall score. Update specific scores.";
    }
    else if(index > 4 && !(parseInt(item))) {
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
        course: course
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(response) {
        // update course show
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
        $scope.rowCount ++
        var newStudent = [];
        for(var i = 0; i < $scope.colCount; i++) {
          newStudent.push(["New Student"])
        }
        $scope.allRows.push(response)
      })
    })
  }

  $scope.$on("student.added", function(event, data) {
    $scope.rowCount ++;
    allRows.push(data);
  })

  $scope.cols = cols;
  $scope.allRows = allRows;

}])
