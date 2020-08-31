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


var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);



d3.csv("data.csv").then(function(data) {
    
    console.log(data)
    data.forEach(function(data){
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });
    var x = d3.scaleLinear().range([0, chartWidth]);
    var y = d3.scaleLinear().range([chartHeight, 0]);
  
    var bottomAxis = d3.axisBottom(x);
    var leftAxis = d3.axisLeft(y);
    x.domain([0,d3.max(data, function(data){
      return +data.poverty;
    })]);
  
    y.domain([0,d3.max(data, function(data){
      return +data.healthcare;
    })]);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    chartGroup.append("g")
      .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.poverty))
        .attr("cy", d => y(d.healthcare))
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", ".5");
    

    var text= svg.selectAll("text")
        .data(data)
        .enter()
        .append("text");

    var textLabels = text
        .attr("x", function(data) {return xLinearScale(data.healthcare +1.3);})
        .attr("y", function(data) {return yLinearScale(data.poverty +.1);})
        .text(function(data) {return data.abbr})
        .attr("font-size", "12px")
        .attr("fill", "white");
        
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - (margin.left + 40))
        .attr("x", 0 - (chartHeight))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .style("text-anchor", "margintop")
        .text("Population in Fair or Poor Health (%)")
    
    
      chartGroup.append("text")
        .attr("transform", "translate(" + (chartWidth/2) + ", " + (chartHeight + margin.top + 20) + ")")
        .attr("class", "axisText")
        .style("text-anchor", "middle")
        .text("Population Below the Poverty Line (%)");
    
       chartGroup.append("text")
        .style("text-anchor", "center")
        .attr("class", "axisText")
        .text("Correlation of Health vs. Poverty in USA");       
   }).catch(function(error) {
    console.log(error);
});
