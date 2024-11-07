import { useRequest } from "../../../contexts/request";
import { useMutateData } from "../../../utils/useDataQuery";

export const useFollowUserMutation = ({ config }) => {
  const { post } = useRequest();
  const followUser = async ({ userId, followUserId }) => {
    const STATION_HOSTNAME = window.location.hostname;
    config;
    try {
      const response = await post(
        `http://${STATION_HOSTNAME}:8000/followUser/follow`,
        {
          json: {
            user_id: userId,
            follow_user_id: followUserId,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Registration error:", error);

      // Extract and log the specific error messages
      const errorMessage = error.meta?.messages?.[0] || "Unknown error";
      console.error("Registration error message:", errorMessage);

      // Throw the error to be handled by the mutation's onError config
      throw error;
    }
  };
  return useMutateData(followUser, {
    ...config,
  });
};
