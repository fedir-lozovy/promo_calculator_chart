import React, {Component} from 'react'
import * as d3 from 'd3'

//import * as legend from '../libs/legend'

class Chart extends Component {
    constructor(props) {
        super(props)
        this.createChart = this.createChart.bind(this)
    }

    componentDidMount() {
        this.createChart()
    }

    componentDidUpdate() {
        this.createChart()

    }

    createChart() {
        d3.csv("../src/data/movies.csv", (data) => {

            var fillScale = d3.scaleOrdinal()
                .domain(["titanic", "avatar", "akira", "frozen", "deliverance", "avengers"])
                .range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F", "#5eafc6", "#41a368"]);

            var xScale = d3.scaleLinear().domain([1, 10]).range([20, 1200]);
            var yScale = d3.scaleLinear().domain([0, 55]).range([480, 20]);

            var xAxis = d3.axisBottom()
                .scale(xScale)
                .tickSize(1200)
                .tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

            d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);

            var yAxis = d3.axisRight()
                .scale(yScale)
                .ticks(10)
                .tickSize(480);

            d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);

            var n = 0;
            Object.keys(data[0]).forEach(key => {
                if (key != "day") {
                    var movieArea = d3.area()
                        .x(d => xScale(d.day))
                        .y0(d => yScale(simpleStacking(d, key) - d[key]))
                        .y1(d => yScale(simpleStacking(d, key)))
                        .curve(d3.curveBasis);
                    d3.select("svg")
                        .append("path")
                        .style("id", `${key} Area`)
                        .attr("d", movieArea(data))
                        .attr("fill", fillScale(key))
                        .attr("stroke", "black")
                        .attr("stroke-width", 1);
                    n++;
                }
            });

            function simpleStacking(lineData, lineKey) {
                var newHeight = 0;
                Object.keys(lineData).every(key => {
                    if (key !== "day") {
                        newHeight += parseInt(lineData[key]);
                        if (key === lineKey) {
                            return false;
                        }
                    }
                    return true;
                })
                return newHeight;
            }
        })
    }

    render() {
        return <div style={{
            "text-align": "center",
            "margin": "auto"
        }}>
            <svg width={1200} height={500}>
            </svg>
        </div>
    }
}

export default Chart