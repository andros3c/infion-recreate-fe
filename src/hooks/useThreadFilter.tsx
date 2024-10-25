import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useThreadFilter = () => {
  const defaultValue = {
    category: "",
    sortBy: "",
  };
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const generateInitialValueBasedOnURL = () => {
    const category = searchParams.get("category");
    const sortBy = searchParams.get("sortBy");

    const hasCategory = Boolean(category);
    const hasSortBy = Boolean(sortBy);

    const copyFilters = { ...defaultValue };
    if (hasCategory) {
      copyFilters.category = category;
    }
    if (hasSortBy) {
      copyFilters.sortBy = sortBy;
    }

    return copyFilters;
  };

  const filter = generateInitialValueBasedOnURL();

  const setFilter = ({ key, value }) => {
    const params = new URLSearchParams(searchParams);

    value === "" ? params.delete(key) : params.set(key, value);

    router.push(`${pathName}?${params.toString()}`);
  };

  const getParams = (params) => {
    const searchParams = {};
    const { category, sortBy } = params;
    const hasCategory = Boolean(category);
    const hasSortBy = Boolean(sortBy);

    if (hasCategory) {
      searchParams.category = category;
    }
    if (hasSortBy) {
      searchParams.sort_by = sortBy;
    }

    return searchParams;
  };
  return {
    filter,
    setFilter,
    getParams,
  };
};
