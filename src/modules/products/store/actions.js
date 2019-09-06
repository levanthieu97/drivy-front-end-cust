import productsService from './service';
import { ORD } from 'core/constants';
import { ORDER_ID } from './types';

const service = new productsService();

export const suggestCrums = async (dispatch, param) => {
  const result = await service.getScrumCategory(param);
  return result;
};

export const listImage = async (dispatch, param) => {
  const result = await service.getProductImage(param);
  return result;
};

export const getInfoProduct = async (dispatch, param) => {
  const result = await service.getProductDetail(param);
  return result;
};

export const getInfoProductByProductName = async (dispatch, param) => {
  const result = await service.getInfoProductByName(param);
  return result;
};

export const listCatalog = async (dispatch, param) => {
  const result = await service.getListCatalog(param);
  return result;
};

export const getSupplierInfo = async (dispatch, param) => {
  const result = await service.getSupplier(param);
  return result;
};

export const supplierProductDetail = async (dispatch, param) => {
  const result = await service.getSupplierProductDetail(param);
  return result;
};

export const addShoppingCart = async (dispatch, param) => {
  const result = await service.getShoppingCart(param);
  return result;
};

export const getInfoUserCart = async ({ commit }, param) => {
  const result = await service.getInfoCart(param);
  if (result.data !== null) {
    localStorage.setItem(ORD, JSON.stringify(result.data.order_id));
    commit(ORDER_ID, result.data.order_id);
  }
  return result;
};

export const checkInfoProduct = async (dispatch, param) => {
  const result = await service.checkProduct(param);
  return result;
};

export const updateQuantityShoppingCart = async (dispatch, param) => {
  const result = await service.updateQuantityCart(param);
  return result;
};

export const countNumberProduct = async (dispatch, param) => {
  const result = await service.countNumberCart(param);
  return result;
};
