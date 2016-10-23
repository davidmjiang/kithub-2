Gradebook.directive('d3Line', ['$window', 'VisualService', function($window, VisualService) {
  return {
    restrict: "EA",
    scope: true,
    link: function(scope, element, attrs) {

      console.log(VisualService)
      console.log(scope.lineData)

      var d3 = $window.d3

      var parseTime = d3.timeParse("%d-%b-%y")

      var margin = {top: 20, right: 20, bottom: 50, left: 70},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom

      var x = d3.scaleLinear().range([0, width]);
      var y = d3.scaleLinear().range([height,0]);


      var svg = d3.select(element[0])
          .append("svg")
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
            .attr('transform', 'translate(' + margin.left + ", " + margin.top + ")");

      d3.json("http://localhost:3000/api/v1/courses.json", function(error, data) {
        console.log(data)
        console.log(typeof data)

        data = VisualService.coursesPerformanceOverTime(data)

        console.log(data)

        data = data[0]

        var valueline = d3.line()
            .x(function(d, i) { return i * width / data.length })
            .y(function(d) { return y(d.class_performance) })
            
        for (var i = 0; i < data.length; i++) {
          data[i].date = parseTime(data[i].date)
          data[i].class_performance = +data[i].class_performance
        }

        x.domain(d3.range(data.length))
        y.domain([0, d3.max(data, function(d) { return d.class_performance })])

        svg.append("path")
          // .data([data])
          .attr("class", "line")
          .attr("d", valueline(data));

        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        svg.append("g")
          .call(d3.axisLeft(y))
      })
    }
  }
}]);