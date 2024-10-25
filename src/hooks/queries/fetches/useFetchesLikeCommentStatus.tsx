import { QUERY_KEY_CONSTANTS } from "../../../constants/queryKey";
import { useRequest } from "../../../contexts/request";
import { useFetchData } from "../../../utils/useDataQuery";

export const useFetchesLikeCommentStatus = ({
  user_id,
  threads_id,
  comment_id,
  parent_id,
  config,
}) => {
  const STATION_HOSTNAME = window.location.hostname;
  const { get } = useRequest();
  const getCommentLikeStatus = async () => {
    try {
      const { data } = await get(
        `http://${STATION_HOSTNAME}:8000/threads/comments/likeStatus/`,
        {
          searchParams: {
            user_id,
            threads_id,
            comment_id,
            ...(parent_id !== undefined && { parent_id }),
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  const isCommentReplyLike = parent_id
    ? QUERY_KEY_CONSTANTS.GET_COMMENTS_LIKE_STATUS
    : QUERY_KEY_CONSTANTS.GET_COMMENTS_REPLY_LIKE_STATUS;

  return useFetchData(
    [isCommentReplyLike, { user_id, threads_id, comment_id, parent_id }],
    getCommentLikeStatus,
    {
      ...config,
    }
  );
};
