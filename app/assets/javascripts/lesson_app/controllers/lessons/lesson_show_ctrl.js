"use strict";
Lesson.controller('LessonShowCtrl', ['$scope', 'LessonService', 'Restangular', 'lesson', 'Auth', 'Upload',
  function($scope, LessonService, Restangular, lesson, Auth, Upload) {

  $scope.states = LessonService.getStates();
  $scope.grades = LessonService.getGrades();

  // determines if mode is preview or editing
  $scope.editing = false;

  // options for the editing window
  $scope.editorOptions = {
    autoDownloadFontAwesome: false,
    spellChecker: false,
    placeholder: "Lesson plan...",
    autosave: {
      enabled: true,
      uniqueId: "lessonEditor",
    },
    status: ["autosave", "lines", "words"]
  };

  // options for the preview window
  $scope.previewOptions = {
    autoDownloadFontAwesome: false,
    spellChecker: false,
    toolbar: false,
    status: ["lines", "words"]
  };
  
  $scope.lesson = lesson;
  console.log($scope.lesson);
  $scope.lesson.grade = $scope.lesson.grade.toString(); // for dropdown menu values

  Auth.currentUser()
      .then(function(user) {
        $scope.currentUser = user;
        checkCurrentUser();
      }, function(response) {
        console.error(response);
      });

  // checks whether or not the lesson
  // belongs to the current user, and sets
  // currentUserLesson accordingly
  var checkCurrentUser = function() {
    if ($scope.currentUser.id === lesson.teacher_id) {
      $scope.currentUserLesson = true;
    } else {
      $scope.currentUserLesson = false;
    }
  };

  $scope.create = function(newLesson) {
    LessonService.create(newLesson);
  };

  // patches the lesson object
  $scope.save = function() {
    LessonService.save($scope.lesson);
    $scope.toggleEditing();
  };

  // switch from editing to preview mode
  $scope.toggleEditing = function() {
    $scope.editing = !$scope.editing;
  };

  //show additional materials
  $scope.materials = $scope.lesson.additional_materials;

  //upload additional material
  $scope.upload = function(file){
    Upload.upload({
      url: 'api/v1/lesson_plans/' + $scope.lesson.id + '/additional_materials.json',
      method: 'POST',
      headers: {'Content-Type': false},
      fields:{
        "additional_material[material]": file
      },
      file: file,
      sendFieldsAs: 'json'
    }).then(function(response){
      $scope.materials.push(response);
      console.log("success");
    }, function(response){
      console.log("error: ", response.status);
    },
    function(evt){
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
    });
  };

}]);
