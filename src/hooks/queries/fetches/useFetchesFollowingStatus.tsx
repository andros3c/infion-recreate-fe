import { QUERY_KEY_CONSTANTS } from "../../../constants/queryKey";
import { useRequest } from "../../../contexts/request";
import { useFetchData } from "../../../utils/useDataQuery";


export const useFetchesFollowingStatus = ({ userId, followUserId, config }) => {
  
  const STATION_HOSTNAME = window.location.hostname;
  const { get } = useRequest();
  const getStatus = async () => {
    try {
      const { data } = await get(
        `http://${STATION_HOSTNAME}:8000/followUser/status`,
        {
          searchParams: {
            user_id: userId,
            follow_user_id: followUserId,
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  return useFetchData(
    [QUERY_KEY_CONSTANTS.GET_FOLLOWING_STATUS, { userId, followUserId }],
    getStatus,
    {
      ...config,
    }
  );
};
