import * as d3 from "d3";

import React from 'react';
import {connect} from 'react-redux'

import chartdata from '../data/ex1.js'

var Chart = require('react-d3-core').Chart;
// require `react-d3-basic` for Line chart component.
var LineChart = require('react-d3-basic').LineChart;
import * as appActions from '../actions/app.jsx'
import {bindActionCreators} from 'redux'

const width = 700,
    height = 300,
    margins = {left: 100, right: 100, top: 50, bottom: 50},
    title = "User sample",
    // chart series,
    // field: is what field your data want to be selected
    // name: the name of the field that display in legend
    // color: what color is the line
    chartSeries = [
        {
            field: 'BMI',
            name: 'BMI',
            color: '#ff7f0e'
        }
    ],
    // your x accessor
    x = function (d) {
        return d.index;
    }

export class Appex1 extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {
        return <Chart
            title={title}
            width={width}
            height={height}
            margins={margins}
        >
            <LineChart
                showXGrid={false}
                showYGrid={false}
                margins={margins}
                title={title}
                data={chartdata}
                width={width}
                height={height}
                chartSeries={chartSeries}
                x={x}
            />
        </Chart>
    }
}

function mapStateToProps(state) {
    return state.app
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appex1)