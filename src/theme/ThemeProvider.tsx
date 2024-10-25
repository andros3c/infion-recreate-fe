"use client";


import { ChakraProvider } from "@chakra-ui/react";
import theme from ".";

export const ThemeProvider = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
