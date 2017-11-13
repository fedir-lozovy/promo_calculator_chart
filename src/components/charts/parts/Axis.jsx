import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import * as d3 from 'd3'

export default class Axis extends React.Component {
    static propTypes = {
        h: PropTypes.number,
        axis: PropTypes.func,
        axisType: PropTypes.oneOf(['x', 'y'])
    }

    constructor() {
        super()
        this.renderAxis = this.renderAxis.bind(this)
    }

    componentDidUpdate() {
        this.renderAxis();
    }

    componentDidMount() {
        this.renderAxis();
    }

    renderAxis() {
        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.axis);
    }

    render() {

        var translate = "translate(0," + (this.props.h) + ")";

        return (
            <g className="axis" transform={this.props.axisType == 'x' ? translate : ""}>
            </g>
        );
    }
}
