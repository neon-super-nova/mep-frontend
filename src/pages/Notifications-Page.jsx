import "../page-css/notifications-page.css";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import avatar from "../components/img/user/default-user-light_web.png";
import notifications from "../context/notifications.json";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dummyThumb from "../components/img/dummy/bananabread.jpg";
import followLight from "../components/img/like-follow-review/follow-light-2.png";
import followDark from "../components/img/like-follow-review/follow-dark-2.png";
import darkLikedFrame from "../components/img/like-follow-review/dark-liked-frame-2.png";
import lightLikedFrame from "../components/img/like-follow-review/light-liked-frame-2.png";
import darkReviewedFrame from "../components/img/like-follow-review/dark-reviewed-frame-2.png";
import lightReviewedFrame from "../components/img/like-follow-review/light-reviewed-frame-2.png";

function NotificationsPage() {

  const { theme } = useTheme();
  const userAvatar = avatar; 
  const thumbnail = dummyThumb;

  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    const fetchNotifications = () => {
      setNotificationList(notifications);
    };

    fetchNotifications();
  }, []);

const getNotificationValue = (notification) => {
  if (notification.eventType === "followed") {
    return " you";
  } else if (
    (notification.eventType === "liked" || notification.eventType === "reviewed") &&
    notification.objectId
  ) {
    const linkTarget =
      notification.eventType === "reviewed"
        ? `/recipe/${notification.objectId}#reviews`
        : `/recipe/${notification.objectId}`;
    return (
      <>
        {" your "}
        <Link className="notification-link" to={linkTarget}>
          {notification.objectName || "item"}
        </Link>
      </>
    );
  } else {
    return <span style={{ color: "red" }}>error</span>;
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
              <h3 className="notifications-page-panel-title">Yesterday</h3>
              {notificationList.map((notification, index) => (
               
                <div key={index} className="notifications-page-panel-item">
              
                  <img
                    src={notification.eventAvatarUrl || userAvatar}
                    alt="avatar"
                    className="user-image"
                  />
                  <p className="notifications-page-panel-desc">
                    {notification.eventUsername || "Anonymous"} {notification.eventType} 
                    {getNotificationValue(notification)}  {notification.happenedAt ?  
                           <>
                           <span> on </span> <span className="reviews-true-date">
                          {new Date(notification.happenedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}{" "}
                          at{" "}
                          {new Date(notification.happenedAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </span></>
                    : 
                    "at some time"}.
                  </p>
                  <>
                    {notification.eventType === "reviewed" ? (
                      <div className="event-reviewed-group">
                        <img
                          src={theme === "dark" ? darkReviewedFrame : lightReviewedFrame}
                          alt="like-frame"
                          className="event-image-reviewed-frame"
                        />
                      <img
                        src={notification.objectImageUrlArray[0] || thumbnail}
                        alt="avatar"
                        className="event-image-reviewed"
                      />
                      </div>
                    ) : notification.eventType === "liked" ? (

                      <div className="event-liked-group">
                            <img
                        src={theme === "dark" ? darkLikedFrame : lightLikedFrame}
                        alt="like-frame"
                        className="event-image-liked-frame"
                      />
                      <img
                        src={notification.objectImageUrlArray[0] || thumbnail}
                        alt="avatar"
                        className="event-image-liked"
                      />
                      </div>
                    ) : notification.eventType === "followed" ? (
                      <img
                        src={theme === "dark" ? followDark : followLight}
                        alt="avatar"
                        className="event-image-followed"
                      />
                    ) : (
                      <span style={{ color: "red" }}>error</span>
                    )}
                  </>
                </div>
              ))}
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
