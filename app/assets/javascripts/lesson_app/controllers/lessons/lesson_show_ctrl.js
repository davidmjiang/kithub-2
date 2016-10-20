"use strict";
Lesson.controller('LessonShowCtrl', ['$scope', 'LessonService', 'Restangular', 'lesson', 'currentUser', 'owner', 'Upload', '$http', 'LessonStarService', 'currentTeacher', 'flash', '$timeout',
  function($scope, LessonService, Restangular, lesson, currentUser, owner, Upload, $http, LessonStarService, currentTeacher, flash, $timeout) {

  $scope.lesson = lesson;
  $scope.owner = owner;
  $scope.draftTitle = $scope.lesson.title;

  // Searches the starred lesson_plans array for lesson plans that have already been starred.
  var has_starred = function(current_user, lesson) {
    var starred = current_user.starred_lesson_plans
    console.log(starred)
    for (var i = 0; i < starred.length; i++) {
      if (starred[i].id === lesson.id) {
        console.log('found')
        return true;
      }
    }
    return false;
  };

  // Sets the star to filled in or not depending on whether that teacher has starred the lesson.
  if (has_starred(currentTeacher, lesson)) {
    $scope.starred = true;
  } else {
    $scope.starred = false;
  }

  if ($scope.lesson.grade) { $scope.lesson.grade = $scope.lesson.grade.toString(); }

  //show profile photo if there is one
  if (owner.avatar_file_name) {
    $scope.profile_photo = owner.image;
  } else {
    $scope.profile_photo = "https://placehold.it/250x250";
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
      uniqueId: "lessonplan-" + $scope.lesson.id,
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

  $scope.validateTitle = function(data) {
    if (data && data.length < 2) {
      return "Title must be at least 2 characters.";
    }
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
        LessonService.setFlash('alert-success', 'Lesson saved!')
        toggleSaving(false);
      },
      function() {
        LessonService.setFlash('alert-danger', 'Could not save lesson')
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
      LessonService.setFlash('alert-success', 'File added!')
    }, function(response){
      LessonService.setFlash('alert-danger', 'Could not add file!');
      console.log("error: ", response.status);
    },
    function(evt){
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
    });
  };

  // Allows you to star a lesson when you click on the star on the show page.
  $scope.starLesson = function() {
    LessonStarService.newStar(lesson.id, currentUser.id).then(function(response) {
      $scope.starred = true;
    });
  };

  $scope.unstarLesson = function() {
    LessonStarService.removeStar(lesson.id, currentUser.id).then(function(response) {
      $scope.starred = false;
    });
  };




}]);
