import { combineReducers, ReducersMapObject } from 'redux';

import { default as forecastReducer, State as IForecast } from './forecast/reducers';

import { connectRouter } from 'connected-react-router'

export type IRootState = {
  forecast: IForecast,
};

// Create the root reducer which creates our root state
export default (history: any) => combineReducers<IRootState>( {
  router: connectRouter(history),
  forecast: forecastReducer,
} as ReducersMapObject );