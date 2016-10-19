
var Gradebook = angular.module( 'Gradebook', ['ui.router', 'restangular','Devise', 'angularModalService',"ngTable", "d3", "chart.js", "xeditable", "scrollable-table"]);


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
      resolve: {
        'courseList': ['CourseService', function(CourseService){
          return CourseService.getCourses();
        }]
      },
      views: {
        '': {
          template: '<ui-view></ui-view>'
        }
      }
    })

    .state ('gradebook.courseIndex', {
      url: '/',
      templateUrl: '/gradebook_templates/courses/index.html',
      controller: 'CourseIndexCtrl'
    })

    .state('gradebook.dataVisuals', {
      url: '/visuals',
      templateUrl: "/gradebook_templates/visuals/course_gpas.html",
      controller: "DataVisualsCtrl",
      resolve: {
        'courseGPAs': ['VisualService', function(VisualService) {
          return VisualService.courseGPAs()
        }]
      }
    })

    .state ('gradebook.courseShow', {
      url: '/:id',
      templateUrl: '/gradebook_templates/courses/show.html',
      controller: 'CourseShowCtrl',
      resolve: {
        'course': ['CourseService', '$stateParams', function(CourseService, $stateParams) {
          return CourseService.getCourse($stateParams.id)
        }]
      }
    })
}]);



