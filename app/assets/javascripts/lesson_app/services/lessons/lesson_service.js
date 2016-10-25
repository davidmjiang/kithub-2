Lesson.factory('LessonService', ['Restangular', "pullRequestService", 'TeacherService', '_', 'flash', '$timeout', 'Upload',
  function(Restangular, pullRequestService, TeacherService, _, flash, $timeout, Upload) {

  var lessonService = {};

  var _states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  var _grades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  var _subjects = ['Math', 'Science', 'English', 'Foreign Language', 'Art', 'Physical Education', 'History'];

  var _lesson_types = ['Individual', 'Group', 'Teacher-led'];

  // takes in the lesson (from a create action response)
  // adds this to the teacher's lesson plan array in memory
  var pushToUserLessons = function(lesson) {
    var teacher = TeacherService.getTeacher(lesson.teacher_id);
    teacher.lesson_plans.push(lesson);
  };

  var removeFromUserLessons = function(lesson) {
    var teacher = TeacherService.getTeacher(lesson.teacher_id);
    _.remove(teacher.lesson_plans, function(n) { return (n.id === lesson.id); } );
  };

  // takes in the lesson (from an update action response)
  // updates the teacher's lesson plan in memory
  var updateUserLesson = function(lesson) {
    var teacher = TeacherService.getTeacher(lesson.teacher_id);
    var teacherLesson = _.find(teacher.lesson_plans, { 'id': lesson.id } );
    angular.copy(lesson, teacherLesson);
  };

  // returns list of US states
  lessonService.getStates = function() {
    return _states;
  };

  // returns list of school grades (0-12)
  lessonService.getGrades = function() {
    return _grades;
  };

  // returns list of school subjects
  lessonService.getSubjects = function() {
    return _subjects;
  };

  // returns list of lesson type constants
  lessonService.getLessonTypes = function() {
    return _lesson_types;
  };

  lessonService.create = function(newLesson) {
    return Restangular.all('lesson_plans').post(newLesson).then(function(response) {

        pushToUserLessons(response);

        // returns lesson object
        return response;

    });
  };

  // same as create, but sends along a file to convert
  lessonService.upload = function (lesson, file) {

    return Upload.upload({
              url: '/api/v1/lesson_plans.json',
              data: { file: file, lesson_plan: lesson }
      }).then( function(response) {
        // var newLesson = Restangular.restangularizeElement(null, response, 'lesson_plans');
        pushToUserLessons(response.data);

        // returns lesson object
        return response.data;

    });
  };

  lessonService.save = function(lesson) {

    return lesson.patch().then(
      function(response) {
        // success
        updateUserLesson(response);
        return response;
      });

  };

  lessonService.delete = function(lesson) {
    return lesson.remove().then(
      function() {
        removeFromUserLessons(lesson);
      }
    );
  };

  lessonService.getLesson = function(lesson_id) {
    return Restangular.one('lesson_plans', Number(lesson_id) ).get().then(function(response) {
        return response;
      });
  };

  lessonService.setFlash = function(className, message) {
    flash(className, message);
    $timeout(function(){
      $('.alert').fadeOut(500);
    }, 2000);
  };

  lessonService.export = function(lesson) {
    // calls api/v1/lesson_plans/:id/export 
  };


  return lessonService;

}]);
