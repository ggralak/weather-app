declare module 'gg-weather-models' {
  export type DayForecast = {
    date: number;
    temp_c: number;
    temp_f: number;
    text: string;
    icon: string;
  }
}
