import {
    CALCULATE_SUCCESS,
    CALCULATE_ERROR
} from '../actions/app.jsx'

import moment from 'moment';

const initialState = {}
export default function app(state = initialState, action) {
    switch (action.type) {
        case CALCULATE_SUCCESS:
            state = {
                ...state,
                accumulatedPricePerToken: calculateaccumulatedPricePerToken(state)
            }
            state = {
                ...state,
                espectedData: calculateEspectedData(state)
            }
            state = {
                ...state,
                resultDataPart1: calculateResultDataPart1(state)
            }
            state = {
                ...state,
                resultDataPart2: calculateResultDataPart2(state)
            }
            console.log(state)
            return {...state}
            break;
        default:
            return state;
            break;
    }
}

function calculateaccumulatedPricePerToken(state) {
    let collectArray = []
    let sum = 0;
    state.initialData.map((d) => {
        sum += parseFloat(d.count.replace(',', '.'))
        if (d.date && moment(d.date, state.defaultFormat).format('MM') == '12')
            collectArray.push({
                date: d.date,
                count: sum
            })
    })
    return collectArray
}


function calculateEspectedData(state) {
    let collectArray = [],
        betaRiskCoef = state.betaRiskCoef.value,
        noRiskRate = state.noRiskRate.value / 100,
        avgMarketRate = state.avgMarketRate.value / 100;

    state.initialData.reduce((prev, next, i) => {
        let prevcount = parseFloat(prev.count.replace(',', '.'))
        let nextcount = parseFloat(next.count.replace(',', '.'))
        if (i > 0)
            collectArray.push({
                date: next.date,
                count: prevcount * (1 + (nextcount / prevcount - 1) / 100) / (noRiskRate / 12 + (avgMarketRate - noRiskRate) / 12 * betaRiskCoef - (nextcount / prevcount - 1) / 100)
            })
        return next;
    })
    return collectArray;
//=prev*(1+(next/prev-1)/100)/(noRiskRate/12+(avgMarketRate-noRiskRate)/12*betaRiskCoef-(next/prev-1)/100)

}

function calculateResultDataPart1(state) {
    let collectArray = []

    state.accumulatedPricePerToken.map((d) => {
        const mdate = moment(d.date, state.defaultFormat);
        if (mdate.format('YYYY') != '2017')
            collectArray.push({
                date: d.date,
                count: state.investment.value * d.count
            })
    })
    return collectArray
}

function calculateResultDataPart2(state) {
    let collectArray = []

    state.espectedData.map((d) => {
        const mdate = moment(d.date, state.defaultFormat);
        if (d.date && mdate.format('MM') == '12' && mdate.format('YYYY') != '2017')
            collectArray.push({
                date: d.date,
                count: state.investment.value * d.count
            })
    })
    return collectArray
}