import confirmOrderService from './service';

const service = new confirmOrderService();

export const getPaymentById = async (dispatch, param) => {
  const result = await service.getPaymentId(param);
  return result;
};

export const infoPayment = async (dispatch, param) => {
  const result = await service.getInfoPayment(param);
  return result;
};

export const confirmBuyProduct = async (dispatch, param) => {
  const result = await service.confirmBill(param);
  return result;
};
