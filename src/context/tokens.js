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

// user image for avatar
const AVATAR_URL = "avatar";

export const saveUserAvatar = (imageUrl) => {
  localStorage.setItem(AVATAR_URL, imageUrl);
};

export const deleteUserAvatar = () => {
  localStorage.removeItem(AVATAR_URL);
};

export const getUserAvatar = () => {
  return localStorage.getItem(AVATAR_URL);
};

export function isAvatarSaved() {
  return !!getUserAvatar();
}
