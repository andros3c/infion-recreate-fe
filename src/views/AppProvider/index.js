"use client";

import { AuthContextProvider } from "@/contexts/auth";
import { RequestContextProvider } from "@/contexts/request";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
