import { UserProfileIcon } from "@/icons/UserProfileIcon";
import { Button, Flex, Textarea } from "@chakra-ui/react";

export const CommentTextAreaComponent = ({
  commentsValue,
  setCommentsValue,
  handlePostComment,
  userId,
  threadsId,
  description = "write your comment here",
  parent_id,
  ...props
}) => {
  return (
    <Flex direction={"column"} {...props} gap="1em">
      <Flex gap=".5em" alignItems={"center"}>
        <UserProfileIcon />
        <Textarea
          value={commentsValue}
          onChange={(e) => setCommentsValue(e.target.value)}
          placeholder={description}
          borderRadius={"10px"}
        />
      </Flex>
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
              parent_id,
            });
          }}
          isDisabled={commentsValue === ""}
        >
          {parent_id ? "Post Reply" : "Post Comment"}
        </Button>
      </Flex>
    </Flex>
  );
};
