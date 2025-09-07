import "../page-css/notifications-page.css";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import avatar from "../components/img/user/default-user-light_web.png";
import { getUserId } from "../context/decodeToken.js";
import notifications from "../context/notifications.json";
import userLogin from "../context/userLogin.json";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dummyThumb from "../components/img/dummy/bananabread.jpg";
import followLight from "../components/img/like-follow-review/follow-light-2.png";
import followDark from "../components/img/like-follow-review/follow-dark-2.png";
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
      const fetchUserSignIn = () => {
        const foundUser = userLogin.find((u) => u.userId === userId);
        setUserSignIn(foundUser);
        console.log("Found user sign-in data:", foundUser?.lastLogin);
      };
      fetchUserSignIn();
    } catch (error) {
      console.error("Error fetching user sign-in data:", error);
    }
  }, [userId]);

  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    try {
      const fetchNotifications = () => {
        setNotificationList(notifications);
      };

      fetchNotifications();
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, []);

  const getNotificationValue = (notification) => {
    if (!notification || !notification.type || !userSignIn) {
      return <span className="error"> error</span>;
    }

    if (
      //   notification.type === "followed") {
      //   return " you";
      // } else if
      // (
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
    try {
      const fetchNotifications = () => {
        const notificationsWithId = notifications.map((n, idx) => ({
          ...n,
          id:
            n.id || `${n.recipeId || "no-recipe"}-${n.createdAt || idx}-${idx}`,
        }));
        setNotificationList(notificationsWithId);
      };
      fetchNotifications();
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, []);

  const markAsRead = (notificationId) => {
    setNotificationList((prevList) =>
      prevList.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
    console.log("Marking notification as read:", notificationId);
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

              {groupedNotifications.map((notification, index) => {
                let notificationClass = "";
                if (
                  userSignIn === undefined ||
                  userSignIn < notification.createdAt ||
                  notification.read === true
                ) {
                  notificationClass = "notification-inactive";
                }

                return (
                  <div
                    key={index}
                    className={`notifications-page-panel-item ${notificationClass}`}
                  >
                    {notification.grouped ? (
                      (() => {
                        const uniqueUsers = [];
                        const seenUsernames = new Set();

                        notification.group.forEach((n) => {
                          const username = n.senderUsername || "Anonymous";
                          if (!seenUsernames.has(username)) {
                            uniqueUsers.push({
                              username,
                              senderAvatarUrl: n.senderAvatarUrl,
                              recipeId: n.recipeId,
                              recipeName: n.recipeName,
                              createdAt: n.createdAt,
                            });
                            seenUsernames.add(username);
                          }
                        });

                        const getAvatarForUsername = (username) => {
                          const userObj = notification.group.find(
                            (n) => n.senderUsername === username
                          );
                          return userObj?.senderAvatarUrl || userAvatar;
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
                            src={notification.senderAvatarUrl || userAvatar}
                            alt="avatar"
                            className="user-image"
                          />
                          <p className="notifications-page-panel-desc">
                            <span className="notifications-page-panel-desc bold">
                              {notification.senderUsername || "Anonymous"}
                            </span>
                            {
                              //  notification.type === "follow" ? " followed you" :
                              notification.type === "like" ? (
                                " liked"
                              ) : notification.type === "review" ? (
                                " reviewed"
                              ) : (
                                <span style={{ color: "red" }}> error</span>
                              )
                            }
                            {getNotificationValue(notification)}{" "}
                            {notification.createdAt ? (
                              <>
                                <span> on </span>{" "}
                                <span className="reviews-true-date">
                                  {new Date(
                                    notification.createdAt
                                  ).toLocaleDateString("en-US", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  })}{" "}
                                  at{" "}
                                  {new Date(
                                    notification.createdAt
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
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
                                  src={
                                    notification.recipeImageUrlArray?.[0] ||
                                    thumbnail
                                  }
                                  alt="avatar"
                                  className="event-image-reviewed"
                                />
                              </div>
                            ) : notification.type === "like" ? (
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
                                  src={
                                    notification.recipeImageUrlArray?.[0] ||
                                    thumbnail
                                  }
                                  alt="avatar"
                                  className="event-image-liked"
                                />
                              </div>
                            ) : notification.type === "followed" ? (
                              <img
                                src={
                                  theme === "dark" ? followDark : followLight
                                }
                                alt="avatar"
                                className="event-image-followed"
                              />
                            ) : (
                              <span style={{ color: "red" }}>error</span>
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
