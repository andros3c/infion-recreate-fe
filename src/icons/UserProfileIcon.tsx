"use client";

import { Circle, Flex, Icon } from "@chakra-ui/react";
import Image from "next/image";
import { MdPerson } from "react-icons/md";
import { colors } from "../theme/foundations/colors";
import { getUserInfo } from "../utils/tokenHelper";

export const UserProfileIcon = () => {
  const { userInfo: { url_img = "" } = {} } = getUserInfo() || {};
  return (
    <Circle size="35px" bg={colors.myColor.black[200]} color="white">
      {url_img ? (
        <Flex overflow={"hidden"} borderRadius={"full"}>
          <Image width={35} height={35} src={url_img} alt="profile-picture" />
        </Flex>
      ) : (
        <Icon as={MdPerson} w="25px" h="25px" />
      )}
    </Circle>
  );
};
