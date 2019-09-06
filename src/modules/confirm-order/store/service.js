import Service from 'core/service';

class confirmOrderService extends Service {
  getPaymentId(params) {
    return this.get('api/payment/payment-code', params);
  }

  getInfoPayment(params) {
    return this.get('api/payment/info-payment?paymentId=' + params.paymentId);
  }

  confirmBill(params) {
    return this.post('api/mail/buy-product', params.mailBill);
  }
}

export default confirmOrderService;
