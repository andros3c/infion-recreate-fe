
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY_CONSTANTS } from "../../../constants/queryKey";
import { LikeComponent } from "./CommentsSection";
import { useCreateToast } from "../../../hooks/useCreateToast";
import { useState } from "react";
import { useFetchesCommentReply } from "../../../hooks/queries/fetches/useFetchesCommentReply";
import { usePostReplyCommentMutations } from "../../../hooks/queries/mutations/usePostReplyCommentMutations";
import { Flex, Text } from "@chakra-ui/react";
import { UserProfileIcon } from "../../../icons/UserProfileIcon";
import { ConvertTimestampFormat } from "../../../utils/timeStampConverter";
import { colors } from "../../../theme/foundations/colors";
import { CommentTextAreaComponent } from "./CommentTextArea";

export const ReplyCommentComponent = ({ userId, threadsId, parentId }) => {
  const { data: replyComment = [] } = useFetchesCommentReply({
    user_id: userId,
    threads_id: threadsId,
    parent_id: parentId,
  });
  const [replyCommentValue, setReplyCommentValue] = useState("");
  const { createSuccessToast } = useCreateToast();
  const queryClient = useQueryClient();
  const { mutateAsync: handlePostCommentReply } = usePostReplyCommentMutations({
    config: {
      onSuccess: () => {
        createSuccessToast("commented");
        queryClient.refetchQueries([QUERY_KEY_CONSTANTS.GET_COMMENTS_REPLIES]);
        setReplyCommentValue("");
      },
    },
  });
  return (
    <Flex direction="column" gap=".5em" justify={"center"} pl="2.5em">
      {replyComment?.length > 0 ? (
        <Flex direction="column" gap=".5em" justify={"center"} pl="2.5em">
          {replyComment.map((ele, idx) => {
            return (
              <Flex key={idx} direction={"column"}>
                <Flex gap=".5em" alignItems="center">
                  <UserProfileIcon />
                  <Flex gap=".2em" direction={"column"}>
                    <Text fontWeight={"bold"} fontSize={"small"}>
                      {ele.user.username}
                    </Text>
                    <Text fontSize={"small"} color={colors.myColor.black[400]}>
                      {ConvertTimestampFormat(ele.created_at)}
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  pl="2.5em"
                  w="100%"
                  pr="1em"
                  gap=".5em"
                  direction={"column"}
                >
                  <Flex
                    p="1em"
                    w="100%"
                    bgColor={colors.myColor.blue[100]}
                    borderRadius={"10px"}
                  >
                    <Text>{ele.content}</Text>
                  </Flex>
                  <Flex pl="1em">
                    <LikeComponent
                      userId={userId}
                      threadsId={threadsId}
                      commentId={ele.id}
                      parent_id={ele.parent_id}
                    />
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      ) : (
        <></>
      )}
      <CommentTextAreaComponent
        pl="2.5em"
        commentsValue={replyCommentValue}
        setCommentsValue={setReplyCommentValue}
        handlePostComment={handlePostCommentReply}
        userId={userId}
        threadsId={threadsId}
        description="write your reply on this comment"
        parent_id={parentId}
      />
    </Flex>
  );
};
