import React, {Component} from 'react'
import PropTypes from 'prop-types';

import * as d3 from 'd3'

export default class Dots extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        x: PropTypes.func,
        y: PropTypes.func

    }

    constructor() {
        super()
    }

    render() {
        //remove last & first point
        var data = this.props.data.splice(1);
        data.pop();

        var circles = data.map((d, i) => {

            return (<circle className="dot" r="7" cx={this.props.x(d.date)} cy={this.props.y(d.count)} fill="#7dc7f4"
                            stroke="#3f5175" strokeWidth="5px" key={i}
                            onMouseOver={::this.props.showToolTip} onMouseOut={::this.props.hideToolTip}
                            data-key={d3.time.format("%b %e")(d.date)} data-value={d.count}/>)
        });

        return (
            <g>
                {circles}
            </g>
        );
    }
}

