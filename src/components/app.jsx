import React from 'react';
import {connect} from 'react-redux'
import LineChart from './charts/LineChart.jsx'

import * as appActions from '../actions/app.jsx'
import {bindActionCreators} from 'redux'


export class App extends React.Component {

    constructor(props) {
        super(props)

    }

    calculate() {
        this.props.calculate();
    }

    render() {
        //  return <BarChart  data={[5,10,1,3]} size={[500,500]}/>
        return <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <button className="btn btn-primary" onClick={::this.calculate}>Calculate</button>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="top" id="top-line-chart">
                        <div>
                            <div className="pad bottom-left-svg">
                                {this.props.resultData && this.props.resultData.length ?
                                    <LineChart width={1300} height="600" chartId="v1_chart"
                                               data={this.props.resultData}/>
                                    :'no data'
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