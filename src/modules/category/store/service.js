import Service from 'core/service';

class categoryService extends Service {
  getListProductFromSetting(params) {
    return this.get('/api/products/list-setting-product/' + params.settingName);
  }

  getListSettingDetail(params) {
    return this.get('/api/all/name-setting-detail/' + params.settingName);
  }

  getScrums(params) {
    return this.get('api/all/scrums/' + params.settingName);
  }
}

export default categoryService;
