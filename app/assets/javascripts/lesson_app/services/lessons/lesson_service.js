Lesson.factory('LessonService', ['Restangular', function(Restangular) {

  var lessonService = {};

  var _states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  var _grades = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  lessonService.getStates = function() {
    return _states;
  };

  lessonService.getGrades = function() {
    return _grades;
  };

  lessonService.create = function(newLesson) {
    console.log("Creating...")
    Restangular.all('lesson_plans').post(newLesson).then(function(response) {
      // returns lesson object
      console.log(response)

    },
    function(response) {
      // returns error object
      console.error(response.errors)
    });
  };


  return lessonService;

}]);