import {
  SET_USER,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_ERROR,
  SET_MESSAGE,
  USER_ROLE,
  SET_SUCCESS
} from './types';
import dashboardService from 'modules/dashboard/store/service';
import ServiceToken from 'core/service';
import { ACCESS_TOKEN_KEY, USER, ROLE } from 'core/constants';
import {} from './types';
import router from 'router';
const service = new dashboardService();

export const login = async ({ commit }, payload) => {
  let resp = await service.login(payload);
  // console.log(resp.data.role);

  if (resp != null && resp.success) {
    if (resp.data.role === 'ROLE_SUPPLIER') {
      commit(AUTH_LOGOUT);
      localStorage.clear();
      ServiceToken.removeToken();
      router.push('/');
    } else {
      localStorage.setItem(ACCESS_TOKEN_KEY, resp.data.token);
      localStorage.setItem(ROLE, JSON.stringify(resp.data.role));
      localStorage.setItem(USER, JSON.stringify(resp.data.user_info));
      ServiceToken.setToken(resp.data.token);
      commit(SET_USER, resp.data.user_info);
      authSuccess({ commit }, resp.data.token);
      commit(USER_ROLE, resp.data.role);
      router.go(router.currentRoute);
    }
  } else {
    localStorage.clear();
    ServiceToken.removeToken();
    commit(AUTH_ERROR, false);
    commit(
      SET_MESSAGE,
      resp == null
        ? 'Can not connect to server. Please check your network!'
        : resp.message
    );
  }

  return resp;
};

export const authSuccess = ({ commit }, token) => {
  commit(AUTH_SUCCESS, { token });
};

export const logout = ({ commit }) => {
  return new Promise(resolve => {
    commit(AUTH_LOGOUT);
    localStorage.clear();
    ServiceToken.removeToken();
    router.push('/');
    resolve();
  });
};

export const registerUser = async ({ commit }, param) => {
  const resp = await service.registerUser(param);
  commit(SET_MESSAGE, resp.message);
  commit(SET_SUCCESS, resp.success);
  if (resp.data.success) {
    router.go(router.currentRoute);
  } else {
    router.push('/');
  }
};

export const getNameCateSetting = async (dispatch, params) => {
  const result = await service.getNameSetting(params);
  return result;
};

export const getInfoProduct = async (dispatch, params) => {
  const result = await service.getDataProduct(params);
  return result;
};

export const listCategory = async (dispatch, params) => {
  const result = await service.getCategory(params);
  return result;
};
