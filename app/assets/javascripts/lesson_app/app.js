"use strict";
var Lesson = angular.module('Lesson', ["ui.router", "restangular", "Devise"]);

angular.module('Lesson').factory('_', ['$window', function($window) {
  return $window._;
}]);

angular.module('Lesson').config([
  "$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;
  }
]);

// config for restangular
angular.module('Lesson').config([
  'RestangularProvider',
  function(RestangularProvider) {

    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({"content-type": "application/json"});
  }
]);

//routes
angular.module('Lesson').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/lessons');

	$stateProvider
	 .state('lessons',{
    url: '/lessons',
    abstract: true,
    template: "<div ui-view></div>",
		resolve: {
			currentUser: ['Auth', function(Auth){
            return Auth.currentUser()
            .then(function(user){
              return user;
            });
          }]
		}
		.state('teacher-show', {
			url: '/teachers/:id',
			templateUrl: "lesson_templates/teacher/teacher_show.html",
			controller: "TeacherShowCtrl",
			resolve: {
	      teacher: ["$stateParams", "TeacherService", function($stateParams, TeacherService){
	        	return TeacherService.getTeacher($stateParams.id);
	      }]
			}
		})  
  });

}]);

angular.module('Lesson').run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.error.bind(console));
});