/* eslint-disable no-var */
import * as d3 from 'd3'

var data = [
    {country: "Nigeria", usage: 45},
    {country: "Thailand", usage: 44},
    {country: "Turkey", usage: 40},
    {country: "Argentina", usage: 35},
    {country: "UAE", usage: 34},
    {country: "Philippines", usage: 29},
    {country: "Vietname", usage: 27},
    {country: "Singapore", usage: 25},
    {country: "South Africa", usage: 23},
    {country: "Brazil", usage: 23},
]

var width = 800;
var height = 600;

// eslint-disable-next-line no-var
var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)

var radiusScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.usage)])
    .range([0, 50]);

var simulation = d3.forceSimulation(data)
.force("x", d3.forceX(width / 2).strength(0.05))
.force("y", d3.forceY(height / 2).strength(0.05))
.force("collision", d3.forceCollide(d => radiusScale(d.usage) + 2))
.on("tick", ticked);

function ticket() {
    var cirles = svg.selectAll(".bubble")
    .data(data);
}
