import { Flex, Text } from "@chakra-ui/react";
import DOMPurify from "dompurify";
import { forwardRef, useState } from "react";

export const ContentHandler = forwardRef(
  ({ content, isContentOverflowing }, ref) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    const [contentHeight, setContentHeight] = useState("200px");
    const [visibility, setVisibility] = useState("visible");
    return (
      <>
        <Flex
          ref={ref} // Pass the ref to the Flex container
          p="1em"
          direction={"column"}
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          gap=".5em"
          h={isContentOverflowing ? contentHeight : "max-content"}
          overflow="hidden"
        />
        {isContentOverflowing ? (
          <Text
            textAlign={"center"}
            as={"a"}
            cursor={"pointer"}
            color={"primary"}
            onClick={() => {
              setContentHeight("max-content");
              setVisibility("hidden");
            }}
            fontSize={"small"}
            visibility={visibility}
          >
            show more...
          </Text>
        ) : (
          <></>
        )}
      </>
    );
  }
);

ContentHandler.displayName = "ContentHandler";
