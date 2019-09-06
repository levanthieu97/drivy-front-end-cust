import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

import global from 'modules/global/store';
import dashboard from 'modules/dashboard/store';

import STORES from './newstore';

Vue.use(Vuex);

const DEFAULT_STORES = {
  global,
  dashboard
};

const modules = _.cloneDeep(DEFAULT_STORES);
_.assign(modules, STORES);

export default new Vuex.Store({
  modules
});
