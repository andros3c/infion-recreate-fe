const TOKEN_KEY = "INFION_RECREATE_AUTH";

export const getToken = () => {
  try {
    const { token } = JSON.parse(localStorage.getItem(TOKEN_KEY));
    return token;
  } catch {
    return;
  }
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.clear();
};
