"use client";
import { QUERY_KEY_CONSTANTS } from "@/constants/queryKey";
import { usePostCommentMutations } from "@/hooks/queries/mutations/usePostCommentMutations";
import { useCreateToast } from "@/hooks/useCreateToast";
import { UserProfileIcon } from "@/icons/UserProfileIcon";
import { ConvertTimestampFormat } from "@/utils/timeStampConverter";
import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

export const CommentsSection = ({
  commentsValue,
  setCommentsValue,
  userId,
  threadsId,
  commentsData,
}) => {
  const { createSuccessToast } = useCreateToast();
  const queryClient = useQueryClient();
  const { mutateAsync: handlePostComment } = usePostCommentMutations({
    config: {
      onSuccess: () => {
        createSuccessToast("commented");
        queryClient.refetchQueries([QUERY_KEY_CONSTANTS.GET_COMMENTS]);
        setCommentsValue("");
      },
    },
  });

  return (
    <Flex direction="column" gap=".5em">
      <Textarea
        value={commentsValue}
        onChange={(e) => setCommentsValue(e.target.value)}
        placeholder="write your comment here"
        size="sm"
        borderRadius={"10px"}
      />
      <Flex justifyContent={"end"}>
        <Button
          size={"sm"}
          variant={"light"}
          colorScheme={"yellow"}
          onClick={() => {
            handlePostComment({
              user_id: userId,
              threads_id: threadsId,
              comment: commentsValue,
            });
          }}
          isDisabled={commentsValue === ""}
        >
          Post Comment
        </Button>
      </Flex>
      <Flex direction={"column"} gap="1.25em">
        <Text fontWeight="bold" px=".5em">
          Comments
        </Text>
        {commentsData?.map((ele, idx) => {
          return (
            <Flex key={idx} direction="column" gap=".5em" justify={"center"}>
              <Flex gap=".5em" alignItems="center">
                <UserProfileIcon />
                <Flex gap=".2em" direction={"column"}>
                  <Text fontWeight={"bold"} fontSize={"small"}>
                    {ele.user.username}
                  </Text>
                  <Text fontSize={"small"}>
                    {ConvertTimestampFormat(ele.created_at)}
                  </Text>
                </Flex>
              </Flex>
              <Flex pl="2.5em" w="100%" pr="1em">
                <Flex
                  p="1em"
                  w="100%"
                  bgColor={"#E4FAFF"}
                  borderRadius={"10px"}
                >
                  <Text>{ele.content}</Text>
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
