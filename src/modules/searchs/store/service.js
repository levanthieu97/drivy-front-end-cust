import Service from 'core/service';

class searchService extends Service {
  listProductSearch(params) {
    return this.get(
      'api/products/product-name?productName=' + params.productName
    );
  }
}
export default searchService;
