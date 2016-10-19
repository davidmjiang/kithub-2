"use strict";
Lesson.controller('LessonShowCtrl', ['$scope', 'LessonService', 'Restangular', 'lesson', 'currentUser', 'owner', 'Upload', '$http',
  function($scope, LessonService, Restangular, lesson, currentUser, owner, Upload, $http) {

  $scope.lesson = lesson;
  $scope.lesson.grade = $scope.lesson.grade.toString(); // for dropdown menu values
  $scope.states = LessonService.getStates();
  $scope.grades = LessonService.getGrades();
  $scope.owner = owner;
  $scope.draftTitle = $scope.lesson.title;

  //show profile photo if there is one
  if (owner.avatar_file_name) {
    $scope.profile_photo = owner.image;
  } else {
    $scope.profile_photo = "http://placehold.it/250x250";
  }

  // determines if mode is preview or editing
  $scope.editing = false;
  // true means an ajax update request is still pending
  $scope.saving = false;

  // options for the editing window
  $scope.editorOptions = {
    autoDownloadFontAwesome: false,
    spellChecker: false,
    placeholder: "Lesson plan...",
    autosave: {
      enabled: true,
      uniqueId: "lessonEditor",
    },
    status: ["lines", "words"]
  };

  // options for the preview window
  $scope.previewOptions = {
    autoDownloadFontAwesome: false,
    spellChecker: false,
    toolbar: false,
    status: ["lines", "words"]
  };

  // checks whether or not the lesson
  // belongs to the current user, and sets
  // currentUserLesson accordingly
  var checkCurrentUser = function() {
    if (currentUser.id === $scope.lesson.teacher_id) {
      $scope.currentUserLesson = true;
    } else {
      $scope.currentUserLesson = false;
    }
  };
  checkCurrentUser();

  $scope.create = function(newLesson) {
    LessonService.create(newLesson);
  };

  // turns on and off spinning save image
  var toggleSaving = function(toggle) {
    $scope.saving = toggle;
  };

  // patches the lesson object
  $scope.save = function() {
    var oldTitle = $scope.lesson.title;  // save in case of failure
    
    toggleSaving(true);

    $scope.lesson.title = $scope.draftTitle;
    LessonService.save($scope.lesson).then(
      function() {
        $scope.saved_title = $scope.lesson.title;
        toggleSaving(false);
      },
      function() {
        console.log("Didn't work!")
        $scope.lesson.title = oldTitle;
      });
    // $scope.toggleEditing();
  };


  // switch from editing to preview mode
  $scope.toggleEditing = function() {
    $scope.editing = !$scope.editing;
  };

  //show additional materials
  $scope.materials = $scope.lesson.additional_materials;
 
  //delete additional material
  $scope.deleteMat = function(am){
    $http({
      method: 'DELETE',
      url:'/api/v1/additional_materials/' + am.id
    }).then(function(response){
      var index = $scope.materials.indexOf(am);
      $scope.materials.splice(index, 1);
      console.log(response.status);
    });
  };

  //upload additional material
  $scope.upload = function(file){
    $scope.saving = true;
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
      $scope.materials.push(response.data);
      $scope.saving = false;
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
