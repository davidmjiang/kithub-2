Gradebook.controller('CourseShowCtrl', ['$scope', 'course', "StudentService", "AssignmentService", "GPAService", function($scope, course, StudentService, AssignmentService, GPAService){

  var cols =[];
  var allRows= [];

  $scope.course = course;

  $scope.rawGPA = GPAService.rawGPA(course)
  $scope.students = $scope.course.students;

  $scope.assignments = $scope.course.assignments;


  for (var i = 0; i < $scope.assignments.length; i++){
      cols.push($scope.assignments[i].assignment_type +
       $scope.assignments[i].id + ": " + ($scope.assignments[i].title) 
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
    rowData.push($scope.students[j].email + $scope.students[j].id )
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
      rowData.push(rawScore + " / " + possibleScore);
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
    $scope.cols[$scope.cols.length - 1] = "New Assignment";
    $scope.cols.push("Overall");
    for(var i = 0; i < $scope.allRows.length; i++) {
      var temp = $scope.allRows[i].slice(-1)[0]
      $scope.allRows[i][$scope.allRows[i].length - 1] = 0;
      $scope.allRows[i].push(temp);
    }
    AssignmentService.addAssignment(course);
  }

  $scope.addStudent = function(course) {
    $scope.rowCount ++
    StudentService.addStudent(course);
    var newStudent = [];
    for(var i = 0; i < $scope.colCount; i++) {
      newStudent.push(["New Student"])
    }
    $scope.allRows.push(newStudent)
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
  
  $scope.cols = cols;
  $scope.allRows = allRows;

}])