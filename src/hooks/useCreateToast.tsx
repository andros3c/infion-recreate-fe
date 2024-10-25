import { useToast } from "@chakra-ui/react";


export const PROCESS_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
};
const useCreateToast = () => {
  const toast = useToast();
  const newToast = (description, status) =>
    toast({
      title: status === PROCESS_STATUS.SUCCESS ? "Success" : "Failed",
      description,
      status,
      duration: 4000,
      isClosable: true,
      position: "top-right",
    });

  const createSuccessToast = (description) => {
    newToast(description, PROCESS_STATUS.SUCCESS);
  };
  const createErrorToast = (description) => {
    newToast(description, PROCESS_STATUS.ERROR);
  };
  return { createErrorToast, createSuccessToast };
};

export { useCreateToast };
