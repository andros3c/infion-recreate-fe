
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useCreateToast } from "./useCreateToast";
import { getUserInfo } from "../utils/tokenHelper";

export const useGetUserInformation = () => {
  const { createErrorToast } = useCreateToast();
  const { push } = useRouter();
  const handleError = () => {
    push("/");
    setTimeout(() => {
      createErrorToast("user not authenticated, please relogin");
    }, 1000);
  };
  const { userInfo, token } = getUserInfo();
  return isEmpty(userInfo) || isEmpty(token)
    ? handleError()
    : {
        token,
        userInfo,
      };
};
