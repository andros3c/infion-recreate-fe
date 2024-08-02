import { getToken, setToken } from "@/utils/tokenHelper";
import { useUserLoginMutation } from "./queries/mutations/useUserLoginMutation";
import { useCreateToast } from "./useCreateToast";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { push } = useRouter();
  const { createSuccessToast } = useCreateToast();

  const isAuthenticated = () => Boolean(getToken());

  const handleOnSuccessLogin = (data) => {
    const { id, email, role_id, token, username, url_img } = data.data;
    const userInfo = { id, email, role_id, username, url_img };
    setToken(JSON.stringify({ token, userInfo }));
    createSuccessToast("Login Berhasil");
    push("/home");
  };
  const { mutateAsync: handleUserLogin } = useUserLoginMutation({
    config: {
      onSuccess: handleOnSuccessLogin,
    },
  });
  return {
    handleUserLogin,
    isAuthenticated,
  };
};
