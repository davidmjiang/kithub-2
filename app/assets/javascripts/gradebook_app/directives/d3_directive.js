Gradebook.directive('d3Line', ['$window', function($window) {
  return {
    restrict: "EA",
    scope: {},
    link: function(scope, element, attrs) {

      var d3 = $window.d3

      var svg = d3.select(element[0])
          .append("svg")

      var margin = {top: 20, right: 20, bottom: 50, left: 70},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom

      var parseTime = d3.timeParse("%d-%b-%y")

      var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height,0]);

      svg.attr('width', width + margin.left + margin.right)
         .attr('height', height + margin.top + margin.bottom)
         .append('g')
            .attr('transform', 'translate(' + margin.left + ", " + margin.top + ")");

      var data = attrs.data
        
      }
      }
    }
  }
}]);