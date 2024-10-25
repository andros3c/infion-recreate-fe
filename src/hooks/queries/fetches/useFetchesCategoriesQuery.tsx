import { QUERY_KEY_CONSTANTS } from "../../../constants/queryKey";
import { useRequest } from "../../../contexts/request";
import { useFetchData } from "../../../utils/useDataQuery";

export const useFetchesCategoriesQuery = ({ config }:{config:object}) => {
  const STATION_HOSTNAME = window.location.hostname;
  const { get } = useRequest();
  const getCategories = async () => {
    try {
      const { data } = await get(`http://${STATION_HOSTNAME}:8000/category/`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return useFetchData(QUERY_KEY_CONSTANTS.GET_CATEGORIES_LIST, getCategories, {
    ...config,
  });
};
