import { mphClient } from '../../utils/httpClients';
import { DayForecast } from 'gg-weather-models';
import { ActionCreator } from '../action-creator';
import ForecastDay from "../../components/Forecast/ForecastDay";

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

    // http://api.apixu.com/v1/forecast.json?&q=Dublin&days=3
    const query: string[] = [];
    query.push("key=a30b9052c98f46708bf111414191103");
    query.push("days=3");
    query.push(`q=${place}`);

    const forecastResponse = await mphClient.get<any>(`http://api.apixu.com/v1/forecast.json?${query.join("&")}`);

    /*
    mphClient.interceptors.request.use(config => {
      console.log('token: ' + JSON.parse(localStorage.getItem('token')));
      config.headers['Authorization'] = JSON.parse(localStorage.getItem('token'));
      return config;
    });

    let recipesResponse = await mphClient.get(`recipes?searchText=${searchText}&starred=${starred}`);
    let recipes = recipesResponse.data as Partial<Recipe>[];
    */

    let response = {
      "forecast": {
        "forecastday": [
          {
            "date": "2019-03-11",
            "date_epoch": 1552262400,
            "day": {
              "maxtemp_c": 9.1,
              "maxtemp_f": 48.4,
              "mintemp_c": 2,
              "mintemp_f": 35.6,
              "avgtemp_c": 5,
              "avgtemp_f": 40.9,
              "maxwind_mph": 27.7,
              "maxwind_kph": 44.6,
              "totalprecip_mm": 1.9,
              "totalprecip_in": 0.07,
              "avgvis_km": 16.6,
              "avgvis_miles": 10,
              "avghumidity": 73,
              "condition": {
                "text": "Moderate or heavy rain shower",
                "icon": "//cdn.apixu.com/weather/64x64/day/356.png",
                "code": 1243
              },
              "uv": 1.8
            },
            "astro": {
              "sunrise": "06:50 AM",
              "sunset": "06:21 PM",
              "moonrise": "08:59 AM",
              "moonset": "11:44 PM"
            }
          },
          {
            "date": "2019-03-12",
            "date_epoch": 1552348800,
            "day": {
              "maxtemp_c": 7.2,
              "maxtemp_f": 45,
              "mintemp_c": 4.7,
              "mintemp_f": 40.5,
              "avgtemp_c": 6.6,
              "avgtemp_f": 43.8,
              "maxwind_mph": 31.1,
              "maxwind_kph": 50,
              "totalprecip_mm": 4.6,
              "totalprecip_in": 0.18,
              "avgvis_km": 13.4,
              "avgvis_miles": 8,
              "avghumidity": 72,
              "condition": {
                "text": "Moderate or heavy rain shower",
                "icon": "//cdn.apixu.com/weather/64x64/day/356.png",
                "code": 1243
              },
              "uv": 1.5
            },
            "astro": {
              "sunrise": "06:48 AM",
              "sunset": "06:23 PM",
              "moonrise": "09:23 AM",
              "moonset": "No moonset"
            }
          },
          {
            "date": "2019-03-13",
            "date_epoch": 1552435200,
            "day": {
              "maxtemp_c": 8.7,
              "maxtemp_f": 47.7,
              "mintemp_c": 3.1,
              "mintemp_f": 37.6,
              "avgtemp_c": 6.5,
              "avgtemp_f": 43.6,
              "maxwind_mph": 31.5,
              "maxwind_kph": 50.8,
              "totalprecip_mm": 2.8,
              "totalprecip_in": 0.11,
              "avgvis_km": 16.8,
              "avgvis_miles": 10,
              "avghumidity": 72,
              "condition": {
                "text": "Light drizzle",
                "icon": "//cdn.apixu.com/weather/64x64/day/266.png",
                "code": 1153
              },
              "uv": 1.6
            },
            "astro": {
              "sunrise": "06:45 AM",
              "sunset": "06:25 PM",
              "moonrise": "09:52 AM",
              "moonset": "12:56 AM"
            }
          }
        ]
      }
    };

    const forecastToUpdate: DayForecast[] = forecastResponse.data.forecast.forecastday.map( (item: any) => {
      return {
        date: item.date_epoch,
        icon: item.day.condition.icon,
        text: item.day.condition.text,
        low_c: item.day.mintemp_c,
        high_c: item.day.maxtemp_c,
        low_f: item.day.mintemp_f,
        high_f: item.day.maxtemp_f
      }
    });

    dispatch( ActionCreators.UpdateForecast.create( forecastToUpdate ) );
    dispatch( ActionCreators.UpdateBusy.create( false ) );
    /*
    setTimeout(() => {
      console.log('Forecasts returned');
      console.log(response);

    }, 1000);
    */

  };

}





