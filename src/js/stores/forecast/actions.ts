import {mphClient} from '../../utils/httpClients';
import {DayForecast} from 'gg-weather-models';
import {ActionCreator} from '../action-creator';
import celsiusToFahrenheit from "../../utils/converter";

// Action Types
export type Action = typeof ActionCreators[ keyof typeof ActionCreators ];

// Action Creators
export const ActionCreators = {
  UpdateBusy: new ActionCreator<'UpdateBusy', boolean>('UpdateBusy'),
  UpdateForecast: new ActionCreator<'UpdateForecast', DayForecast[]>( 'UpdateForecast' )
};

// get all recipes that bookmarks are from
export function getForecast(place: string) {

  return async ( dispatch: Function) => {
    console.log('Forecast lookup started');
    dispatch( ActionCreators.UpdateBusy.create( true ) );

    const query: string[] = [];
    query.push("access_key=79adbdda73495161e3d3e71c1fcf2f1c");
    query.push(`query=${place}`);

    const forecastResponse =   await mphClient.get<any>(`http://api.weatherstack.com/current?${query.join("&")}`);

    const forecastToUpdate: DayForecast[] = [{
      date: forecastResponse.data.location.localtime_epoch,
      icon: forecastResponse.data.current.weather_icons[0],
      text: forecastResponse.data.current.weather_description,
      temp_c: forecastResponse.data.current.temperature,
      temp_f: celsiusToFahrenheit(forecastResponse.data.current.temperature)
    }];

    dispatch( ActionCreators.UpdateForecast.create( forecastToUpdate ) );
    dispatch( ActionCreators.UpdateBusy.create( false ) );

  };

}





