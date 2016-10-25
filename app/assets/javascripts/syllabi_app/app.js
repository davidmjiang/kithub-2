"use strict";

var Syllabi = angular.module('Syllabi', ["ui.router", "restangular", "Devise", 'ngFileUpload', "xeditable", 'angularUtils.directives.dirPagination', 'rzModule', 'flash']);

angular.module('Syllabi').factory('_', ['$window', function($window) {
  return $window._;
}]);

angular.module('Syllabi').config([
  "$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;
  }
]);

// config for x-editable
angular.module('Syllabi').run(['editableOptions', 'editableThemes', function(editableOptions, editableThemes) {
  editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
  editableThemes['default'].submitTpl = '<button type="submit" class="btn btn-success btn-sm"><i class="fa fa-check" aria-hidden="true"></i></button>';
  editableThemes['default'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-danger btn-sm"><i class="fa fa-times" aria-hidden="true"></i></button>';

}]);

// config for restangular
angular.module('Syllabi').config([
  'RestangularProvider',
  function(RestangularProvider) {

    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({"content-type": "application/json"});
  }
]);

angular.module('Syllabi').
    config(['AuthProvider', function(AuthProvider) {
        AuthProvider.loginPath('teachers/sign_in.json');
        AuthProvider.loginMethod('POST');
        AuthProvider.resourceName('teacher');
    }]);

// config for pagination
angular.module('Syllabi')
  .config(['paginationTemplateProvider', function(paginationTemplateProvider) {
    paginationTemplateProvider
    .setPath('lesson_templates/dirPagination.tpl.html');
}]);

//routes
angular.module('Syllabi').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/courses');

  $stateProvider
   .state('courses',{
    url: '/courses',
    templateUrl: "syllabi_templates/courses.html",
    controller: 'SyllabiCoursesCtrl',
    resolve: {
      currentUser: ['Auth', function(Auth){
            return Auth.currentUser()
            .then(function(user){
              return user;
            });
          }],
      courses: ['SyllabiCourseService', function(SyllabiCourseService){
        return SyllabiCourseService.getCourses();
      }]
      }  
    })


}]);

angular.module('Syllabi').run(['$rootScope', function($rootScope){
  $rootScope.$on("$stateChangeError", console.error.bind(console));
}]);
