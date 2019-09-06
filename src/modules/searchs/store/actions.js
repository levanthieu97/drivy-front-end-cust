import searchService from './service';

const service = new searchService();

export const listSearchProduct = async (dispatch, param) => {
  const result = await service.listProductSearch(param);
  return result;
};
