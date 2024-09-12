import { QUERY_KEY_CONSTANTS } from "@/constants/queryKey";
import { useRequest } from "@/contexts/request";
import { useFetchData } from "@/utils/useDataQuery";

export const useFetchThreadQuery = ({ userId }) => {
  
  const STATION_HOSTNAME = window.location.hostname;
  const { get } = useRequest();
  const getThreads = async () => {
    try {
      const { data } = await get(
        `http://${STATION_HOSTNAME}:8000/threads/list`
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  return useFetchData(
    [QUERY_KEY_CONSTANTS.GET_THREADS_LIST, userId],
    getThreads
  );
};
