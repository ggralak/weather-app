import * as React from 'react';
import {DayForecast} from "gg-weather-models";
import * as  moment from 'moment';

export interface ForecastDayProps {
  forecast: DayForecast;
  unit: string;
}

export interface ForecastDayState {}

class ForecastDay extends React.Component<ForecastDayProps, ForecastDayState>{

  constructor(props: ForecastDayProps) {
    super(props);
  }

  dayFormatted(date: number) {
    return moment.unix(date).format('dddd');
  }

  dateFormatted(date: number) {
    return moment.unix(date).format('DD/MM/YY');
  }

  lowTemp() {
    return this.props.unit ===  'c' ? this.props.forecast.low_c : this.props.forecast.low_f;
  }

  highTemp() {
    return this.props.unit ===  'c' ? this.props.forecast.high_c : this.props.forecast.high_f;
  }

  render() {
    return (
      <div className={'forecast-day'}>
        <div className={'forecast-day__header'}>
          <div className={'forecast-day__day'}>{this.dayFormatted(this.props.forecast.date)}</div>
          <div className={'forecast-day__date'}>{this.dateFormatted(this.props.forecast.date)}</div>
        </div>

        <div className={'forecast-day__icon'}>
          <img src={this.props.forecast.icon}/>
        </div>

        <div className={'forecast-day__desc'}>
          {this.props.forecast.text}
        </div>

        <div className={'forecast-day__temperature'}>
          <div>
            <span>Low </span>
            <span className={'forecast-day__temp-value'}>{this.lowTemp()}&deg;{this.props.unit}</span>
          </div>
          <div>
            <span>High </span>
            <span className={'forecast-day__temp-value'}>{this.highTemp()}&deg;{this.props.unit}</span>
          </div>
        </div>
      </div>
    );
  }

};

export default ForecastDay;