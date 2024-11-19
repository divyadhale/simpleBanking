import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function SocialConnect(params) {
  return(
    <>
    <div className="socialConnect-main">
      <div className="header-section">
        Connect with us
        <span><FontAwesomeIcon icon={faAngleRight} /></span>
      </div>
      <div className="social-link-section">
        <div>Here's an easy way to share your thoughts, stay informed and join the conversation. Follow us:</div>
        <div>
          <img className="social-links" src={process.env.PUBLIC_URL + "ig.png"} alt=""/>
          <img className="social-links" src={process.env.PUBLIC_URL + "fb.png"} alt=""/>
          <img className="social-links" src={process.env.PUBLIC_URL + "twitter.png"} alt=""/>
          <img className="social-links" src={process.env.PUBLIC_URL + "yt.png"} alt=""/>
        </div>
      </div>
    </div>
    </>
  )
}

export default SocialConnect;
