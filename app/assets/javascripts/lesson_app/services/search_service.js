Lesson.factory('SearchService', ['Restangular', function(Restangular, ) {

  var searchService = {};

  searchService.search = function(params) {
    return Restangular.all('searches').getList(q: params)
      .then(function(response){
        return response
      });
  }

  return searchService;

}]);
