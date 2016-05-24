import Immutable from 'immutable';

import {
  GET_ADVERTS_REQUEST,
  GET_ADVERTS_SUCCESS,
  GET_ADVERTS_FAILURE,
  ADD_ADVERT_REQUEST,
  ADD_ADVERT_FAILURE,
  ADD_ADVERT_SUCCESS,
  REMOVE_ADVERT_REQUEST,
  REMOVE_ADVERT_FAILURE,
  REMOVE_ADVERT_SUCCESS,
  TOGGLE_ADVERT_DIALOG,
  ADVERTS_SEARCH_QUERY,
  CONFIRM_DELETE_ADVERT
} from 'constants/index';

const initialState = Immutable.fromJS({
  pending: false,
  adverts: [],
  dialogOpen: false,
  searchQuery: '',
  confirmDelete: null
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
      return state.set('pending', false)
                  .updateIn(['adverts'], adverts => adverts.push(action.data.advert).sort((a1, a2) => new Date(a1.date) < new Date(a2.date) ? -1 : 1));

    case REMOVE_ADVERT_REQUEST:
      return state.set('pending', true);

    case REMOVE_ADVERT_FAILURE:
      return state.set('pending', false);

    case REMOVE_ADVERT_SUCCESS:
      return state.set('pending', false)
                  .updateIn(['adverts'], adverts => adverts.remove(adverts.indexOf(state.get('confirmDelete'))))
                  .set('confirmDelete', null);

    case TOGGLE_ADVERT_DIALOG:
      return state.set('dialogOpen', action.data.open || !state.get('dialogOpen'));

    case ADVERTS_SEARCH_QUERY:
      return state.set('searchQuery', action.data.value);

    case CONFIRM_DELETE_ADVERT:
      return state.set('confirmDelete', action.data.advert);

    default:
      return state;
  }
}
