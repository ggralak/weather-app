import * as React from 'react';
import {DayForecast, SwitchOption} from "gg-weather-models";
import Switch from "./Switch";
import ForecastDay from "./ForecastDay";

export interface ForecastProps {
  forecast: DayForecast[] | null,
  isBusy: boolean;
  onGetForecast: (place: string, unit: string) => void
}

export interface ForecastState {
  place: SwitchOption,
  unit: SwitchOption
}

class Forecast extends React.Component<ForecastProps, ForecastState>{

  placeOptions: SwitchOption[] = [
    { value: "dublin", label: "Dublin"},
    { value: "london", label: "London"},
    { value: "new york", label: "New York"}
  ];

  unitOptions: SwitchOption[] = [
    { value: "c", label: "Celsius"},
    { value: "f", label: "Fahrenheit"}
  ];

  constructor(props: ForecastProps) {
    super(props);
    this.state = {
      place: this.placeOptions[0],
      unit: this.unitOptions[0]
    };
  }

  componentDidMount() {
    this.props.onGetForecast(this.state.place.value, this.state.unit.value);
  }

  onSelectPlace(place: SwitchOption) {
    this.setState(
      { place: place },
      () => this.props.onGetForecast(this.state.place.value, this.state.unit.value)
    );
  }

  onSelectUnit(unit: SwitchOption) {
    this.setState({ unit: unit });
  }

  render() {

    return (
      <div className='forecast-container'>

        <div className='forecast-filter'>
          <Switch disabled={this.props.isBusy} options={this.placeOptions} selected={this.state.place} onSelectValue={(place: SwitchOption) => this.onSelectPlace(place)}/>
          <Switch disabled={this.props.isBusy} options={this.unitOptions} selected={this.state.unit} onSelectValue={(unit: SwitchOption) => this.onSelectUnit(unit)}/>
        </div>

        <div className={'forecast-days'}>

          { this.props.isBusy ? (<div className={'forecast-days-overlay'}>
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>) : undefined}

          { this.props.forecast && this.props.forecast.slice(0,3).map((dayForecast: DayForecast, index: number) => {
            return (<ForecastDay key={index} forecast={dayForecast} unit={this.state.unit.value}/>);
          })}
        </div>
      </div>
    );
  }

};

export default Forecast;