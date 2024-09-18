import { QUERY_KEY_CONSTANTS } from "@/constants/queryKey";
import { useRequest } from "@/contexts/request";
import { useFetchData } from "@/utils/useDataQuery";

export const useFetchesCommentReply = ({
  user_id,
  threads_id,
  parent_id,
  config,
}) => {
  const STATION_HOSTNAME = window.location.hostname;
  const { get } = useRequest();
  const getAllCommentReply = async () => {
    try {
      const { data } = await get(
        `http://${STATION_HOSTNAME}:8000/threads/commentsReply/?threads_id=${threads_id}&user_id=${user_id}&parent_id=${parent_id}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  return useFetchData(
    [QUERY_KEY_CONSTANTS.GET_COMMENTS_REPLIES, { threads_id }],
    getAllCommentReply,
    {
      ...config,
    }
  );
};
