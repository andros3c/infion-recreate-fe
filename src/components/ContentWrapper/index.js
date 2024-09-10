"use client";
import { useFetchThreadQuery } from "@/hooks/queries/fetches/useFetchThreadQuery";
import { UserProfileIcon } from "@/icons/UserProfileIcon";
import { Flex, Tag, Text } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { ContentHandler } from "../ContentHandler";
import { ConvertTimestampFormat } from "@/utils/timeStampConverter";
import { getUserInfo } from "@/utils/tokenHelper";
import { ThreadOwner } from "./ThreadOwner";
import { FollowingStatusBadge } from "./FollowingStatusBadge";

export const ContentWrapper = () => {
  const {
    userInfo: { id: userId },
  } = getUserInfo();

  const [listThread, setListThread] = useState([]);
  const { data = [] } = useFetchThreadQuery({ userId });
  const contentRefs = useRef([]); // Initialize as an array
  const [overflowStates, setOverflowStates] = useState([]);

  useEffect(() => {
    setListThread(data);
  }, [data]);

  useEffect(() => {
    // Update overflow states after refs are assigned and content is rendered
    const updatedOverflowStates = contentRefs.current.map((ref) =>
      ref ? ref.offsetHeight > 100 : false
    );
    setOverflowStates(updatedOverflowStates);
  }, [listThread]); // Dependency array ensures this runs after listThread is updated

  return (
    <>
      {listThread && listThread.length > 0 ? (
        listThread.map((data, idx) => {
          return (
            <Flex
              borderRadius={"19px"}
              p="1.5em"
              w="100%"
              bgColor={"white"}
              direction={"column"}
              gap=".5em"
              key={idx}
            >
              <Flex w="100%" gap="1em" alignItems={"center"}>
                <UserProfileIcon />
                <Flex direction={"column"}>
                  <Flex w="100%" gap=".15em" alignItems={"center"}>
                    <ThreadOwner userId={data.user_id} />
                    <FollowingStatusBadge
                      userId={userId}
                      followUserId={data.user_id}
                      alignSelf="start"
                      alignItems="center"
                    />
                  </Flex>

                  <Text>{ConvertTimestampFormat(data.created_at)}</Text>
                </Flex>
              </Flex>
              <Tag w="max-content">{data.category}</Tag>

              <ContentHandler
                content={data.content}
                ref={(el) => {
                  contentRefs.current[idx] = el; // Assign each DOM element to the ref array
                }}
                isContentOverflowing={overflowStates[idx]}
              />
            </Flex>
          );
        })
      ) : (
        <Flex
          borderRadius={"19px"}
          p="1.5em"
          w="100%"
          bgColor={"white"}
          justify={"center"}
        >
          No Threads to Show
        </Flex>
      )}
    </>
  );
};
