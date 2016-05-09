import { combineReducers } from 'redux';
import user from 'reducers/user';
import layout from 'reducers/layout';
import advert from 'reducers/advert';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  user,
  layout,
  advert,
  routing
});

export default rootReducer;
