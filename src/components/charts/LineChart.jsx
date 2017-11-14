import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import * as d3 from 'd3'

import Axis from './parts/Axis.jsx'
import Grid from './parts/Grid.jsx'
import ToolTip from './parts/ToolTip.jsx'
import Dots from './parts/Dots.jsx'

export default class LineChart extends React.Component {
    static propsTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        chartId: PropTypes.string
    }

    constructor() {
        super()


        this.state = {
            tooltip: {display: false, data: {key: '', value: ''}},
            width: 0
        };
        this.updateSize = this.updateSize.bind(this)
        this.hideToolTip = this.hideToolTip.bind(this)
        this.showToolTip = this.showToolTip.bind(this)
    }

    componentWillMount() {
        window.addEventListener('resize', (e) => {
            this.updateSize();
        });

        this.setState({width: this.props.width});

    }

    componentDidMount() {
        this.updateSize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', (e) => {
            this.updateSize();
        });
    }

    updateSize() {
        var node = ReactDOM.findDOMNode(this);
        var parentWidth = node.offsetWidth;

        if (parentWidth < this.props.width) {
            this.setState({width: parentWidth - 20});
        } else {
            this.setState({width: this.props.width});
        }
    }

    render() {
        var data = this.props.data;
        var margin = {top: 5, right: 50, bottom: 20, left: 50},
            w = this.state.width - (margin.left + margin.right),
            h = this.props.height - (margin.top + margin.bottom);
        var parseDate = d3.time.format("%d.%m.%Y").parse;

        data = data.map(d => {
            return {
                date: parseDate(d.date),
                count: parseFloat(d.count.replace(',', '.'))
            }
        });


        var x = d3.time.scale()
            .domain(d3.extent(data, function (d) {
                return d.date;
            }))
            .rangeRound([0, w]);

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function (d) {
                return d.count + 1;
            })])
            .range([h, 0]);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(5);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .tickValues(data.map(function (d, i) {
                if (i > 0)
                    return d.date;
            }).splice(1))
            .ticks(4);

        var xGrid = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .ticks(5)
            .tickSize(-h, 0, 0)
            .tickFormat("");


        var yGrid = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(5)
            .tickSize(-w, 0, 0)
            .tickFormat("");


        var interpolations = [
            "linear",
            "step-before",
            "step-after",
            "basis",
            "basis-closed",
            "cardinal",
            "cardinal-closed"];

        var line = d3.svg.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.count);
            }).interpolate(interpolations[5]);
        var transform = 'translate(' + margin.left + ',' + margin.top + ')';
        return (
            <div>
                <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>

                    <g transform={transform}>

                        <Grid h={h} grid={yGrid} gridType="y"/>
                        {/*<Grid h={h} grid={xGrid} gridType="x"/> */}

                        <Axis h={h} axis={yAxis} axisType="y"/>
                        <Axis h={h} axis={xAxis} axisType="x"/>

                        <path className="line shadow" d={line(data)} strokeLinecap="round"/>

                        <Dots data={data} x={x} y={y} showToolTip={::this.showToolTip}
                              hideToolTip={::this.hideToolTip}/>

                        <ToolTip tooltip={this.state.tooltip}/>
                    </g>

                </svg>


            </div>
        );
    }

    showToolTip(e) {
        e.target.setAttribute('fill', '#FFFFFF');

        this.setState({
            tooltip: {
                display: true,
                data: {
                    key: e.target.getAttribute('data-key'),
                    value: e.target.getAttribute('data-value')
                },
                pos: {
                    x: e.target.getAttribute('cx'),
                    y: e.target.getAttribute('cy')
                }

            }
        });
    }

    hideToolTip(e) {
        e.target.setAttribute('fill', '#7dc7f4');
        this.setState({tooltip: {display: false, data: {key: '', value: ''}}});
    }
}


window.LineChart = LineChart;