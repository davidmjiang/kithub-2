Gradebook.controller('CourseShowCtrl', ['$scope', 'course', "StudentService", function($scope, course, StudentService){

  var cols =[];
  var allRows= [];

  $scope.course = course;

  $scope.students = $scope.course.students;

  $scope.assignments = $scope.course.assignments;


  for (var i = 0; i < $scope.assignments.length; i++){
    // if(i === 0) {
    //   cols.push("First Name");
    // }
    // else if (i === 1) {
    //   cols.push("Last Name");
    // }
    // else if(i === 2) {
    //   cols.push("Email")
    // }
    // else {
      cols.push($scope.assignments[i].assignment_type + ": " + ($scope.assignments[i].title) + "(" + ($scope.assignments[i].possible_score) +")"  );
    // }
  }
  var rowData = [];
  for(var j = 0; j < $scope.students.length; j++ ) {
    rowData.push($scope.students[j].first_name)
    rowData.push($scope.students[j].last_name)
    rowData.push($scope.students[j].email + $scope.students[j].id )
    for(var i = 0; i < $scope.students[j].submissions.length; i++) {
      rowData.push($scope.students[j].submissions[i].raw_score);
    }

    allRows.push(rowData)
    rowData = []
  }

  console.log(allRows.length)
  
  
  $scope.colCount = $scope.assignments.length + 3;
  $scope.rowCount = $scope.students.length;
  
  $scope.incrementCol = function(direction){
    if(direction === "up") {
      $scope.colCount ++;
    }
    else {
      if($scope.colCount > 3) {
        $scope.colCount --;
      } 
    }
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