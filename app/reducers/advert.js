import Immutable from 'immutable';

import {
  GET_ADVERTS_REQUEST,
  GET_ADVERTS_SUCCESS,
  GET_ADVERTS_FAILURE,
  ADD_ADVERT_REQUEST,
  ADD_ADVERT_FAILURE,
  ADD_ADVERT_SUCCESS,
  TOGGLE_ADVERT_DIALOG
} from 'constants/index';

const initialState = Immutable.fromJS({
  pending: false,
  adverts: [],
  dialogOpen: false
});

export default function advert(state = initialState, action) {
  switch (action.type) {
    case GET_ADVERTS_REQUEST:
      return state.set('pending', true);
      
    case GET_ADVERTS_SUCCESS:
      return state.set('pending', false).set('adverts', Immutable.fromJS(action.req.data));

    case GET_ADVERTS_FAILURE:
      return state.set('pending', false);

    case ADD_ADVERT_REQUEST:
      return state.set('pending', true);

    case ADD_ADVERT_FAILURE:
      return state.set('pending', false);

    case ADD_ADVERT_SUCCESS:
      return state.set('pending', false).updateIn(['adverts'], a => a.push(action.data.advert));

    case TOGGLE_ADVERT_DIALOG:
      return state.set('dialogOpen', action.data.open || !state.get('dialogOpen'));

    default:
      return state;
  }
}
