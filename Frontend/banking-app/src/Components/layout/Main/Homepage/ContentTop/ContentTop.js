import { useContext } from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

import { iconsImgs } from "../../../../utils/images";
import { SidebarContext } from "../../../../context/sidebarContext";

import "./ContentTop.css";

export default function ContentTop() {
  const navigate = useNavigate();
  const { toggleSidebar } = useContext(SidebarContext);

  return (
    <div className="main-content-top">
        <div className="content-top-left">
            <button type="button" className="sidebar-toggler" onClick={ toggleSidebar }>
                <img src={ iconsImgs.menu } alt="" />
            </button>
            <h3 className="content-top-title">Balance Inquiry</h3>
        </div>
        <div className="content-top-btns">
            <button className="content-top-title" onClick={()=>{
              Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, log out!"
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/');
                  localStorage.clear();
                }
              });
              }}>Log out</button>
        </div>
    </div>
  )
}