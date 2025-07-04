import { useTheme } from "../../../context/theme-context";
import hardcodedUser from "../../../context/hardcoded-user";
import userDark from "../../img/user/default-user-dark_web.png";
import userLight from "../../img/user/default-user-light_web.png";
import { getUserId } from "../../../context/decodeToken";
import axios from "axios";
import { useState, useEffect } from "react";

function Avatar({ className }) {
  const { theme } = useTheme();
  const user = hardcodedUser;
  console.log('Avatar URL:', user?.pictureUrl);

  const [userAvatarUrl, setUserAvatarUrl] = useState("");
  // need to add this to avoid seeing default picture for a brief moment upon reload of page
  const [picLoadingStatus, setPicLoadingStatus] = useState(false);

  useEffect(() => {
    const getUserPictureUrl = async () => {
      const userId = getUserId();
      if (!userId) {
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
        }
      } catch (err) {
        // console.warn("Failed to fetch user avatar");
        // alert("Failed to fetch user avatar");
      } finally {
        setPicLoadingStatus(true);
      }
    };
    getUserPictureUrl();
  }, []);

  return picLoadingStatus ? (
    userAvatarUrl ? (
      <img src={userAvatarUrl} alt="User avatar" className={className} />
    ) : (
      <img
        src={
          user.pictureUrl
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
