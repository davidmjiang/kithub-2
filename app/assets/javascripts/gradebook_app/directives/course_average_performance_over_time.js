Gradebook.directive('d3Line', ['$window', 'VisualService', function($window, VisualService) {
  return {
    restrict: "EA",
    scope: true,
    link: function(scope, element, attrs) {

      console.log(scope.coursesData)

      var d3 = $window.d3

      // var parseTime = d3.timeParse("%d-%b-%y")

      var margin = {top: 20, right: 20, bottom: 50, left: 50},
          width = 560 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom

      var x = d3.scaleLinear().range([0, width]);
      var y = d3.scaleLinear().range([height,0]);


      var svg = d3.select(element[0])
          .append("svg")
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
            .attr('transform', 'translate(' + margin.left + ", " + margin.top + ")");

      data = scope.coursesData[parseInt(attrs.index)]

      var valueline = d3.line()
          .x(function(d, i) { return i * width / data.length })
          // .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.class_performance) })

      for (var i = 0; i < data.length; i++) {
        // data[i].date = parseTime(data[i].date)
        data[i].class_performance = +data[i].class_performance
      }

      // x.domain([d3.range(data.length)])
      x.domain([0, data.length])
      y.domain([40, 100])

      svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

      svg.append("text")
        .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Number of Assignments")

      svg.append("g")
        .call(d3.axisLeft(y))

      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Average Cumulate Grade")
    }
  }
}]);