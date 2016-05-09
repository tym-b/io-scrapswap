import * as types from 'constants/index';

export function toggleLogin(open) {
  return {
    type: types.LAYOUT_TOGGLE_LOGIN,
    data: {
      open: open
    }
  };
}

export function toggleRegister(open) {
  return {
    type: types.LAYOUT_TOGGLE_REGISTER,
    data: {
      open: open
    }
  };
}
