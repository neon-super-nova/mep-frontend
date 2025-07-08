import { useTheme } from "../../../context/theme-context";
import userDark from "../../img/user/default-user-dark_web.png";
import userLight from "../../img/user/default-user-light_web.png";
import { getUserId } from "../../../context/decodeToken";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  getUserAvatar,
  isAvatarSaved,
  saveUserAvatar,
} from "../../../context/tokens";

function Avatar({ className, refreshTrigger }) {
  const { theme } = useTheme();

  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const userId = getUserId();
      if (!userId) return;

      try {
        const response = await axios.get(`api/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(response.data.userInfo);
      } catch (err) {}
    };
    getUser();
  }, []);

  const [userAvatarUrl, setUserAvatarUrl] = useState("");
  // need to add this to avoid seeing default picture for a brief moment upon reload of page
  const [picLoadingStatus, setPicLoadingStatus] = useState(false);

  useEffect(() => {
    const getUserPictureUrl = async () => {
      const userId = getUserId();
      if (isAvatarSaved() && !refreshTrigger) {
        setUserAvatarUrl(getUserAvatar());
        setPicLoadingStatus(true);
        return;
      }

      try {
        const response = await axios.get(`/api/users/${userId}/picture-url`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const imageUrl = response.data.pictureUrl;
        if (typeof imageUrl === "string") {
          setUserAvatarUrl(imageUrl);
          saveUserAvatar(imageUrl);
        }
      } catch (err) {
      } finally {
        setPicLoadingStatus(true);
      }
    };
    getUserPictureUrl();
  }, [refreshTrigger]);

  return picLoadingStatus ? (
    userAvatarUrl ? (
      <img src={userAvatarUrl} alt="User avatar" className={className} />
    ) : (
      <img
        src={
          user && user.pictureUrl
            ? user.pictureUrl
            : theme === "dark"
            ? userDark
            : userLight
        }
        alt="Default avatar"
        className={className}
      />
    )
  ) : (
    <div style={{ width: 40, height: 40 }} />
  );
}

export default Avatar;
