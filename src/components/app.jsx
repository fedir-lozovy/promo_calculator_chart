import React from 'react';
import {connect} from 'react-redux'


import * as appActions from '../actions/app.jsx'
import {bindActionCreators} from 'redux'

import StackedBarChart from './recharts/StackedBarChart'

export class App extends React.Component {

    constructor(props) {
        super(props)

    }

    calculate(e) {
        let chArr = []
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

        return <div className="" style={{width:'100%','height':'100%'}}>
            <div className="row">
                <div className="col-xs-12">
                    <div className="top" id="top-line-chart">
                        <div>
                            <div className="col-xs-12">&nbsp;</div>
                            <div className="col-xs-12">
                                <div className="col-xs-6">
                                    <label className="form-label"
                                           style={{fontSize:window.innerHeight*0.002+'em'}}>If the user purchases tokens for the price of 1$=1EXO in the amount of</label>
                                    <input type="number" className="form-control"
                                           defaultValue={this.props.investment.value} min={this.props.investment.min}
                                           max={this.props.investment.max}
                                           style={{width:window.innerWidth*0.2}}
                                           id="investment" onChange={::this.calculate}/>
                                </div>
                                <div className="col-xs-6" style={{display:'none'}}>
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
                    </div>
                </div>
            </div>
            <div>
                <StackedBarChart data={this.props.resultData}/>
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