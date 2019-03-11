import { ActionCreators, Action } from './actions';
import {DayForecast} from "gg-weather-models";

// Action Types
export type Action = typeof ActionCreators[ keyof typeof ActionCreators ];

// State
export type State = {
  readonly isBusy: boolean;
  readonly forecast: DayForecast[] | null;
};

export const initialState: State = {
  isBusy: false,
  forecast: null
};

export function reducer( state: State = initialState, action: Action ): State {
  let partialState: Partial<State> | undefined;

  switch ( action.type ) {
    case ActionCreators.UpdateForecast.type:
      console.log('reducer updating forecasts: ');
      console.log(action.payload);
      partialState = {
        forecast: action.payload
      };
      break;
    case ActionCreators.UpdateBusy.type:
      partialState = {
        isBusy: action.payload
      };
      break;
  }

  return { ...state, ...partialState };
}

export default reducer;