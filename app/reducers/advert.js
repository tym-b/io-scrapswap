import Immutable from 'immutable';

import {
  GET_ADVERTS_REQUEST,
  GET_ADVERTS_SUCCESS,
  GET_ADVERTS_FAILURE
} from 'constants/index';

const initialState = Immutable.fromJS({
  pending: false,
  adverts: []
});

export default function advert(state = initialState, action) {
  switch (action.type) {
    case GET_ADVERTS_REQUEST:
      return state.set('pending', false);
      
    case GET_ADVERTS_SUCCESS:
      return state.set('pending', false).set('adverts', action.req.data);

    case GET_ADVERTS_FAILURE:
      return state.set('pending', false);

    default:
      return state;
  }
}
