import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { clearToken } from "./tokenHelper";
import { useCreateToast } from "../hooks/useCreateToast";

interface ErrorType {
  body: {
    meta: {
      messages: string[];
    };
  };
}
export const useMutateData = <TData = unknown, TVariables = void>(
  mutationFn: MutationFunction<TData, TVariables>,
  config: UseMutationOptions<TData, ErrorType, TVariables> = {}
) => {
  const { push } = useRouter();
  const { createErrorToast } = useCreateToast();
  const handleErrorHTTP = (error: ErrorType) => {
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
  return useMutation<TData, ErrorType, TVariables>({
    mutationFn,
    onError: handleErrorHTTP,
    ...config,
  });
};

export const useFetchData = (queryKey, queryFn, config = {}) => {
  const result = useQuery({ queryKey, queryFn, ...config });
  const { data, ...rest } = result;
  return { data, ...rest };
};
