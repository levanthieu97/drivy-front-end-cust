import { SET_MESSAGE, SET_SUCCESS } from './types';
import CategoryService from './service';

const service = new CategoryService();

export const listProductSetting = async ({ commit }, param) => {
  const result = await service.getListProductFromSetting(param);
  commit(SET_MESSAGE, result.message);
  commit(SET_SUCCESS, result.success);
  return result;
};

export const listSettingDetail = async (dispatch, param) => {
  const result = await service.getListSettingDetail(param);
  return result;
};

export const suggestScrums = async (dispatch, param) => {
  const result = await service.getScrums(param);
  return result;
};
