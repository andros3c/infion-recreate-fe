import { Flex } from "@chakra-ui/react";

export const SIDEBAR_POSITION = {
  lEFT: "left",
  RIGHT: "right",
};
const SideBar = ({ children, position, ...props }) => {
  const styleProp =
    position === SIDEBAR_POSITION.RIGHT
      ? { right: 0, mr: "135px" }
      : { ml: "135px" };
  return (
    <Flex
      position={"absolute"}
      w="15%"
      h="100%"
      {...styleProp}
      {...props}
      direction={"column"}
    >
      {children}
    </Flex>
  );
};
export default SideBar;
