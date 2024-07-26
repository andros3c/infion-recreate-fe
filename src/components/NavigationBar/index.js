import { Flex, Icon } from "@chakra-ui/react";
import { MdHome } from "react-icons/md";
const NavigationBar = () => {
  return (
    <Flex w="100%">
      <Icon as={MdHome}></Icon>
    </Flex>
  );
};
export default NavigationBar;
