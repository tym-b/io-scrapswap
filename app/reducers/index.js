import { combineReducers } from 'redux';
import user from 'reducers/user';
import advert from 'reducers/advert';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  advert,
  routing
});

export default rootReducer;
