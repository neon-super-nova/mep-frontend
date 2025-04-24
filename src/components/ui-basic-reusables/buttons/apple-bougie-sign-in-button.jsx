import AppleSignin from 'react-apple-signin-auth';
import './button.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faApple } from '@fortawesome/free-brands-svg-icons';

/** Apple Signin button */
const MyAppleSigninButton = () => (
  <AppleSignin
    /** Auth options passed to AppleID.auth.init() */
    authOptions={{
      /** Client ID - eg: 'com.example.com' */
      clientId: 'com.example.web',
      /** Requested scopes, separated by spaces - eg: 'email name' */
      scope: 'email name',
      /** Apple's redirectURI - must be one of the URIs you added to the serviceID */
      redirectURI: 'https://example.com',
      /** State string that is returned with the Apple response */
      state: 'state',
      /** Nonce */
      nonce: 'nonce',
      /** Uses popup auth instead of redirection */
      usePopup: true,
    }} // REQUIRED
    /** General props */
    uiType="dark"
    /** Removes default style tag */
    noDefaultStyle={false}
    /** Allows changing the button's children, eg: for changing the button text */
    buttonExtraChildren="Continue with Apple"
    /** Extra controlling props */
    /** Called upon signin success in case authOptions.usePopup = true */
    onSuccess={(response) => console.log(response)} // default = undefined
    /** Called upon signin error */
    onError={(error) => console.error(error)} // default = undefined
    /** Skips loading the Apple script if true */
    skipScript={false} // default = undefined
    /** Render function - called with all props - can be used to fully customize the UI */
    render={(props) => (
      <button {...props} className="apple-auth-btn">
        <FontAwesomeIcon icon={faApple} className="apple-icon" style={{ marginRight: '8px' }} />
        Sign in with Apple
      </button>
    )}
  />
);

export default MyAppleSigninButton;
