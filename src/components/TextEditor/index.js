"use client";
import { UserProfileIcon } from "@/icons/UserProfileIcon";
import { Button, Flex, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./text-editor.css";
import { useCreateThreadMutation } from "@/hooks/queries/mutations/useCreateThreadMutation";
import { useCreateToast } from "@/hooks/useCreateToast";
import { QuillEditor } from "./quill";
import { useFetchesCategoriesQuery } from "@/hooks/queries/fetches/useFetchesCategoriesQuery";
import { isEmpty } from "lodash";

import { QUERY_KEY_CONSTANTS } from "@/constants/queryKey";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUserInformation } from "@/hooks/useGetUserInformation";

export const TextEditor = () => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const { createSuccessToast } = useCreateToast();
  const { userInfo: { id: user_id = "", username = "" } = {} } =
    useGetUserInformation() || {};
  const { mutateAsync: _handlePostThread } = useCreateThreadMutation({
    config: {
      onSuccess: async () => {
        setIsReadOnly(false);
        setCategory("");
        setValue();
        createSuccessToast("success make thread");
        await queryClient.refetchQueries([
          QUERY_KEY_CONSTANTS.GET_THREADS_LIST,
        ]);
      },
    },
  });
  const { data: categories = [] } = useFetchesCategoriesQuery({});
  const handlePostThread = () => {
    if (!isEmpty(category) && !isEmpty(value)) {
      setIsReadOnly(true);
      _handlePostThread({
        user_id: user_id,
        content: value,
        category: category,
      });
    }
  };

  return (
    <Flex
      h="max-content"
      borderRadius={"19px"}
      p="1.5em"
      w="100%"
      bgColor={"white"}
      direction={"column"}
    >
      <Flex w="100%" gap="1em" alignItems={"center"}>
        <UserProfileIcon />
        <Flex direction="column">
          <Text fontWeight={"bold"}>{username}</Text>
          <Text>now</Text>
        </Flex>
      </Flex>
      <Flex w="100%" py="1em" pb="3em" direction={"column"} gap={"1em"}>
        <Flex w="30%">
          <Select
            size="sm"
            borderRadius={"9px"}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">Select Category</option> {/* Placeholder option */}
            {categories.map((data, idx) => {
              return (
                <option value={data.category} key={idx}>
                  {data.category}
                </option>
              );
            })}
          </Select>
        </Flex>
        <QuillEditor
          value={value}
          setValue={setValue}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          isReadOnly={isReadOnly}
        />
      </Flex>
      <Flex w={"100%"} justifyContent={"flex-end"}>
        <Button
          onClick={() => handlePostThread()}
          isDisabled={isEmpty(category) || isEmpty(value)}
          mt="4em"
        >
          Post
        </Button>
      </Flex>
    </Flex>
  );
};
