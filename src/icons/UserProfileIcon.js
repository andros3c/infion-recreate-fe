"use client"
import { colors } from "@/theme/foundations/colors";
import { Circle, Icon } from "@chakra-ui/react";
import { MdPerson } from "react-icons/md";

export const UserProfileIcon = () => {
  return (
    <Circle size="35px" bg={colors.myColor.black[200]} color="white">
      <Icon as={MdPerson} w="25px" h="25px" />
    </Circle>
  );
};
