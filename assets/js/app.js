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

// Load data.csv
d3.csv("assets/data/data.csv")
    .then(function (stateData) {
        console.log(stateData);

        // Convert each value to a number
        stateData.forEach(function (data) {
            data.poverty = +data.poverty;
            data.healthcare = +data.healthcare;
        });

        // xLinearScale function
        var xLinearScale = d3
            .scaleLinear()
            .domain([
                d3.min(stateData, d => d.healthcare) * 1.8,
                d3.max(stateData, d => d.poverty) * 1.2
            ])
            .range([0, chartWidth]);
        var yLinearScale = d3
            .scaleLinear()
            .domain([0, d3.max(stateData, d => d.healthcare * 1.2)])
            .range([chartHeight, 0]);

        // Set up axis functions
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Append X & Y axis
        chartGroup
            .append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(bottomAxis);
        chartGroup.append("g").call(leftAxis);

        //Define circles for states
        var circles = chartGroup.selectAll("g circle").data(stateData);

        var r = 10;
        var circlesGroup = circles
            .enter()
            .append("g")
            .attr("id", "circlesGroup");

        // Append circles
        circlesGroup
            .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", r)
            .classed("stateCircle", true);

        // Adding text onto circles
        circlesGroup
            .append("text")
            .attr("x", d => xLinearScale(d.poverty))
            .attr("y", d => yLinearScale(d.healthcare))
            .classed("stateText", true)
            .text(d => d.abbr)
            .attr("font-size", r * 0.95);

        //Tool tip setup
        var toolTip = d3
            .tip()
            .attr("class", "d3-tip")
            .offset([40, -20])
            .html(function (d) {
                return `${d.state}<br>Poverty: ${d.poverty}% <br>Lacks Healthcare: ${d.healthcare}%`;
            });
    });