"use strict";
var Lesson = angular.module('Lesson', ["ui.router", "restangular", "Devise", "xeditable"]);

angular.module('Lesson').factory('_', ['$window', function($window) {
  return $window._;
}]);

angular.module('Lesson').factory('SimpleMDE', ['$window', function($window) {
  return $window.SimpleMDE;
}]);

angular.module('Lesson').config([
  "$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;
  }
]);

// config for x-editable
angular.module('Lesson').run(['editableOptions', 'editableThemes', function(editableOptions, editableThemes) {
  editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
  editableThemes['default'].submitTpl = '<button type="submit" class="btn btn-success btn-sm"><i class="fa fa-check" aria-hidden="true"></i></button>';
  editableThemes['default'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-danger btn-sm"><i class="fa fa-times" aria-hidden="true"></i></button>';

}]);

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

	$urlRouterProvider.otherwise('/dashboard');

	$stateProvider
	 .state('main',{
    url: '',
    abstract: true,
    template: "<div ui-view></div>",
		resolve: {
			currentUser: ['Auth', '$state', function(Auth, $state){
            return Auth.currentUser()
            .then(function(user){
              return user;
            });
          }]
       	}
		})

   .state('main.dashboard', {
      url: "/dashboard",
      templateUrl: "lesson_templates/teacher/teacher_show.html",
      controller: "TeacherShowCtrl",
      resolve: {
        teacher: ["currentUser", function(currentUser){
            return currentUser;
        }]
      }
    })

		.state('main.teachers', {
			abstract: true,
			url:'/teachers',
			template: "<div ui-view></div>"
		})
		.state('main.lessons', {
      url: '/lessons',
      template: "<div ui-view='lessonsNew'></div><div ui-view='newPullRequest'></div><div ui-view='lessonsShow'></div>",
			abstract: true
		})

		.state('main.lessons.new', {
      url: '/new',
      views: {
        lessonsNew: {
          templateUrl: "lesson_templates/lessons/new.html",
          controller: "LessonNewCtrl"

        }
      }
    })

		// .state('main.lessons.pullrequests')
		.state('main.lessons.show', {
      url: '/:id',
      views: {
        lessonsShow: {
          template: "<div ui-view='pullrequests'></div>",
        },

        newPullRequest: {
          templateUrl: "lesson_templates/pull_requests/new.html",
           controller: "PullRequestNewCtrl"

        }
      }

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

		.state('main.teachers.show', {
			url: '/:id',
			templateUrl: "lesson_templates/teacher/teacher_show.html",
			controller: "TeacherShowCtrl",
			resolve: {
	      teacher: ["$stateParams", "TeacherService", function($stateParams, TeacherService){
	        	return TeacherService.getTeacher($stateParams.id);
	      }]
			}
		});

}]);

angular.module('Lesson').run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.error.bind(console));
});