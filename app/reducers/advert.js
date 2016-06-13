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
  EDIT_ADVERT_REQUEST,
  EDIT_ADVERT_FAILURE,
  EDIT_ADVERT_SUCCESS,
  TOGGLE_ADVERT_DIALOG,
  ADVERTS_SEARCH_QUERY,
  CONFIRM_DELETE_ADVERT,
  TOGGLE_ADVERT
} from 'constants/index';

const initialState = Immutable.fromJS({
  pending: false,
  adverts: [],
  confirmDelete: null,
  dialogOpen: false,
  searchQuery: ''
});

export default function advert(state = initialState, action) {
  switch (action.type) {
    case GET_ADVERTS_REQUEST:
      return state.set('pending', true);
      
    case GET_ADVERTS_SUCCESS:
      return state.set('pending', false).set('adverts', Immutable.fromJS(action.req.data.map(a => {
        a.expanded = false;
        return a;
      })));

    case GET_ADVERTS_FAILURE:
      return state.set('pending', false);

    case ADD_ADVERT_REQUEST:
      return state.set('pending', true);

    case ADD_ADVERT_FAILURE:
      return state.set('pending', false);

    case ADD_ADVERT_SUCCESS:
      return state.set('pending', false)
                  .updateIn(['adverts'], adverts => adverts.push(Immutable.fromJS(action.data.advert)).sort((a1, a2) => new Date(a1.get('date')) > new Date(a2.get('date')) ? -1 : 1));

    case REMOVE_ADVERT_REQUEST:
      return state.set('pending', true);

    case REMOVE_ADVERT_FAILURE:
      return state.set('pending', false)
                  .set('confirmDelete', null);

    case REMOVE_ADVERT_SUCCESS:
      return state.set('pending', false)
                  .updateIn(['adverts'], adverts => adverts.remove(adverts.findIndex(advert => advert.get('_id') === state.get('confirmDelete')._id)))
                  .set('confirmDelete', null);

    case EDIT_ADVERT_REQUEST:
      return state.set('pending', true);

    case EDIT_ADVERT_FAILURE:
      return state.set('pending', false);

    case EDIT_ADVERT_SUCCESS:
      return state.set('pending', false)
                  .set('dialogOpen', false)
                  .updateIn(['adverts'], adverts => adverts.update(adverts.findIndex(advert => advert.get('_id') === action.data.advert._id), advert => Immutable.fromJS(action.data.advert)));

    case TOGGLE_ADVERT_DIALOG:
      return state.set('dialogOpen', typeof action.data.open === 'undefined' ? !state.get('dialogOpen') : action.data.open);

    case ADVERTS_SEARCH_QUERY:
      return state.set('searchQuery', action.data.value);

    case CONFIRM_DELETE_ADVERT:
      return state.set('confirmDelete', action.data.advert);

    case TOGGLE_ADVERT:
      return state.updateIn(['adverts'], adverts => {
        return adverts.map(advert => {
          if (advert.get('_id') === action.data.advert._id) {
            return advert.set('expanded', typeof action.data.open === 'undefined' ? !advert.get('expanded') : action.data.open);
          }
          return advert.set('expanded', false);
        });
      });

    default:
      return state;
  }
}
