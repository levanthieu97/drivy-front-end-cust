import checkOutService from './service';

const service = new checkOutService();

export const insertAddress = async (dispatch, param) => {
  const result = await service.createAddress(param);
  return result;
};

export const getCity = async (dispatch, param) => {
  const result = await service.getListCity(param);
  return result;
};

export const updateOrderUser = async (dispatch, param) => {
  const result = await service.updateOrder(param);
  return result;
};

export const renewOrders = async (dispatch, param) => {
  const result = await service.renewOrderForUser(param);
  return result;
};

export const createPaymentForUser = async (dispatch, param) => {
  const result = await service.createPayment(param);
  return result;
};

export const updateProduct = async (dispatch, param) => {
  const result = await service.updateQuantityProduct(param);
  return result;
};

export const updateProductDetail = async (dispatch, param) => {
  const result = await service.updateQuantityProductDetail(param);
  return result;
};

export const addPaymentSuppliers = async (dispatch, param) => {
  const result = await service.addPaymentSupplier(param);
  return result;
};
