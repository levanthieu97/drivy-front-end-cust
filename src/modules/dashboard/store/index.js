import {
  SET_USER,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  SET_MESSAGE,
  USER_ROLE,
  SET_SUCCESS
} from './types';

// import menus from './menus';

import * as getters from './getters';
import * as actions from './actions';
import { ACCESS_TOKEN_KEY, USER, ROLE } from 'core/constants';

const state = {
  user: JSON.parse(localStorage.getItem(USER)),
  token: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
  hasLoadedOnce: true,
  message: '',
  success: false,
  signal: false,
  role: JSON.parse(localStorage.getItem(ROLE))
};

const mutations = {
  [USER_ROLE](state, role) {
    state.role = role;
  },

  [SET_USER](state, user) {
    state.user = user || {};
  },

  [AUTH_SUCCESS](state, resp) {
    state.token = resp.token;
    state.hasLoadedOnce = true;
  },

  [AUTH_ERROR](state, resp) {
    state.hasLoadedOnce = resp;
  },

  [AUTH_LOGOUT](state) {
    state.token = '';
  },

  [SET_MESSAGE](state, message) {
    state.message = message;
    state.signal = !state.signal;
  },

  [SET_SUCCESS](state, res) {
    state.success = res;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
