import { QUERY_KEY_CONSTANTS } from "@/constants/queryKey";
import { useRequest } from "@/contexts/request";
import { useFetchData } from "@/utils/useDataQuery";

export const useFetchUserInfoById = ({ userId }) => {
  const STATION_HOSTNAME = window.location.hostname;
  const { get } = useRequest();
  const getUserInfo = async () => {
    try {
      const { data } = await get(
        `http://${STATION_HOSTNAME}:8000/user/${userId}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  return useFetchData(
    [QUERY_KEY_CONSTANTS.GET_USER_INFO, userId],
    getUserInfo
  );
};
