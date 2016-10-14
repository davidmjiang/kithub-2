var Gradebook = Angular.module( 'Gradebook', ['ui.router', 'restangular', 'ngTable', 'Devise', 'angularModalService'])

Gradebook.config([
  'RestangularProvider',
  function(RestangularProvider) {

    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({"content-type": "application/json"});
  }
  ]);

Gradebook.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/")

  $stateProvider

  .state('main', {
    url: '',
    views: {
      templateUrl: 'templates/gradebook/main.html'
      controller: 'SpreadsheetCtrl'
    },
    resolve: {
      currentUser: ["Auth", function(Auth) {
        return Auth.currentUser().then(function(user) {
          return user;
        });
      },
      students: ["StudentService", "$stateParams", function(StudentService, $stateParams) {
        return StudentService.getAllStudents($stateParams.id).then(function(allStudents) {
          return allStudents;
        }
      }]
    } 
  })
  
  .state ('main.classShow', {
    url: '/class/:id',
    views: {
      // stuff that is specific to a certain view
    }
  }
}]);

