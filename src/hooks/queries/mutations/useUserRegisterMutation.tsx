import { useRequest } from "../../../contexts/request";
import { useMutateData } from "../../../utils/useDataQuery";

export const useUserRegisterMutation = ({ config }) => {
  const { post } = useRequest();

  const registerUser = async ({ username, email, password }) => {
    const STATION_HOSTNAME = window.location.hostname;

    try {
      const response = await post(
        `http://${STATION_HOSTNAME}:8000/user/register`,
        {
          json: {
            username,
            email,
            password,
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
  return useMutateData(registerUser, {
    ...config,
  });
};
