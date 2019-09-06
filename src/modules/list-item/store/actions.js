import listItemService from './service';

const service = new listItemService();

export const suggestListItem = async (dispatch, param) => {
  const result = await service.suggestListCatalog(param);
  return result;
};

export const listProductDetail = async (dispatch, param) => {
  const result = await service.listProductFromCategoryDetail(param);
  return result;
};

export const suggestSupplier = async (dispatch, param) => {
  const result = await service.listSupplier(param);
  return result;
};
