"use client";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCircle } from "react-icons/fa";

export const FilterAndCategoryWrapper = ({
  options = [],
  heading,
  isOpen,
  onToggle,
  theme,
  ...props
}) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const isSelected = (id) => id === selectedFilter;
  const isPrimaryTheme = theme === "primary";
  return (
    <Accordion
      allowToggle
      index={isOpen ? 0 : -1}
      {...props}
      maxH={"45%"}
      w="100%"
      bgColor={"white"}
      borderRadius={"19px"}
      py=".5em"
      overflow={"hidden"}
    >
      <AccordionItem border={"none"}>
        <Text fontWeight="bold">
          <AccordionButton onClick={onToggle}>
            {heading}
            <AccordionIcon />
          </AccordionButton>
        </Text>
        <Flex w="100%">
          <Flex>
            <AccordionPanel
              overflowY={"auto"}
              h="12em"
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
                "-ms-overflow-style": "none", // IE and Edge
                "scrollbar-width": "none", // Firefox
              }}
            >
              <List>
                {options.map((ele, idx) => {
                  const bgColor = isSelected(idx)
                    ? isPrimaryTheme
                      ? "primary"
                      : "secondary"
                    : "none";
                  const color = isSelected(idx)
                    ? isPrimaryTheme
                      ? "white"
                      : "none"
                    : "none";
                  return (
                    <ListItem
                      as={Flex}
                      key={idx}
                      gap=".20em"
                      alignItems={"center"}
                    >
                      <ListIcon
                        as={FaCircle}
                        color={isPrimaryTheme ? "secondary" : "primary"}
                      />
                      <Flex
                        w="100%"
                        h="100%"
                        p=".6em"
                        bgColor={bgColor}
                        color={color}
                        fontWeight={isSelected(idx) ? "bold" : "regular"}
                        onClick={() => setSelectedFilter(idx)}
                      >
                        {ele}
                      </Flex>
                    </ListItem>
                  );
                })}
              </List>
            </AccordionPanel>
          </Flex>
        </Flex>
      </AccordionItem>
    </Accordion>
  );
};
