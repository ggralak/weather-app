import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators, getForecast } from '../../stores/forecast/actions';
import {IRootState} from "../../stores";
import Recipes from './presenter';

function mapStateToProps(state: IRootState) {
  const { forecast, isBusy } = state.forecast;
  return {
    forecast: forecast,
    isBusy: isBusy
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onGetForecast: bindActionCreators(getForecast, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)((<any>Recipes));