/*eslint no-unused-vars: 0*/ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/users';
import * as types from 'constants';
import Immutable from 'immutable';

import { SubmissionError } from 'redux-form';

polyfill();

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('User Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('user signs in when status is 200', done => {
      const userData = {
        email: 'jan@kowalski.pl'
      };

      const initialState = {};

      const expectedActions = [
        {
          type: types.LOGIN_REQUEST
        }, {
          type: types.LOGIN_SUCCESS,
          data: {
            user: userData
          }
        }
      ];

      sandbox
        .stub(axios, 'post')
        .returns(Promise.resolve({ status: 200, data: userData }));

      const store = mockStore(initialState);

      store.dispatch(actions.login(userData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .then(done)
        .catch(done);
    });
  });
});
