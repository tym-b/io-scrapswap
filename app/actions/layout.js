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

export function switchLogin() {
  return {
    type: types.LAYOUT_SWITCH_LOGIN
  };
}

export function switchRegister() {
  return {
    type: types.LAYOUT_SWITCH_REGISTER
  };
}

export function setSnackbarInfo(info = '') {
  return {
    type: types.LAYOUT_SET_SNACKBAR_INFO,
    data: {
      info: info
    }
  };
}
