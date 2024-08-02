import { useCreateToast } from "@/hooks/useCreateToast";
import { useMutation } from "@tanstack/react-query";

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
