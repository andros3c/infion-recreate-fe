"use client";
import { useState } from "react";
import SideBar, { SIDEBAR_POSITION } from "@/components/SideBar";
import { FilterAndCategoryWrapper } from "./FilterAndCategoryWrapper";
import { useFetchesCategoriesQuery } from "@/hooks/queries/fetches/useFetchesCategoriesQuery";
import { useThreadFilter } from "@/hooks/useThreadFilter";
import { Flex, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";

export const FilterAndCategory = () => {
  const { data: categories = [] } = useFetchesCategoriesQuery({});

  const filterOptions = [
    "oldest",
    "newest",
    "top Threads",
    "by Likes",
    "by comments",
    "by followers",
  ];

  const [openIndex, setOpenIndex] = useState(0);
  const _categories = [];
  categories.length > 0
    ? categories.map((ele) => _categories.push(ele.category))
    : "";

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { filter, setFilter } = useThreadFilter();

  return (
    <SideBar position={SIDEBAR_POSITION.LEFT} w="12%">
      <Flex mt="5em" gap="1em" direction="column" alignItems="start" w="100%">
        {Object.entries(filter).map(([key, value]) => {
          return value ? (
            <Tag
              size="lg"
              key={value + 12}
              borderRadius="full"
              variant="solid"
              colorScheme="green"
              w="fit-content"
            >
              <TagLabel>{value}</TagLabel>
              <TagCloseButton onClick={() => setFilter({ key, value: "" })} />
            </Tag>
          ) : null; // Use null instead of <></> for cleaner code
        })}
      </Flex>

      <FilterAndCategoryWrapper
        options={_categories}
        heading={"Category"}
        mt="1em"
        isOpen={openIndex === 0}
        onToggle={() => handleToggle(0)}
        theme="primary"
        onChange={setFilter}
        filterName={"category"}
      />
      <FilterAndCategoryWrapper
        options={filterOptions}
        heading={"Filter by"}
        mt="1em"
        isOpen={openIndex === 1}
        onToggle={() => handleToggle(1)}
        theme="secondary"
        onChange={setFilter}
        filterName={"sortBy"}
      />
    </SideBar>
  );
};
