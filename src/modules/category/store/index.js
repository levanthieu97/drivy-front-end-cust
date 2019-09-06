import * as getters from './getters';
import * as actions from './actions';
import { SET_MESSAGE, SET_SUCCESS } from './types';

const state = {
  message: '',
  success: false,
  signal: false
};

const mutations = {
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
