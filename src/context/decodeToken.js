import { jwtDecode } from "jwt-decode";
import { getToken } from "./tokens";

export function getUserFromToken() {
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
