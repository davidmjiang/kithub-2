Gradebook.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){

                angular.element(element).tooltip('show');
            }, function(){

                angular.element(element).tooltip('hide');
            });
        }
    };
});