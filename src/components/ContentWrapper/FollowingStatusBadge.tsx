
import { Flex } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchesFollowingStatus } from "../../hooks/queries/fetches/useFetchesFollowingStatus";
import { useCreateToast } from "../../hooks/useCreateToast";
import { useFollowUserMutation } from "../../hooks/queries/mutations/useFollowUserMutation";
import { QUERY_KEY_CONSTANTS } from "../../constants/queryKey";
import { useUnfollowUserMutation } from "../../hooks/queries/mutations/useUnfollowUserMutation";

export const FollowingStatusBadge = ({ userId, followUserId, ...props }) => {
    const queryClient = useQueryClient();
    const { data = {} } = useFetchesFollowingStatus({ userId, followUserId });
    const { createSuccessToast } = useCreateToast();
    const { mutateAsync: followUser } = useFollowUserMutation({
      config: {
        onSuccess: () => {
          createSuccessToast("start following");
          queryClient.refetchQueries([QUERY_KEY_CONSTANTS.GET_FOLLOWING_STATUS]);
        },
      },
    });
    const { mutateAsync: unfollowUser } = useUnfollowUserMutation({
      config: {
        onSuccess: () => {
          createSuccessToast("unfollowing");
          queryClient.refetchQueries([QUERY_KEY_CONSTANTS.GET_FOLLOWING_STATUS]);
        },
      },
    });
    const { status } = data ?? false;
    const handleClickBadge = () => {
      if (status) {
        unfollowUser({ userId, followUserId });
      } else {
        followUser({ userId, followUserId });
      }
    };
    return (
      <Flex {...props}>
        {userId === followUserId ? (
          <></>
        ) : (
          <Flex
            as="button"
            bgColor={status ? "primary" : "white"}
            p=".05em"
            w="7em"
            borderRadius={"10px"}
            border={status ? "" : "1px solid #DDDBDB"}
            fontSize={"x-small"}
            color={status ? "white" : "inherit"}
            justify={"center"}
            cursor={"pointer"}
            onClick={() => handleClickBadge()}
            alignItems={"center"}
          >
            {status ? ".following" : ".follow"}
          </Flex>
        )}
      </Flex>
    );
  };
  