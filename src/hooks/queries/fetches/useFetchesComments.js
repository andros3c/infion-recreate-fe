import { QUERY_KEY_CONSTANTS } from "@/constants/queryKey";
import { useRequest } from "@/contexts/request";
import { useFetchData } from "@/utils/useDataQuery";

export const useFetchesComments=({config,threads_id})=>{
    const STATION_HOSTNAME = window.location.hostname;
    const { get } = useRequest();
    const getAllComments = async () => {
      try {
        const { data } = await get(
          `http://${STATION_HOSTNAME}:8000/threads/comments/all`,
          {
            searchParams: {
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
      [QUERY_KEY_CONSTANTS.GET_LIKE_STATUS, {  threads_id }],
      getAllComments,
      {
        ...config,
      }
    );
}