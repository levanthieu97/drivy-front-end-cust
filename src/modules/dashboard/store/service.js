import Service from 'core/service';

class dashboardService extends Service {
  async login(params) {
    return await this.post('/sign-in', params);
  }

  registerUser(params) {
    return this.post('/register', params);
  }

  getNameSetting(params) {
    return this.get('api/all/setting-name', params);
  }

  getDataProduct(params) {
    return this.get('api/products/random-product', params);
  }

  getCategory(params) {
    return this.get('api/category/all', params);
  }
}
export default dashboardService;
