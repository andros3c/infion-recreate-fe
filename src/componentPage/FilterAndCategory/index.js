"use client";
import { useState } from "react";
import SideBar, { SIDEBAR_POSITION } from "@/components/SideBar";
import { FilterAndCategoryWrapper } from "./FilterAndCategoryWrapper";

export const FilterAndCategory = () => {
  const filterOptions = [
    "none",
    "oldest",
    "newest",
    "top Threads",
    "by Likes",
    "by comments",
    "by followers",
  ];
  const categoriesOptions = [
    "tech & science",
    "economy",
    "health",
    "travel",
    "gossip",
    "sports",
    "healthcare",
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SideBar position={SIDEBAR_POSITION.LEFT} w="12%">
      <FilterAndCategoryWrapper
        options={categoriesOptions}
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
