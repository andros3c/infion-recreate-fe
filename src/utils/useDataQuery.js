import { useCreateToast } from "@/hooks/useCreateToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { clearToken } from "./tokenHelper";

export const useMutateData = (mutationFn, config = {}) => {
  const { push } = useRouter();
  const { createErrorToast } = useCreateToast();
  const handleErrorHTTP = (error) => {
    const errorMessage = error.body.meta.messages[0];
    createErrorToast(errorMessage);
    if (errorMessage.includes("token is expired")) {
      setTimeout(() => {
        clearToken();
        push("/");
        createErrorToast("Please re-login");
      }, 1000);
    }
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
