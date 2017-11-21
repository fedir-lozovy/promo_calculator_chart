import React from 'react'
import {LabelList, Label, Layer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import moment from 'moment'

export default class StackedBarChart extends React.Component {

    constructor(props) {
        super(props)

    }


    formatXTicks(d) {
        return moment(d, 'dd.MM.YYYY').format('MMM YYYY')
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
                                'Накопленная доходность от маржинального кредитования'
                                : 'Доходность от прогнозируемого роста курса токена'}</li>
                        ))
                    }
                </ul>
            );
        }
        return <div>
            <BarChart width={1400} height={600} data={data}
                      margin={{top: 20, right: 30, left: 20, bottom: 5}}
                      color="#ffffff">

                <Legend width={700}
                        content={(props) => {
                            const {payload} = props;

                            return (
                                <ul style={{"listStyle": "none", "fontSize": "1.5em"}}>
                                    {
                                        payload.map((entry, index) => {
                                            if (entry.value === 'a')
                                                return <li className="legendli1" key={`item-${index}`}>Накопленная
                                                    доходность от маржинального кредитования</li>
                                            if (entry.value === 'b')
                                                return <li className="legendli2" key={`item-${index}`}>Доходность от
                                                    прогнозируемого роста курса токена</li>
                                        })
                                    }
                                </ul>
                            );
                        }}
                        verticalAlign="bottom"
                        wrapperStyle={{
                            layout: 'horizontal',
                        }}/>
                <XAxis dataKey="name" tickFormatter={this.formatXTicks} style={{
                    "fontSize": "1.5em"
                }}/>
                <YAxis
                    tickFormatter={this.formatYTicks}
                    style={{
                        "fontSize": "1.5em",
                        "width": "150px"
                    }}/>
                <CartesianGrid strokeDasharray="3 3"/>

                <Bar dataKey="a" stackId="a" fill="#d8a22f"/>
                <Bar dataKey="b" stackId="a" fill="#327ada">
                    <LabelList dataKey="totalValue" dx={100} position='top' style={{
                        "fontSize": "2em"
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