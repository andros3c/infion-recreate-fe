import { FilterAndCategory } from "@/componentPage/FilterAndCategory";
import NavigationBar from "@/components/NavigationBar";
import { Flex } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Flex w="100%" h="100vh" bgColor={"#EBEBEB"} position={"relative"}>
      <NavigationBar />
      <FilterAndCategory />
    </Flex>
  );
};
export default HomePage;
