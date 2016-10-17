
var Gradebook = angular.module( 'Gradebook', ['ui.router', 'restangular','Devise', 'angularModalService',"ngTable", "d3"]);


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

    .state('gradebook', {
      abstract: true,
      url: '',

      views: {
        "main": {
          templateUrl: 'gradebook_templates/main.html',
          controller: "ClassesIndexCtrl"
        }
      },


      resolve: {
        // currentUser: ["Auth", function(Auth) {
        //   return Auth.currentUser().then(function(user) {
        //     return user;
        //   });
        // }],
        // students: ["StudentService", "$stateParams", function(StudentService, $stateParams) {
        //   return StudentService.getAllStudents($stateParams.id)

        //     .then(function(allStudents) {
        //       return allStudents;
        //     }
        // }],
        'courseList': ['CourseService', function(CourseService){
          return CourseService.getCourses();
        }]
      },
      views: {
        '': {
          template: '<ui-view></ui-view>'
        },
        // "main": {
        //   templateUrl: 'gradebook_templates/main.html',
        //   controller: ["$scope", "courseList", function($scope, courseList) {
        //     var info = 'SpreadsheetCtrl in state.main'
        //     console.log(info)
        //     $scope.message = info
        //     $scope.courses = courseList;
        //   }]
        // },
        // "navbar": {
        //   templateUrl: 'gradebook_templates/navbar.html',
        //   controller: ["$scope", function($scope) {
        //     var info = 'navbar controller'
        //     console.log(info)
        //     $scope.message = info
        //   }]
        // }
      }
    })

    .state ('gradebook.courseIndex', {
      url: '',
      templateUrl: '/gradebook_templates/courses/index.html',
      controller: 'CourseIndexCtrl'
    })

    .state('gradebook.dataVisuals', {
      url: 'visuals',
      templateUrl: "/gradebook_templates/visuals/course_gpas.html",
      controller: "DataVisualsCtrl",
      resolve: {
        'courseGPAs': ['VisualService', function(VisualService) {
          return VisualService.courseGPAs()
        }]
      }
    })

    .state ('gradebook.courseShow', {
      url: ':id',
      templateUrl: '/gradebook_templates/courses/show.html',
      controller: 'CourseShowCtrl',
      resolve: {
        'course': ['CourseService', '$stateParams', function(CourseService, $stateParams) {
          return CourseService.getCourse($stateParams.id)
        }]
      }
    })
}]);



