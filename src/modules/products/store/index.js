import * as getters from './getters';
import * as actions from './actions';
import { SET_MESSAGE, SET_SUCCESS, PRODUCT_ID, ORDER_ID } from './types';
import { PRODUCTID, ORD } from 'core/constants';

const state = {
  message: '',
  success: false,
  signal: false,
  productId: JSON.parse(localStorage.getItem(PRODUCTID)),
  orderIdOfUser: JSON.parse(localStorage.getItem(ORD))
};

const mutations = {
  [SET_MESSAGE](state, message) {
    state.message = message;
    state.signal = !state.signal;
  },

  [SET_SUCCESS](state, res) {
    state.success = res;
  },

  [PRODUCT_ID](state, productId) {
    state.productId = productId;
  },

  [ORDER_ID](state, orderIdOfUser) {
    state.orderIdOfUser = orderIdOfUser;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
