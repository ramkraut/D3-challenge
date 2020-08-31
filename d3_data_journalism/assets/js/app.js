// @TODO: YOUR CODE HERE!
var svgHeight = 400;
var svgWidth = 1000;

var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;
  
var svg = d3.select("#scatter").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);





d3.csv("data.csv").then(function(data) {
    
    console.log(data)
    data.forEach(function(data){
        data.age= +data.age;
        data.smokes = +data.smokes;
    });
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data.smokes)])
        .range([chartHeight, 0]);
    var xScale = d3.scaleBand()
        .domain([0,d3.max(data.age)])
        .range([0, chartWidth])
        .padding(0.05);
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);
    chartGroup.append("g")
      .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", ".5");
        
   }).catch(function(error) {
    console.log(error);
});
