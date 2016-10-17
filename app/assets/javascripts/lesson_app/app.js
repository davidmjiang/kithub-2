"use strict";
var Lesson = angular.module('Lesson', ["ui.router", "restangular", "Devise", 'ngFileUpload']);

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

angular.module('Lesson').
    config(['AuthProvider', function(AuthProvider) {
        AuthProvider.loginPath('teachers/sign_in.json');
        AuthProvider.loginMethod('POST');
        AuthProvider.resourceName('teacher');
    }]);

//routes
angular.module('Lesson').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('');

	$stateProvider
	 .state('main',{
    url: '',
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
		})

   // .state('main.dashboard', {
   //    url: "/dashboard",
   //    templateUrl: "lesson_templates/teacher/teacher_show.html",
   //    controller: "TeacherShowCtrl",
   //    resolve: {
   //      teacher: ["currentUser", "TeacherService", function(currentUser, TeacherService){
   //          return TeacherService.getTeacher(currentUser.id);
   //      }]
   //    }
   //  })

		.state('main.lessons', {
      url: '/lessons',
      template: "<div ui-view></div>",
			abstract: true
		})

		.state('main.lessons.show', {
      url: '/:id',
      template: "<div ui-view='pullrequests'></div>"
    })
		// .state('main.lessons.new')
		.state('main.lessons.show.pullRequests', {
      url: '/pullrequests',
      views: {
        "pullrequests": {
          templateUrl:  "lesson_templates/pull_requests/index.html",
          controller: "PullRequestIndexCtrl",
          resolve: {
            pullRequests: ["pullRequestService",
                            "$stateParams",
                            function(pullRequestService, $stateParams) {
                pullRequestService.all($stateParams.id);
              }]
            }
        },
      }
    })

		.state('main.teachers', {
			url: '/teachers/:id',
			templateUrl: "lesson_templates/teacher/teacher_show.html",
			controller: "TeacherShowCtrl",
			resolve: {
	      teacher: ["$stateParams", "TeacherService", function($stateParams, TeacherService){
	        	return TeacherService.getTeacher($stateParams.id);
	      }]
			}
		})
    .state('main.teachers.overview',{
      url: '/overview',
      templateUrl: 'lesson_templates/teacher/overview.html'
    })
    .state('main.teachers.lessonPlans',{
      url: '/lessonPlans',
      templateUrl: 'lesson_templates/teacher/lesson_plans.html'
    })
    .state('main.teachers.starred',{
      url: '/starred',
      templateUrl: 'lesson_templates/teacher/starred.html'
    })
    .state('main.teachers.contributions',{
      url: '/contributions',
      templateUrl: 'lesson_templates/teacher/contributions.html'
    })
    .state('main.teachers.followers',{
      url: '/followers',
      templateUrl: 'lesson_templates/teacher/followers.html',
      resolve: {
        followers: ["$stateParams", 'Restangular', function($stateParams, Restangular){
          return Restangular.all('teacher_followings').getList({
            followed_id: $stateParams.id
          })
        }]
      },
      controller: "TeacherFollowersCtrl"
    })
    .state('main.teachers.following',{
      url: '/following',
      templateUrl: 'lesson_templates/teacher/following.html',
      resolve: {
        following: ["$stateParams", 'Restangular', function($stateParams, Restangular){
          return Restangular.all('teacher_followings').getList({
            follower_id: $stateParams.id
          })
        }]
      },
      controller: "TeacherFollowingCtrl"
    })






    ;

}]);

angular.module('Lesson').run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.error.bind(console));
});