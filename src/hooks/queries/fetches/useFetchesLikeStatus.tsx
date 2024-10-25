import { QUERY_KEY_CONSTANTS } from "../../../constants/queryKey";
import { useRequest } from "../../../contexts/request";
import { useFetchData } from "../../../utils/useDataQuery";

export const useFetchesLikeStatus = ({ user_id, threads_id, config }) => {
  const STATION_HOSTNAME = window.location.hostname;
  const { get } = useRequest();
  const getStatus = async () => {
    try {
      const { data } = await get(
        `http://${STATION_HOSTNAME}:8000/likeThreads/status`,
        {
          searchParams: {
            user_id,
            threads_id,
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  return useFetchData(
    [QUERY_KEY_CONSTANTS.GET_LIKE_STATUS, { user_id, threads_id }],
    getStatus,
    {
      ...config,
    }
  );
};
