import "../page-css/notifications-page.css";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import avatar from "../components/img/user/default-user-light_web.png";
import { getUserId } from "../context/decodeToken.js";
// import notifications from "../context/notifications.json";
// import userLogin from "../context/userLogin.json";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dummyThumb from "../components/img/dummy/bananabread.jpg";
// import followLight from "../components/img/like-follow-review/follow-light-2.png";
// import followDark from "../components/img/like-follow-review/follow-dark-2.png";
import darkLikedFrame from "../components/img/like-follow-review/dark-liked-frame-2.png";
import lightLikedFrame from "../components/img/like-follow-review/light-liked-frame-2.png";
import darkReviewedFrame from "../components/img/like-follow-review/dark-reviewed-frame-2.png";
import lightReviewedFrame from "../components/img/like-follow-review/light-reviewed-frame-2.png";
import axios from "axios";

function NotificationsPage() {
  const { theme } = useTheme();
  const userAvatar = avatar;
  const thumbnail = dummyThumb;
  const [user, setUser] = useState(null);
  const userId = getUserId();

  useEffect(() => {
    const getUser = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`/api/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(response.data.userInfo);
      } catch (err) {
        if (err.response) {
          alert(err.response.data.error);
        }
      }
    };
    getUser();
  }, [userId]);

  const [userSignIn, setUserSignIn] = useState();

  useEffect(() => {
    try {
      const fetchUserSignIn = async () => {
        const response = await axios.get(`/api/users/last-login/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const lastLogin = response.data;
        console.log("last login set to ");
        setUserSignIn(lastLogin);
      };
      fetchUserSignIn();
    } catch (error) {
      console.error("Error fetching user sign-in data:", error);
    }
  }, [userId]);

  const [notificationList, setNotificationList] = useState([]);

  const getNotificationValue = (notification) => {
    if (!notification || !notification.type || !userSignIn) {
      return <span className="error"> error</span>;
    }

    if (
      (notification.type === "like" || notification.type === "review") &&
      notification.recipeId
    ) {
      const linkTarget =
        notification.type === "review"
          ? `/recipe/${notification.recipeId}#reviews`
          : `/recipe/${notification.recipeId}`;
      return (
        <>
          {" your "}
          <Link className="notification-link" to={linkTarget}>
            {notification.recipeName || "recipe"}
          </Link>
        </>
      );
    } else {
      return <span style={{ color: "red" }}>error</span>;
    }
  };

  function groupNotifications(notifications) {
    notifications.sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt));
    const grouped = [];
    const used = new Set();

    for (let i = 0; i < notifications.length; i++) {
      if (used.has(i)) continue;
      const current = notifications[i];

      const group = [];
      if (current.read === false) {
        for (let j = i + 1; j < notifications.length; j++) {
          if (used.has(j)) continue;
          const next = notifications[j];
          const withinHour =
            Math.abs(new Date(current.createdAt) - new Date(next.createdAt)) <
            3600000;
          if (
            next.read === false &&
            next.recipeId === current.recipeId &&
            withinHour
          ) {
            group.push(next);
            used.add(j);
          }
        }
      }
      if (group.length > 0) {
        grouped.push({ ...current, grouped: true, group: [current, ...group] });
      } else {
        grouped.push(current);
      }
    }
    return grouped;
  }

  const groupedNotifications = groupNotifications(notificationList);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`/api/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("notifications fetched " + response.data.notifications);
        setNotificationList(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationIds) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      console.log("notifications ids are " + notificationIds);
      const response = await axios.post(
        "/api/notifications/read",
        { notificationIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("POST request response: " + JSON.stringify(response.data));
      if (response?.data?.message === "Notifications marked as read") {
        //state handling after marking read
        setNotificationList((prevList) =>
          prevList.filter((notification) =>
            notificationIds.includes(notification.id)
          )
        );
        // refresh page
        window.location.reload();
      } else {
        console.warn("could not mark as read:", response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <HeaderBar />
      <div className="notifications-page">
        <main className="notifications-page-main-content">
          <div className="notifications-page-left-panel">
            <div className="notifications-page-left-panel2">
              <h2 className="notifications-page-panel-title">Notifications</h2>
              <h3 className="notifications-page-panel-title">
                {" "}
                To {user?.username || user?.firstName || "User"} since{" "}
                {userSignIn?.lastLogin
                  ? new Date(userSignIn.lastLogin).toLocaleDateString()
                  : ""}
              </h3>

              {groupedNotifications.map((notification) => {
                let notificationClass = "";
                // if (
                //   userSignIn === undefined ||
                //   userSignIn < notification.createdAt ||
                //   notification.read === true
                // ) {
                //   notificationClass = "notification-inactive";
                // }

                return (
                  <div
                    key={notification.id}
                    className={`notifications-page-panel-item ${notificationClass}`}
                  >
                    {notification.grouped ? (
                      (() => {
                        const uniqueUsers = [];
                        const seenUsernames = new Set();

                        notification.group.forEach((n) => {
                          const username = n.firstSenderUsername || "Anonymous";
                          if (!seenUsernames.has(username)) {
                            uniqueUsers.push({
                              username,
                              senderAvatarUrl: n.senderPictureUrl,
                              recipeId: n.recipeId,
                              recipeName: n.recipeName,
                              createdAt: n.date,
                            });
                            seenUsernames.add(username);
                          }
                        });

                        const getAvatarForUsername = (username) => {
                          const userObj = notification.group.find(
                            (n) => n.senderUsername === username
                          );
                          return userObj?.senderPictureUrl || userAvatar;
                        };

                        const getRecipeLink = (user) => {
                          return user.recipeId
                            ? `/recipe/${user.recipeId}`
                            : "#";
                        };

                        const typesInGroup = [
                          ...new Set(notification.group.map((n) => n.type)),
                        ];
                        let actionText = "";
                        if (typesInGroup.length === 1) {
                          actionText =
                            typesInGroup[0] === "like" ? "liked" : "reviewed";
                        } else {
                          actionText = "reacted to";
                        }
                        if (uniqueUsers.length <= 2) {
                          return (
                            <div className="notifications-page-panel-item-grouped">
                              <img
                                src={getAvatarForUsername(
                                  uniqueUsers[0].username
                                )}
                                alt="avatar"
                                className="user-image"
                              />
                              <p className="notifications-page-panel-desc">
                                {uniqueUsers.length === 1 && (
                                  <span className="notifications-page-panel-desc bold">
                                    {uniqueUsers[0].username}
                                  </span>
                                )}
                                {uniqueUsers.length === 2 && (
                                  <>
                                    <span className="notifications-page-panel-desc bold">
                                      {uniqueUsers[0].username}
                                    </span>
                                    {" and "}
                                    <span className="notifications-page-panel-desc bold">
                                      {uniqueUsers[1].username}
                                    </span>
                                  </>
                                )}
                                {uniqueUsers.length > 2 && (
                                  <>
                                    <span className="notifications-page-panel-desc bold">
                                      {uniqueUsers[0].username}
                                    </span>
                                    {" and "}
                                    {uniqueUsers.length - 1} others
                                  </>
                                )}{" "}
                                {actionText} your{" "}
                                <Link
                                  className="notification-link"
                                  to={getRecipeLink(uniqueUsers[0])}
                                >
                                  {uniqueUsers[0].recipeName || "recipe"}
                                </Link>
                                <span> on </span>{" "}
                                <span className="reviews-true-date">
                                  {new Date(
                                    uniqueUsers[0].createdAt
                                  ).toLocaleDateString("en-US", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  })}{" "}
                                  at{" "}
                                  {new Date(
                                    uniqueUsers[0].createdAt
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </span>
                              </p>
                            </div>
                          );
                        }
                      })()
                    ) : (
                      <>
                        <div
                          className={"notifications-page-panel-item-grouped"}
                        >
                          <img
                            src={notification.senderPictureUrl || userAvatar}
                            alt="avatar"
                            className="user-image"
                          />
                          <p className="notifications-page-panel-desc">
                            <span className="notifications-page-panel-desc bold">
                              {notification.otherSendersCount === 0
                                ? notification.firstSenderUsername
                                : `${notification.firstSenderUsername} and ${notification.otherSendersCount} other user(s)`}
                            </span>
                            {notification.type.trim() === "like"
                              ? " liked"
                              : " reviewed"}
                            {getNotificationValue(notification)}{" "}
                            {notification.date ? (
                              <>
                                <span> on </span>{" "}
                                <span className="reviews-true-date">
                                  {new Date(
                                    notification.date
                                  ).toLocaleDateString("en-US", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  })}{" "}
                                  {/* at{" "}
                                  {new Date(
                                    notification.date
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })} */}
                                </span>
                              </>
                            ) : (
                              "at some time"
                            )}
                            .
                          </p>
                          <>
                            {notification.type === "review" ? (
                              <div className="event-reviewed-group">
                                <img
                                  src={
                                    theme === "dark"
                                      ? darkReviewedFrame
                                      : lightReviewedFrame
                                  }
                                  alt="like-frame"
                                  className="event-image-reviewed-frame"
                                />
                                <img
                                  src={notification.recipeImageUrl || thumbnail}
                                  alt="avatar"
                                  className="event-image-reviewed"
                                />
                              </div>
                            ) : (
                              <div className="event-liked-group">
                                <img
                                  src={
                                    theme === "dark"
                                      ? darkLikedFrame
                                      : lightLikedFrame
                                  }
                                  alt="like-frame"
                                  className="event-image-liked-frame"
                                />
                                <img
                                  src={notification.recipeImageUrl || thumbnail}
                                  alt="avatar"
                                  className="event-image-liked"
                                />
                              </div>
                            )}
                          </>

                          <button
                            className="mark-as-read-button"
                            onClick={() => markAsRead(notification.id)}
                            aria-label="Mark as Read"
                          >
                            Mark as Read
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
        <footer className="notifications-page-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}

export default NotificationsPage;