"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useCreateToast } from "../../../hooks/useCreateToast";
import { usePostCommentMutations } from "../../../hooks/queries/mutations/usePostCommentMutations";
import { QUERY_KEY_CONSTANTS } from "../../../constants/queryKey";
import { Flex, Text } from "@chakra-ui/react";
import { UserProfileIcon } from "../../../icons/UserProfileIcon";
import { colors } from "../../../theme/foundations/colors";
import { ConvertTimestampFormat } from "../../../utils/timeStampConverter";
import { ReplyCommentComponent } from "./ReplyCommentSection";
import { CommentTextAreaComponent } from "./CommentTextArea";
import { useFetchesLikeCommentStatus } from "../../../hooks/queries/fetches/useFetchesLikeCommentStatus";
import { useLikeCommentMutation } from "../../../hooks/queries/mutations/useLikeCommentMutation";
import { useUnlikeCommentMutation } from "../../../hooks/queries/mutations/useUnlikeCommentMutation";
import Image from "next/image";



export const CommentsSection = ({
  commentsValue,
  setCommentsValue,
  userId,
  threadsId,
  commentsData,
}) => {
  const queryClient = useQueryClient();
  const [replyComment, setReplyComment] = useState({ id: null, status: false });
  const { createSuccessToast } = useCreateToast();
  const { mutateAsync: handlePostComment } = usePostCommentMutations({
    config: {
      onSuccess: () => {
        createSuccessToast("commented");
        queryClient.refetchQueries([QUERY_KEY_CONSTANTS.GET_COMMENTS]);
        setCommentsValue("");
      },
    },
  });
  const handleClickReplyComment = (idx) => {
    const handleReplyStatus = (prev) => {
      if (prev.id !== idx && prev.status) {
        return true;
      } else {
        return !prev.status;
      }
    };
    setReplyComment((prev) => ({
      id: idx,
      status: handleReplyStatus(prev),
    }));
  };

  return (
    <Flex direction="column" gap="1.5em">
      <Flex direction={"column"} gap="1.25em">
        <Text fontWeight="bold" p=".5em" borderBottom={"1px solid #E8E8E8"}>
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
                <Flex gap="1em">
                  <LikeComponent
                    userId={userId}
                    threadsId={threadsId}
                    commentId={ele.id}
                  />

                  <Text
                    as={"button"}
                    fontSize={"small"}
                    color={colors.myColor.black[400]}
                    onClick={() => handleClickReplyComment(idx)}
                  >
                    Reply
                  </Text>
                </Flex>
              </Flex>
              {replyComment.id === idx && replyComment.status ? (
                <ReplyCommentComponent
                  userId={userId}
                  threadsId={threadsId}
                  parentId={ele.id}
                />
              ) : (
                <></>
              )}
            </Flex>
          );
        })}
      </Flex>
      <CommentTextAreaComponent
        commentsValue={commentsValue}
        setCommentsValue={setCommentsValue}
        handlePostComment={handlePostComment}
        userId={userId}
        threadsId={threadsId}
      />
    </Flex>
  );
};

export const LikeComponent = ({ userId, threadsId, commentId, parent_id }) => {
  const { createSuccessToast } = useCreateToast();
  const queryClient = useQueryClient();
  const { data = {} } = useFetchesLikeCommentStatus({
    user_id: userId,
    comment_id: commentId,
    threads_id: threadsId,
    ...(parent_id !== undefined && { parent_id }),
  });
  const isLikeCommentReply = parent_id
    ? QUERY_KEY_CONSTANTS.GET_COMMENTS_REPLY_LIKE_STATUS
    : QUERY_KEY_CONSTANTS.GET_COMMENTS_LIKE_STATUS;
  const { mutateAsync: handleClickLike } = useLikeCommentMutation({
    config: {
      onSuccess: () => {
        createSuccessToast("liked");
        queryClient.refetchQueries([isLikeCommentReply]);
      },
    },
  });
  const { mutateAsync: handleClickUnlike } = useUnlikeCommentMutation({
    config: {
      onSuccess: () => {
        createSuccessToast("unliked");
        queryClient.refetchQueries([isLikeCommentReply]);
      },
    },
  });
  return (
    <Flex>
      {data?.status ? (
        <Flex
          gap=".25em"
          as={"button"}
          alignItems={"center"}
          onClick={() =>
            handleClickUnlike({
              user_id: userId,
              threads_id: threadsId,
              comment_id: commentId,
              parent_id,
            })
          }
        >
          <Image
            src={"/like-clicked.svg"}
            width={15}
            height={15}
            alt="like-logo"
          />
          <Text
            as={"button"}
            fontSize={"small"}
            color={colors.myColor.black[700]}
          >
            Liked
          </Text>
        </Flex>
      ) : (
        <Flex
          gap=".25em"
          alignItems={"center"}
          as={"button"}
          onClick={() =>
            handleClickLike({
              user_id: userId,
              threads_id: threadsId,
              comment_id: commentId,
              parent_id,
            })
          }
        >
          <Image
            src={"/like-not-clicked.svg"}
            width={15}
            height={15}
            alt="like-logo"
          />{" "}
          <Text fontSize={"small"} color={colors.myColor.black[700]}>
            Like
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
