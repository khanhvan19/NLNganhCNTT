import styles from "./Header.module.css";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function AdminHeader() {
  const navigate = useNavigate();
  const currentAdmin = localStorage.admin
    ? JSON.parse(localStorage.admin)
    : null;
  useEffect(() => {
    if (currentAdmin === null) {
      navigate("/admin/login");
    }
  });
  const handleSignOut = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className={styles.adminHeader}>
      <div className="d-flex">
        <button>
          {currentAdmin && (
            <img src={currentAdmin.avt} className={styles.avt} alt="" />
          )}
        </button>
        <span className="ms-2">
          <div className="fw-bold">Hello! Admin VBook</div>
          <button className={styles.adminLogout} onClick={handleSignOut}>
            Sign Out
          </button>
        </span>
      </div>
    </div>
  );
}

export default AdminHeader;
