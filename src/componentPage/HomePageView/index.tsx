import { Flex } from "@chakra-ui/react";
import { ContentWrapper } from "../../components/ContentWrapper";
import { TextEditor } from "../../components/TextEditor";

export const HomePageView = () => {
  return (
    <Flex
      mt="4.5em"
      w="50%"
      h="100%"
      direction={"column"}
      gap="1em"
      overflow={"auto"}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none", // IE and Edge
        "scrollbar-width": "none", // Firefox
      }}
    >
      <TextEditor />
      <ContentWrapper />
    </Flex>
  );
};
