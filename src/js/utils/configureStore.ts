import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'
import createRootReducer from '../stores/index';

export const history = createHashHistory();

const { NODE_ENV } = process.env;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore( initialState: any ) {
  return createStore(
    createRootReducer(history),
    initialState,
    ( NODE_ENV === 'production' || NODE_ENV === 'test' ) ? applyMiddleware( thunk, routerMiddleware(history)) : composeEnhancers( applyMiddleware( thunk, routerMiddleware(history)) )
  );
}
