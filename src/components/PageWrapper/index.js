import { Flex } from "@chakra-ui/react";
const PageWrapper = ({ children }) => {
  return (
    <Flex h="100vh" w="100%" px="135px">
      {children}
    </Flex>
  );
};

export default PageWrapper;
