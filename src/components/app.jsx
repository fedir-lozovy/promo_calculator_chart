import React from 'react';
import {connect} from 'react-redux'
import LineChart from './charts/LineChart.jsx'

import * as appActions from '../actions/app.jsx'
import {bindActionCreators} from 'redux'


export class App extends React.Component {

    constructor(props) {
        super(props)

    }

    calculate(e) {
        let chArr=[]
        if (parseFloat(e.target.value) < parseFloat(e.target.min))
            e.target.value = e.target.min;
        if (parseFloat(e.target.value) > parseFloat(e.target.max))
            e.target.value = e.target.max;
        if (e.target.id === 'avgMarketRate')
            if (parseFloat(e.target.value) < parseFloat(this.props.noRiskRate.value))
                e.target.value = this.props.noRiskRate.value;
        if (e.target.id === 'noRiskRate')
            if (parseFloat(e.target.value) > parseFloat(this.props.avgMarketRate.value)) {
                e.target.value = this.props.avgMarketRate.value;
            }
        this.props.calculate(e.target);
    }


    render() {
        //  return <BarChart  data={[5,10,1,3]} size={[500,500]}/>
        return <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <div className="top" id="top-line-chart">
                        <div>
                            <div className="col-xs-12">&nbsp;</div>
                            <div className="col-xs-12">
                                <div className="col-xs-3">
                                    <label className="form-label">Если USER купит токенов по цене 1$=1EXO на
                                        сумму</label>
                                    <input type="number" className="form-control"
                                           defaultValue={this.props.investment.value} min={this.props.investment.min}
                                           max={this.props.investment.max}
                                           id="investment" onChange={::this.calculate}/>
                                </div>
                                <div className="col-xs-9">
                                    <div className="col-xs-4 pull-right">
                                        <label className="form-label">Бета коэфф. риска (чем выше, тем больший
                                            риск)</label>
                                        <input type="number" className="form-control" id="betaRiskCoef"
                                               defaultValue={this.props.betaRiskCoef.value}
                                               min={this.props.betaRiskCoef.min}
                                               max={this.props.betaRiskCoef.max} onChange={::this.calculate}/>
                                    </div>
                                    <div className="col-xs-3 pull-right">
                                        <label className="form-label">Рыночная средняя доходность, годовая, %</label>
                                        <input type="number" className="form-control" id="avgMarketRate"
                                               defaultValue={this.props.avgMarketRate.value}
                                               min={this.props.avgMarketRate.min}
                                               max={this.props.avgMarketRate.max} onChange={::this.calculate}/>
                                    </div>
                                    <div className="col-xs-3 pull-right">
                                        <label className="form-label">Безрисковая ставка, годовая, %</label>
                                        <input type="number" className="form-control" id="noRiskRate"
                                               defaultValue={this.props.noRiskRate.value}
                                               min={this.props.noRiskRate.min}
                                               max={this.props.noRiskRate.max} onChange={::this.calculate}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="pad bottom-left-svg">
                                {this.props.resultData && this.props.resultData.length ?
                                    <LineChart width={1300} height="600" chartId="v1_chart"
                                               data={this.props.resultData} data1={this.props.resultDataPart1}
                                               data2={this.props.resultDataPart2}/>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

function mapStateToProps(state) {

    return state.app
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(appActions, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(App)