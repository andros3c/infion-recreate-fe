import { QUERY_KEY_CONSTANTS } from "@/constants/queryKey";
import { useFetchesComments } from "@/hooks/queries/fetches/useFetchesComments";
import { useFetchesLikeStatus } from "@/hooks/queries/fetches/useFetchesLikeStatus";
import { useLikeThreadsMutation } from "@/hooks/queries/mutations/useLikeThreadsMutation";
import { useUnlikeThreadsMutation } from "@/hooks/queries/mutations/useUnlikeThreadsMutation";
import { useCreateToast } from "@/hooks/useCreateToast";
import { Flex, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { CommentsSection } from "./CommentsSection";

export const InteractionBar = ({ userId, threadsId }) => {
  const queryClient = useQueryClient();
  const [showComments, setShowComments] = useState(false);
  const [commentsValue, setCommentsValue] = useState("");
  const { createSuccessToast } = useCreateToast();
  const { mutateAsync: handleLikeThreads } = useLikeThreadsMutation({
    config: {
      onSuccess: () => {
        createSuccessToast("like");
        queryClient.refetchQueries([QUERY_KEY_CONSTANTS.GET_LIKE_STATUS]);
      },
    },
  });
  const { data: commentsData = [] } = useFetchesComments({
    threads_id: threadsId,
  });

  const { mutateAsync: handleUnlikeThreads } = useUnlikeThreadsMutation({
    config: {
      onSuccess: () => {
        createSuccessToast("unlike");
        queryClient.refetchQueries([QUERY_KEY_CONSTANTS.GET_LIKE_STATUS]);
      },
    },
  });
  const { data = {} } = useFetchesLikeStatus({
    user_id: userId,
    threads_id: threadsId,
  });

  return (
    <Flex direction="column" gap="1em">
      <Flex gap="1em">
        <Flex gap="0.25em">
          {data?.status ? (
            <Flex
              as={"button"}
              onClick={() => {
                handleUnlikeThreads({ user_id: userId, threads_id: threadsId });
              }}
              cursor={"pointer"}
            >
              <Image
                src={"/like-clicked.svg"}
                width={25}
                height={25}
                alt="like-logo"
              />
            </Flex>
          ) : (
            <Flex
              as={"button"}
              onClick={() => {
                handleLikeThreads({ user_id: userId, threads_id: threadsId });
              }}
              cursor={"pointer"}
            >
              <Image
                src={"/like-not-clicked.svg"}
                width={25}
                height={25}
                alt="like-logo"
              />
            </Flex>
          )}

          <Text>40</Text>
        </Flex>
        <Flex gap="0.25em">
          <Flex as={"button"} onClick={() => setShowComments((prev) => !prev)}>
            <Image
              src={"/comment.svg"}
              width={25}
              height={25}
              alt="like-logo"
            />
          </Flex>
          <Text>0</Text>
        </Flex>
        <Flex gap="0.25em">
          <Image src={"/share.svg"} width={25} height={25} alt="like-logo" />
          <Text>0</Text>
        </Flex>
        <Flex gap="0.25em">
          <Image src={"/save.svg"} width={25} height={25} alt="like-logo" />
          <Text>0</Text>
        </Flex>
      </Flex>
      {showComments && threadsId && userId && (
        <CommentsSection
          commentsValue={commentsValue}
          setCommentsValue={setCommentsValue}
          threadsId={threadsId}
          userId={userId}
          commentsData={commentsData}
        />
      )}
    </Flex>
  );
};
