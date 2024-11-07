
import { Text } from "@chakra-ui/react";
import { useFetchUserInfoById } from "../../hooks/queries/fetches/useFetchUserInfoById";

export const ThreadOwner = ({ userId }) => {
  const { data: _data = {}, isLoading } = useFetchUserInfoById({
    userId,
  });
  return (
    <Text fontWeight={"bold"}>
      {isLoading ? "loading..." : _data?.username}
    </Text>
  );
};
