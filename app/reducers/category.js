import Immutable from 'immutable';

import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE
} from 'constants/index';

const initialState = Immutable.fromJS({
  pending: false,
  categories: []
});

export default function advert(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return state.set('pending', true);
      
    case GET_CATEGORIES_SUCCESS:
      return state.set('pending', false).set('categories', Immutable.fromJS(action.req.data));

    case GET_CATEGORIES_FAILURE:
      return state.set('pending', false);

    default:
      return state;
  }
}
