import CartService from './service';
const service = new CartService();

export const getProduct = async (dispatch, param) => {
  const result = await service.getCartProduct(param);

  return result;
};

export const getProductDetail = async (dispatch, param) => {
  const result = await service.getCartProductDetail(param);
  return result;
};

export const deleteProductFromCart = async (dispatch, param) => {
  const result = await service.removeProductFromCart(param);
  return result;
};
