import ky from "ky";
import { createContext, useContext } from "react";

const RequestContext = createContext();

const RequestContextProvider = ({ children }) => {
  const post = async (url, payload) => {
    try {
      const response = await ky.post(url, {
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
  return (
    <RequestContext.Provider value={{ post }}>
      {children}
    </RequestContext.Provider>
  );
};

const useRequest = () => {
  const state = useContext(RequestContext);
  return state;
};

export { RequestContextProvider, useRequest };
