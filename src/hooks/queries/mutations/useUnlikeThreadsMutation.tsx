import { useRequest } from "../../../contexts/request";
import { useMutateData } from "../../../utils/useDataQuery";

export const useUnlikeThreadsMutation = ({ config }) => {
  const { put } = useRequest();
  const unlikeThreads = async ({ user_id, threads_id }) => {
    const STATION_HOSTNAME = window.location.hostname;
    config;
    try {
      const response = await put(
        `http://${STATION_HOSTNAME}:8000/likeThreads/unlike`,
        {
          searchParams: {
            user_id,
            threads_id,
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
  return useMutateData(unlikeThreads, {
    ...config,
  });
};
