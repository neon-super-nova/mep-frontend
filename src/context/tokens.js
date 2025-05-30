const TOKEN_KEY = "token";

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const deleteToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export function isLoggedIn() {
 return !!getToken();
}
