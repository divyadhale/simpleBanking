import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes(params) {
  const { Comp } = params;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const cred = token ? atob(token) : undefined;

    if(!cred) {
      navigate("/");
    }
  })

  return(
    <>
      <Comp />
    </>
  )
}

export default ProtectedRoutes;