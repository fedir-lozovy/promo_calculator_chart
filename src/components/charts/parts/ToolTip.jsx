import React, {Component} from 'react'
import PropTypes from 'prop-types';


export default class ToolTip extends React.Component {
    static propTypes = {
        tooltip: PropTypes.object
    }

    constructor() {
        super()
    }

    render() {
        var visibility = "hidden";
        var transform = "";
        var x = 0;
        var y = 0;
        var width = 150, height = 70;
        var transformText = 'translate(' + width / 2 + ',' + (height / 2 - 5) + ')';
        var transformArrow = "";

        if (this.props.tooltip.display == true) {
            var position = this.props.tooltip.pos;

            x = position.x;
            y = position.y;
            visibility = "visible";

            //console.log(x,y);

            if (y > height) {
                transform = 'translate(' + (x - width / 2) + ',' + (y - height - 20) + ')';
                transformArrow = 'translate(' + (width / 2 - 20) + ',' + (height - 2) + ')';
            } else if (y < height) {

                transform = 'translate(' + (x - width / 2) + ',' + (Math.round(y) + 20) + ')';
                transformArrow = 'translate(' + (width / 2 - 20) + ',' + 0 + ') rotate(180,20,0)';
            }


        } else {
            visibility = "hidden"
        }

        return (
            <g transform={transform}>
                <rect className="shadow" width={width} height={height} rx="5" ry="5" visibility={visibility}
                      fill="#6391da" opacity=".9"/>
                <polygon className="shadow" points="10,0  30,0  20,10" transform={transformArrow}
                         fill="#6391da" opacity=".9" visibility={visibility}/>
                <text visibility={visibility} transform={transformText}>
                    <tspan x="0" textAnchor="middle" fontSize="15px"
                           fill="#ffffff">{this.props.tooltip.data.key}</tspan>
                    <tspan x="0" textAnchor="middle" dy="25" fontSize="20px"
                           fill="#a9f3ff">{this.props.tooltip.data.value + " visits"}</tspan>
                </text>
            </g>
        );
    }
}


