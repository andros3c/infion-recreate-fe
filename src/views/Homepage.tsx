
import { Flex } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import { FilterAndCategory } from "../componentPage/FilterAndCategory";
import { HomePageView } from "../componentPage/HomePageView";
import SideBar, { SIDEBAR_POSITION } from "../components/SideBar";

const HomePage = () => {
  return (
    <Flex
      w="100%"
      h="100vh"
      bgColor={"#EBEBEB"}
      position={"relative"}
      gap="1em"
      overflow={"hidden"}
      pb="4em"
    >
      <NavigationBar />

      <FilterAndCategory />
      <HomePageView />
      <SideBar w="20%" position={SIDEBAR_POSITION.RIGHT} />
    </Flex>
  );
};
export default HomePage;
