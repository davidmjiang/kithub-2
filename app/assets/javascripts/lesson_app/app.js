"use strict";

var Lesson = angular.module('Lesson', ["ui.router", "restangular", "Devise", 'ngFileUpload', "xeditable"]);

angular.module('Lesson').factory('_', ['$window', function($window) {
  return $window._;
}]);

angular.module('Lesson').factory('SimpleMDE', ['$window', function($window) {
  return $window.SimpleMDE;
}]);

angular.module('Lesson').factory('JsDiff', ['$window', function($window) {
  return $window.JsDiff;
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
          }],
      diff: ['DiffService', function(DiffService) {
        console.log(DiffService('Hello', 'Hello World'));
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
      templateUrl: "lesson_templates/show.html",
      abstract: true
		})

		.state('main.lessons.show', {
      url: '/:id',
      views: {

      newPullRequest: {
        templateUrl: "lesson_templates/pull_requests/new.html",
         controller: "PullRequestNewCtrl",
         resolve: {
          forkedLesson: ["LessonService", "$stateParams", function(LessonService, $stateParams){
          return LessonService.getLesson($stateParams.id);

         }]}},

        'mainContainer@main.lessons': {
          templateUrl: "lesson_templates/lessons/show.html",
          controller: "LessonShowCtrl",
          resolve: {
            lesson: ['LessonService', '$stateParams', function(LessonService, $stateParams) {
              return LessonService.getLesson($stateParams.id).then(function(response) {
                return response;
              });
            }]

          }
        }
      }
    })

		.state('main.lessons.show.pullRequests', {
      url: '/pullrequests',
      views: {
        "mainContainer@main.lessons": {
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
      abstract: true,
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
      templateUrl: 'lesson_templates/teacher/starred.html',
      resolve: {
        starred_lessons: ["$stateParams", "Restangular", function($stateParams, Restangular){
          return Restangular.all('lesson_plan_stars').getList({teacher_id: $stateParams.id})
        }]
      },
      controller: 'StarredLessonsCtrl'
    })
    .state('main.teachers.contributions',{
      url: '/contributions',
      templateUrl: 'lesson_templates/teacher/contributions.html',
      resolve: {
        lessons_contributed_to: ["$stateParams", "Restangular", function($stateParams, Restangular){
          return Restangular.all('lesson_plan_contributors').getList({teacher_id: $stateParams.id})
        }]
      },
      controller: 'ContributionsCtrl'
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
