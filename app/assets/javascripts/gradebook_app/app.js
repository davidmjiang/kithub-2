var Gradebook = angular.module( 'Gradebook', ['ui.router', 'restangular','Devise', 'angularModalService',"ngTable"]);

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
          controller: "ClassesIndexCtrl"
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

