Lesson.factory('LessonService', ['Restangular', "pullRequestService",
  function(Restangular, pullRequestService) {

  var lessonService = {};

  var _states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  var _grades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  lessonService.getStates = function() {
    return _states;
  };

  lessonService.getGrades = function() {
    return _grades;
  };

  lessonService.create = function(newLesson) {
    console.log("Creating...");
    return Restangular.all('lesson_plans').post(newLesson).then(function(response) {
      console.log(response);
        return response
      // returns lesson object

    },
    function(response) {
      // returns error object
      console.error(response.errors);
    });
  };

  lessonService.save = function(lesson) {
    lesson.patch().then(function(response) {
      // MAYBE just do one
      pullRequestService.all();
    });
  };

  lessonService.getLesson = function(lesson_id) {
    return Restangular.one('lesson_plans', Number(lesson_id) ).get().then(function(response) {
      return response;
    }, function(response) {
      return response;
      // error handling
    });
  };


  return lessonService;

}]);