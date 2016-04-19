import {
  GET_ADVERTS_REQUEST,
  GET_ADVERTS_SUCCESS,
  GET_ADVERTS_FAILURE
} from 'constants';

export default function advert(state = {
  adverts: []
}, action) {
  switch (action.type) {
    case GET_ADVERTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_ADVERTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        adverts: action.req.data
      });
    case GET_ADVERTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
