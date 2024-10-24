import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faSearch } from '@fortawesome/free-solid-svg-icons';

import "./index.css"

function NavBar1() {
  return(
    <>
      <div className="main">
        <div className="child">
          <div className="option right-separator">Personal</div>
          <div className="option right-separator">Retail Business Banking</div>
          <div className="option right-separator">Business</div>
          <div className="option right-separator">Asset Management</div>
          <div className="option right-separator">Global Private Banking</div>
          <div className="option right-separator">HSBC Securities & Capital Markets</div>
          <div className="option">HSBC GIFT City</div>
        </div>
        <div className="child">
          <div className="option">English</div>
          <div className="option">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <div className="option">
            Register
            <FontAwesomeIcon className="left-margin" icon={faAngleRight} />
          </div>
          <div className="option login-button">Log on</div>
        </div>
      </div>
    </>
  )
}

export default NavBar1;