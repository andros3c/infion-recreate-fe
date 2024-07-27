"use client";

import {
  Circle,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Square,
  Text,
} from "@chakra-ui/react";
import { MdHome } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import { RiQuestionnaireFill } from "react-icons/ri";
import { MdSearch } from "react-icons/md";
import { BsBookmarkFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import Image from "next/image";
import { colors } from "@/theme/foundations/colors";

const NavigationBar = () => {
  return (
    <Flex w="100%" h="4em" bgColor={"white"} position="absolute" zIndex={45}>
      <Flex h="100%%" w="100%" px="135px" alignItems="center">
        <Flex w="100%" h="100%%">
          <Flex w="10%" h="100%" alignItems="center">
            <Image
              src={"/infion-small-logo.svg"}
              width={80}
              alt="infion-small-logo"
              height={20}
            />
          </Flex>
          <Flex w="40%" justifyContent="space-evenly" alignItems="center">
            <Flex p=".25em" bgColor={"primary"} borderRadius={"8px"}>
              <Icon as={MdHome} w="25px" h="25px" color="white" />
            </Flex>
            <Flex p=".25em" borderRadius={"8px"}>
              <Icon
                as={MdExplore}
                w="25px"
                h="25px"
                color={colors.myColor.black[200]}
              />
            </Flex>
            <Flex p=".25em" borderRadius={"8px"}>
              <Icon
                as={RiQuestionnaireFill}
                w="25px"
                h="25px"
                color={colors.myColor.black[200]}
              />
            </Flex>
            <Flex p=".40em" borderRadius={"8px"}  >
              <Icon
                as={BsBookmarkFill}
                w="20px"
                h="20px"
                color={colors.myColor.black[200]}
              />
            </Flex>
          </Flex>
          <Flex w="25%" alignItems="center">
            <InputGroup w={"100%"}>
              <InputLeftElement>
                <Icon as={MdSearch} w="20px" h="20px" />
              </InputLeftElement>
              <Input placeholder="Search Something" />
            </InputGroup>
          </Flex>
          <Flex w="25%" justifyContent={"space-evenly"} alignItems={"center"}>
            <Flex position="relative" w="10%">
              <Icon
                as={IoMdNotifications}
                w="30px"
                h="30px"
                color={colors.myColor.black[200]}
              />
              <Square
                size="15px"
                color="white"
                bg="red"
                position="absolute"
                top={0}
                right={0}
              >
                <Text>4</Text>
              </Square>
            </Flex>
            <Flex gap="1em" alignItems={"center"} w="70%">
              <Circle size="35px" bg={colors.myColor.black[200]} color="white">
                <Icon as={MdPerson} w="25px" h="25px" />
              </Circle>

              <Flex direction="column">
                <Text fontWeight={"bold"}>Yesaya Alehandro</Text>
                <Text fontSize={"smaller"}>see your profile</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default NavigationBar;
