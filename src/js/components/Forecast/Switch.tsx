import * as React from 'react';
import {SwitchOption} from "gg-weather-models";

export interface SwitchProps {
  disabled: boolean;
  options: SwitchOption[],
  selected: SwitchOption,
  onSelectValue: (selected: SwitchOption) => void
}

export interface SwitchState {}

class Switch extends React.Component<SwitchProps, SwitchState>{

  constructor(props: SwitchProps) {
    super(props);
    this.state = {
      selected: props.selected
    };
  }

  selectOption(selected: SwitchOption) {
    if (this.props.selected.value !== selected.value && !this.props.disabled) {
      this.props.onSelectValue(selected);
    }
  }

  render() {
    let cls:string = 'switch' + (this.props.disabled ? ' disabled' : '');
    return (
      <div className={cls}>
        {this.props.options.map( (option: SwitchOption, index: number) => {
          let switchItemCls:string = 'switch-item' + (this.props.selected.value === option.value ? ' active' : '');
          return (
            <div key={index} className={switchItemCls} onClick={() => this.selectOption(option)}>
              {option.label}
            </div>
          );
        })}
      </div>
    );
  }

};

export default Switch;