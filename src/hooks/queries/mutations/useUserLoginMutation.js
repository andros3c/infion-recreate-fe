import { useRequest } from "@/contexts/request";
import { useMutateData } from "@/utils/useDataQuery";

export const useUserLoginMutation = ({ config }) => {
  const { post } = useRequest();

  const loginUser = async ({ identifier, password }) => {
    const STATION_HOSTNAME = window.location.hostname;
    const validator = (identifier) =>
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(identifier)
        ? { email: identifier }
        : { username: identifier };
    const data = validator(identifier);
    try {
      const response = await post(
        `http://${STATION_HOSTNAME}:8000/user/login`,
        {
          json: {
            ...data,
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
  return useMutateData(loginUser, {
    ...config,
  });
};
