var Gradebook = angular.module( 'Gradebook', ['ui.router', 'restangular','Devise', 'angularModalService']);

Gradebook.config([
  'RestangularProvider',
  function(RestangularProvider) {

    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({"content-type": "application/json"});
  }
  ]);

Gradebook.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider

    .state('main', {
      url: '/',
      views: {
        "main": {
          templateUrl: 'gradebook_templates/main.html',
          controller: ["$scope", "courseList", function($scope, courseList) {
            var info = 'SpreadsheetCtrl in state.main'
            console.log(info)
            $scope.message = info
            $scope.courses = courseList;
          }]
        },
        "navbar": {
          templateUrl: 'gradebook_templates/navbar.html',
          controller: ["$scope", function($scope) {
            var info = 'navbar controller'
            console.log(info)
            $scope.message = info
          }]
        }
      },
      resolve: {
        currentUser: ["Auth", function(Auth) {
          // return Auth.currentUser().then(function(user) {
          //   return user;
          // });
        }],
        students: ["StudentService", "$stateParams", function(StudentService, $stateParams) {
          return StudentService.getAllStudents($stateParams.id)

            // .then(function(allStudents) {
            //   return allStudents;
            // }
        }],
        'courseList': ['CourseService', function(CourseService){
          return CourseService.getCourses();
        }]
      } 
    })
  
    .state ('main.classShow', {
      url: '/class/:id',
      // views: {
      //   // stuff that is specific to a certain view
      // }
    })
}]);

