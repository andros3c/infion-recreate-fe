import { useCreateToast } from "@/hooks/useCreateToast";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useMutateData = (mutationFn, config = {}) => {
  const { createErrorToast } = useCreateToast();
  const handleErrorHTTP = (error) => {
    createErrorToast(error.body.meta.messages[0]);
  };
  const mutation = useMutation({
    mutationFn,
    onError: handleErrorHTTP,
    ...config,
  });
  return mutation;
};

export const useFetchData = (queryKey, queryFn, config = {}) => {
  const result = useQuery({ queryKey, queryFn, ...config });
  const { data, ...rest } = result;
  return { data, ...rest };
};
