var Gradebook = angular.module( 'Gradebook', ['ui.router', 'restangular','Devise', 'angularModalService',"ngTable", 'chart.js', 'xeditable', 'scrollable-table', 'ui.bootstrap', 'puElasticInput', "angularTypewrite", "typer"]);


Gradebook.config([
  'RestangularProvider',
  function(RestangularProvider) {

    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({"content-type": "application/json"});
  }
  ]);

angular.module('Gradebook').run(['editableOptions', 'editableThemes', function(editableOptions, editableThemes) {
  editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
  editableThemes['default'].submitTpl = '<button type="submit" class="btn btn-success btn-sm"><i class="fa fa-check" aria-hidden="true"></i></button>';
  editableThemes['default'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-danger btn-sm"><i class="fa fa-times" aria-hidden="true"></i></button>';

}]);

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
      controller: 'CourseIndexCtrl', 
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



