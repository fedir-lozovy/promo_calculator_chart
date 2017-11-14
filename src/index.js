import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app.jsx';
import configureStore from './store/configureStore'
import initialData from './data/dataset171117.csv'
import moment from 'moment'

const defaultTimeFormat = 'DD.MM.YYYY'
const store = configureStore({
    app: {
        defaultFormat: defaultTimeFormat,
        initialData: initialData,
        accumulatedPricePerToken: [],
        noRiskRate: {
            value: 5,
            initialValue: 5,
            min: 1,
            max: 7
        },//%
        avgMarketRate: {//>noRiskRate
            value: 20,
            initialValue: 5,
            min: 1,
            max: 100
        },//%
        betaRiskCoef: {
            value: 1,
            initialValue: 1,
            min: 0.01,
            max: 2
        },
        investment: {
            value: 2000,
            initialValue: 2000,
            min: 500,
            max: 10000000
        },
        espectedData: [],
        resultDataPart1: [],
        resultDataPart2: [],
        resultData: []
    }
});
render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('app'));
