/* eslint-disable no-var */
import * as d3 from 'd3'
 
var svg = d3.select("#chart-svg");

var width = +svg.attr("width");
var height = +svg.attr("height");

var radiusScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.usage)])
    .range([0, 50]);

var simulation = d3.forceSimulation(data)
    .force("x", d3.forceX(width / 2).strength(0.05))
    .force("y", d3.forceY(height / 2).strength(0.05))
    .force("collision", d3.forceCollide(d => radiusScale(d.usage) + 2))
    .on("tick", ticked);

function ticked() {
    var circles = svg.selectAll(".bubble")
        .data(data);

    circles.enter()
        .append("circle")
        .attr("class", "bubble")
        .attr("r", d => radiusScale(d.usage))
        .merge(circles)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    var labels = svg.selectAll(".label")
        .data(data);

    labels.enter()
        .append("text")
        .attr("class", "label")
        .merge(labels)
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .text(d => d.country);    
}
