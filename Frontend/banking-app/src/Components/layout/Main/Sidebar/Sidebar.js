import React, { useEffect, useState, useContext } from 'react';

import { navigationLinks } from '../../../data/data';
import { SidebarContext } from '../../../context/sidebarContext';

import "./Sidebar.css";

export default function Sidebar() {
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  let loc = window.location.href.split("/");
  let cur = loc[loc.length - 1];

  useEffect(() => {
    if(isSidebarOpen){
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  return (
    <div className={ `sidebar ${sidebarClass}` }>
      <div className="user-info">
          <span className="info-name">Green Bank</span>
      </div>
      <nav className="navigation">
          <ul className="nav-list">
            {
              navigationLinks.map((navigationLink) => (
                <li className="nav-item" key = { navigationLink.id }>
                  <a href={ navigationLink.link } className={ `nav-link ${ navigationLink.name === cur ? 'active' : null }` }>
                      <img src={ navigationLink.image } className="nav-link-icon" alt = { navigationLink.title } />
                      <span className="nav-link-text">{ navigationLink.title }</span>
                  </a>
                </li>
              ))
            }
          </ul>
      </nav>
    </div>
  )
}