import Service from 'core/service';

class cartService extends Service {
  getCartProduct(params) {
    return this.get('api/shopping-cart/product-cart/' + params.orderId);
  }

  getCartProductDetail(params) {
    return this.get('api/shopping-cart/product-detail-cart/' + params.orderId);
  }

  removeProductFromCart(params) {
    return this.delete(
      'api/order-product/remove-product?orderItemId=' + params.orderItemId
    );
  }
}

export default cartService;
