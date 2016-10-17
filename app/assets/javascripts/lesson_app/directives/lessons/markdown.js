Lesson.directive('lessonEdit', [
  '$parse', 'SimpleMDE', function($parse, SimpleMDE) {
    return {
      restrict: 'A',
      require: 'ngModel',
      controller: ['$scope', function($scope) {
        return {
          get: function() {
            return $scope.lessonEdit.instance;
          },
          rerenderPreview: function(val) {
            return $scope.lessonEdit.rerenderPreview(val);
          }
        };
      }],
      link: function(scope, element, attrs, ngModel) {
        var options, rerenderPreview;
        options = $parse(attrs.lessonEdit)(scope) || {};
        options.element = element[0];
        var mde = new SimpleMDE(options);
        if (attrs.preview === "true") {
          ngModel.$render();
          mde.togglePreview();
        }
        mde.codemirror.on('change', function() {
          scope.$applyAsync(function() {
            ngModel.$setViewValue(mde.value());
          });
        });
        ngModel.$render = function() {
          var val = ngModel.$modelValue || options["default"];
          mde.value(val);
          if (mde.isPreviewActive()) {
            rerenderPreview(val);
          }
        };
        rerenderPreview = function(val) {};
        scope.lessonEdit = {
          instance: mde,
          rerenderPreview: rerenderPreview
        };
      }
    };
  }
]);