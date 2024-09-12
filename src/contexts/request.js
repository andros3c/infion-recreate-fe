import { getToken } from "@/utils/tokenHelper";
import ky from "ky";
import { createContext, useContext } from "react";

const RequestContext = createContext();
// request timeout unit is always millisecond
const defaultRequestTimeout = 1000 * 60 * 30;
const RequestContextProvider = ({ children }) => {
  const post = async (url, payload) => {
    try {
      const response = await ky.post(url, {
        headers: { Authorization: `Bearer ${getToken()}` },
        ...payload,
      });
      return await response.json();
    } catch (error) {
      if (error.response) {
        // Create a structured error object to throw
        const errorDetails = {
          status: error.response.status,
          body: await error.response.json(),
        };
        throw errorDetails;
      } else {
        throw error; // Re-throw the original error if it doesn't have a response
      }
    }
  };
  const put = async (url, payload) => {
    try {
      const response = await ky.put(url, {
        ...payload,
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return await response.json();
    } catch (error) {
      if (error.response) {
        // Create a structured error object to throw
        const errorDetails = {
          status: error.response.status,
          body: await error.response.json(),
        };
        throw errorDetails;
      } else {
        throw error; // Re-throw the original error if it doesn't have a response
      }
    }
  };
  const get = async (url, payload) => {
    try {
      const response = await ky.get(url, {
        ...payload,
        headers: { Authorization: `Bearer ${getToken()}` },
        timeout: defaultRequestTimeout,
      });
      return await response.json();
    } catch (error) {
      if (error.response) {
        // Create a structured error object to throw
        const errorDetails = {
          status: error.response.status,
          body: await error.response.json(),
        };
        throw errorDetails;
      } else {
        throw error; // Re-throw the original error if it doesn't have a response
      }
    }
  };
  return (
    <RequestContext.Provider value={{ post, get, put }}>
      {children}
    </RequestContext.Provider>
  );
};

const useRequest = () => {
  const state = useContext(RequestContext);
  return state;
};

export { RequestContextProvider, useRequest };
