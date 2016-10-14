Gradebook.controller('ClassesIndexCtrl', ['$scope', "NgTableParams", function($scope, NgTableParams){


  $scope.kids = [{firstName: "Moroni", lastName: "Wilks", email: "foobar1@gmail.com", assignments: [{type: "homework", score: 50}]}];
  $scope.tableParams = new NgTableParams({page: 1, count: 10}, { dataset: $scope.kids});

  var cols =[];
  var data= [];

  for (var i = 0; i < 10; i++){
    if(i === 0) {
      cols.push("First Name");
    }
    else if (i === 1) {
      cols.push("Last Name");
    }
    else if(i === 2) {
      cols.push("Email")
    }
    else {
      cols.push('Assignment '+ (i - 2) );
    }
    
    var rowData = [];
    for (var j = 0; j < 10; j++){
      rowData.push('Row-'+( i + 1 ) +' - Col '+ ( j + 1 ))
    }
    data.push(rowData)
  }
  
  $scope.colCount = 3;
  
  $scope.increment=function(dir){
    if(dir === "up") {
      $scope.colCount ++;
    }
    else {
      $scope.colCount --;
    }
  }
  
  $scope.cols = cols;
  $scope.data = data;

}]);