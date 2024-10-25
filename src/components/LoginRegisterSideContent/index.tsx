import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

export const LoginRegisterSideContent = () => {
  return (
    <Flex w="45%" alignItems={"center"}>
      <Flex
        w="100%"
        justifyContent={"center"}
        align="center"
        direction={"column"}
        gap=".7em"
      >
        <Image
          src={"/infion-big-logo.svg"}
          alt="infion-big-logo"
          width={270}
          height={270}
        />
        <Flex p=".3em" bgColor="secondary">
          <Text fontSize={"larger"} letterSpacing=".25em">
            Infinity Discussion
          </Text>
        </Flex>
        <Flex w="50%" px="2.5em">
          <Text align="justify" fontSize="smaller">
            Welcome to Infion, place where you can express your idea to large
            count of people
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
