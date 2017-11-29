import React from 'react'
import {LabelList, Label, Layer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import moment from 'moment'

export default class StackedBarChart extends React.Component {

    constructor(props) {
        super(props)

    }


    formatXTicks(d) {
        return moment(d, 'dd.MM.YYYY').format('YYYY')
    }

    formatYTicks(d) {

        function numberWithSpacesPrice(str) {


            var parts = (str + "").split("."),
                main = parts[0],
                len = main.length,
                output = "",
                i = len - 1;

            while (i >= 0) {
                output = main.charAt(i) + output;
                if ((len - i) % 3 === 0 && i > 0) {
                    output = "," + output;
                }
                --i;
            }
            // put decimal part back
            if (parts.length > 1) {
                var commas = parts[1].substr(0, 2);
                if (commas.length === 1) commas += '0';
                output += "." + commas;

            }
            return output;

        }

        return numberWithSpacesPrice(d)
    }

    renderLegend(p) {

        return p
    }

    render() {
        const data = this.props.data;
        const renderLegend = (props) => {
            const {payload} = props;
            return (
                <ul>
                    {
                        payload.map((entry, index) => (
                            <li key={`item-${index}`}>{entry.value === 'a' ?
                                'Accumulated profitability from margin lending'
                                : 'Revenue from the forecasted token rate growth'}</li>
                        ))
                    }
                </ul>
            );
        }
        return <div>
            <BarChart width={window.innerWidth - (window.innerWidth * 0.1)}
                      height={window.innerHeight - (window.innerHeight * 0.1)} data={data}
                      margin={{top: 20, right: 20, left: window.innerWidth * 0.07, bottom: 100}}
                      textAlign="center"
                      color="#ffffff">

                <Legend width={window.innerWidth}
                        content={(props) => {
                            const {payload} = props;

                            return (
                                <ul style={{"listStyle": "none", "fontSize": window.innerHeight * 0.0025 + "em"}}>
                                    {
                                        payload.map((entry, index) => {
                                            if (entry.value === 'a')
                                                return <li className="legendli1" key={`item-${index}`}>Accumulated
                                                    profitability from margin lending</li>
                                            if (entry.value === 'b')
                                                return <li className="legendli2" key={`item-${index}`}>Revenue from the
                                                    forecasted token rate growth</li>
                                        })
                                    }
                                </ul>
                            );
                        }}
                        verticalAlign="top"
                        wrapperStyle={{
                            layout: 'horizontal',
                        }}/>
                <XAxis dataKey="name" tickFormatter={this.formatXTicks} dy={window.innerHeight * 0.06} style={{
                    "fontSize": window.innerHeight * 0.002 + "em",
                }}/>
                <YAxis
                    tickFormatter={this.formatYTicks}
                    style={{
                        "fontSize": window.innerHeight * 0.0015 + "em",
                        "width": "150px"
                    }}/>
                <CartesianGrid strokeDasharray="3 3"/>

                <Bar dataKey="n" stackId="a" fill="#1d84ff">
                    <LabelList dataKey="b" dx={window.innerWidth * 0.062} dy={window.innerHeight * 0.01}
                               position='bottom' style={{
                        "fontSize": window.innerHeight * 0.0015 + "em",
                        "fill": "#4ce4dc"
                    }}>
                    </LabelList>
                    <LabelList dataKey="a" dx={window.innerWidth * 0.062} dy={window.innerHeight * 0.04}
                               position='bottom' style={{
                        "fontSize": window.innerHeight * 0.0015 + "em",
                        "fill": '#1d84ff'
                    }}>
                    </LabelList>
                </Bar>
                <Bar dataKey="a" stackId="a" fill="#1d84ff">
                </Bar>
                <Bar dataKey="b" stackId="a" fill="#4ce4dc">
                    <LabelList dataKey="totalValue" dx={window.innerWidth * 0.062} dy={-window.innerHeight * 0.01}
                               position='top' style={{
                        "fontSize": window.innerHeight * 0.002 + "em"
                    }}>
                    </LabelList>
                </Bar>
            </BarChart>
        </div>

    }
}

class CustomizedLabel extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {x, y, fill, value} = this.props;
        return <text
            x={x}
            y={y}
            dy={-4}
            fontSize='16'
            fontFamily='sans-serif'
            fill={fill}
            textAnchor="middle">{value}</text>
    }
}