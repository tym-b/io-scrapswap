import { combineReducers } from 'redux-immutable';
import user from 'reducers/user';
import layout from 'reducers/layout';
import advert from 'reducers/advert';
import routing from 'reducers/routing';

const rootReducer = combineReducers({
  user,
  layout,
  advert,
  routing
});

export default rootReducer;
