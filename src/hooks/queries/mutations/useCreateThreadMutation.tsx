import { useRequest } from "../../../contexts/request";
import { useMutateData } from "../../../utils/useDataQuery";


export const useCreateThreadMutation = ({ config }) => {
  const { post } = useRequest();

  const postThread = async ({ category, content, user_id }) => {
    const STATION_HOSTNAME = window.location.hostname;
    user_id;
    try {
      const response = await post(
        `http://${STATION_HOSTNAME}:8000/threads/create`,
        {
          json: {
            category,
            content,
            user_id,
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
  return useMutateData(postThread, {
    ...config,
  });
};
