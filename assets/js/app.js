// @TODO: YOUR CODE HERE!

// Set up SVG area and chart margin dimensions
var svgWidth = 960;
var svgHeight = 500;
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 80
};
// Define chart area dimensions
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;


// Append SVG area to corresponding body
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append group area
var chartGroup = svg
.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);
