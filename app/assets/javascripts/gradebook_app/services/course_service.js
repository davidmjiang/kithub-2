Gradebook.factory("CourseService", ["Restangular", function(Restangular) {

  var CourseService = {}

  var _courses = []

  var _createCourse = function(courseParams) {
    return Restangular.all('courses').getList().post({
      course: {
        title: courseParams.title,
        teacher_id: courseParams.teacher_id
      }
    }).then(function(response) {
      _courses.push(response)
      return response
    })
  }

  CourseService.createCourse = function(courseParams) {
    return _createCourse(courseParams)
  }

  Restangular.extendCollection('courses', function(collection) {
    collection.create = _createCourse
    return collection
  })

  return CourseService

}])