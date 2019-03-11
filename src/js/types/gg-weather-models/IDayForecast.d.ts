declare module 'gg-weather-models' {
  export type DayForecast = {
    // day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
    date: number;
    low_c: number;
    high_c: number;
    low_f: number;
    high_f: number;
    text: string;
    icon: string;
  }
}
