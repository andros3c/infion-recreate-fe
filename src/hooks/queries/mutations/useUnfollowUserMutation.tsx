import { useRequest } from "../../../contexts/request";
import { useMutateData } from "../../../utils/useDataQuery";

export const useUnfollowUserMutation = ({ config }) => {
  const { put } = useRequest();
  const unfollowUser = async ({ userId, followUserId }) => {
    config;
    const STATION_HOSTNAME = window.location.hostname;

    try {
      const response = await put(
        `http://${STATION_HOSTNAME}:8000/followUser/unfollow`,
        {
          searchParams: {
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
  return useMutateData(unfollowUser, {
    ...config,
  });
};
