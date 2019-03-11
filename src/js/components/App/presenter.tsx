import * as React from 'react';
import {Route, Switch} from "react-router-dom";

import Forecast from "../Forecast";

export interface AppProps {
}

class App extends React.Component <AppProps, {}> {

  constructor(props: AppProps) {
    super(props);
  }

  render() {

    return (
      <div className='app-container'>
        <Switch>
          <Route exact path="/" component={Forecast} />
        </Switch>
      </div>
    );
  }
}

export default App;