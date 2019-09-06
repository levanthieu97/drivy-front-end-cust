import Service from 'core/service';

class productsService extends Service {
  getScrumCategory(params) {
    console.log('sadbsan');
    console.log(params);
    return this.get('api/suggest-category/product/' + params.productName);
  }

  getProductImage(params) {
    return this.get('api/image/product/' + params.productName);
  }

  getProductDetail(params) {
    return this.get('api/products/info-detail/' + params.productName);
  }

  getInfoProductByName(params) {
    return this.get('api/products/information-product/' + params.productName);
  }

  getListCatalog(params) {
    return this.get('api/catalog-product/' + params.productName);
  }

  getSupplier(params) {
    return this.get('api/supplier-product/' + params.productName);
  }

  getSupplierProductDetail(params) {
    return this.get(
      'api/supplier-product/' +
        params.productName +
        '/product?productDetailId=' +
        params.productDetailId
    );
  }

  getShoppingCart(params) {
    return this.post('api/order-product/order', params.orderProduct);
  }

  getInfoCart(params) {
    return this.get('api/shopping-cart/new-cart/' + params.userId);
  }

  checkProduct(params) {
    return this.post('api/order-product/check-product', params.orderProduct);
  }

  updateQuantityCart(params) {
    return this.put('api/order-product/update-quantity', params.orderProduct);
  }

  countNumberCart(params) {
    return this.get('api/order-product/count-cart?orderId=' + params.orderId);
  }
}
export default productsService;
