"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RequestContextProvider } from "../../contexts/request";
import { AuthContextProvider } from "../../contexts/auth";
import theme from "../../theme";

export const AppProvider = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RequestContextProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </RequestContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
