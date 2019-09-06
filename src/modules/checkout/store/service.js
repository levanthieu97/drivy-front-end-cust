import Service from 'core/service';

class checkOutService extends Service {
  createAddress(params) {
    return this.post('api/address/add-address', params.addressAndPayment);
  }

  getListCity(params) {
    return this.get('api/address/city', params);
  }

  updateOrder(params) {
    return this.put(
      'api/shopping-cart/update-orders?orderId=' + params.orderId
    );
  }

  renewOrderForUser(params) {
    return this.post('api/shopping-cart/renew-order?userId=' + params.userId);
  }

  createPayment(params) {
    return this.post('api/payment/create-payment' + params.payment);
  }

  updateQuantityProduct(params) {
    return this.put('api/products/update-quantity', params.products);
  }

  updateQuantityProductDetail(params) {
    return this.put(
      'api/products/update-quantity-detail',
      params.productDetails
    );
  }

  addPaymentSupplier(params) {
    return this.post('api/payment/payment-supplier' + params.element);
  }
}

export default checkOutService;
