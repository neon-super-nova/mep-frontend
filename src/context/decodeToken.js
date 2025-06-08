import { jwtDecode } from "jwt-decode";
import { getToken } from "./tokens";

function getUserFromToken() {
  const token = getToken();
  if (!token) {
    return null;
  }
  try {
    const decodedUser = jwtDecode(token);
    return decodedUser;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export function getUserId() {
  const { userId } = getUserFromToken() || {};
  return userId;
}
