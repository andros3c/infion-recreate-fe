"use client";
import { useState } from "react";
import SideBar, { SIDEBAR_POSITION } from "@/components/SideBar";
import { FilterAndCategoryWrapper } from "./FilterAndCategoryWrapper";
import { useFetchesCategoriesQuery } from "@/hooks/queries/fetches/useFetchesCategoriesQuery";

export const FilterAndCategory = () => {
  const { data: categories = [] } = useFetchesCategoriesQuery({});

  const filterOptions = [
    "none",
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

  return (
    <SideBar position={SIDEBAR_POSITION.LEFT} w="12%">
      <FilterAndCategoryWrapper
        options={_categories}
        heading={"Category"}
        mt="4.5em"
        isOpen={openIndex === 0}
        onToggle={() => handleToggle(0)}
        theme="primary"
      />
      <FilterAndCategoryWrapper
        options={filterOptions}
        heading={"Filter by"}
        mt="1em"
        isOpen={openIndex === 1}
        onToggle={() => handleToggle(1)}
        theme="secondary"
      />
    </SideBar>
  );
};
