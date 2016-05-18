/*eslint no-unused-vars: 0*/ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/adverts';
import * as types from 'constants';
import Immutable from 'immutable';

import { SubmissionError } from 'redux-form';

polyfill();

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('Advert Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('dispatches request and success actions when status is 200', done => {
      const advert = {
        title: 'Jakiś tytuł'
      };

      const initialState = {};

      const expectedActions = [
        {
          type: types.ADD_ADVERT_REQUEST
        }, {
          type: types.ADD_ADVERT_SUCCESS,
          data: {
            advert: advert
          }
        }
      ];

      sandbox
        .stub(axios, "post")
        .returns(Promise.resolve({ status: 200, data: advert }));

      const store = mockStore(initialState);

      store.dispatch(actions.addAdvert(advert))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .then(done)
        .catch(done);
    });
  });
});
