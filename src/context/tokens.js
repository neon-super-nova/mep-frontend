const TOKEN_KEY = "token";

export const saveToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const deleteToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export function isLoggedIn() {
  return !!getToken();
}

// user image for avatar
const AVATAR_URL = "avatar";

export const saveUserAvatar = (imageUrl) => {
  sessionStorage.setItem(AVATAR_URL, imageUrl);
};

export const deleteUserAvatar = () => {
  sessionStorage.removeItem(AVATAR_URL);
};

export const getUserAvatar = () => {
  return sessionStorage.getItem(AVATAR_URL);
};

export function isAvatarSaved() {
  return !!getUserAvatar();
}
