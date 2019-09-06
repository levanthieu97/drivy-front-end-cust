import Service from 'core/service';

class listItemService extends Service {
  suggestListCatalog(params) {
    return this.get('api/cate-detail/suggestion/' + params.cateDetailsType);
  }

  listProductFromCategoryDetail(params) {
    return this.get('api/products/list-detail-product/' + params.typeDetail);
  }

  listSupplier(params) {
    return this.get(
      'api/cate-detail/' + params.cateDetailsType + '/list-supplier'
    );
  }
}

export default listItemService;
