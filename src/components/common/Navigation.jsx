import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import MyDocDayLogo from "../../assets/NavLogo.svg";
import { currentUser } from "../../data/constants";
import { useAuth } from "../../store/AuthContext";

const Navigation = () => {
  const { user } = useAuth();

  const navItems = [
    { label: "Overview", href: "/dashboard/" },
    { label: "Your Doctors", href: "/dashboard/doctors" },
    { label: "Appointments", href: "/dashboard/appointments" },
    { label: "Reminders", href: "/dashboard/reminders" },
    { label: "Account", href: "/dashboard/account" },
  ];

  return (
    <>
      <div className="container" id="navigation">
        <div className="row py-2">
          <div className="col-12 d-flex justify-content-between">
            <img src={MyDocDayLogo} alt="MyDocDay Logo" className="navlogo" />
            <div className="d-flex align-items-center gap-3">
              <h2 className="h5 m-0 font-inter fw-semibold text-body d-none d-sm-block">
                Hello, {user?.first_name}
              </h2>
              {currentUser.profilePhoto ? (
                <img
                  alt="User Profile"
                  src={currentUser.profilePhoto}
                  className="nav-profile-image rounded-circle"
                />
              ) : (
                <div className="rounded-circle bg-light nav-profile-image d-flex align-items-center justify-content-center">
                  <span className="h4 m-0 fw-bold text-body">
                    {currentUser.firstName[0]}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary">
        <div className="container">
          <div className="row py-3 justify-content-center">
            <ul className="d-none d-md-flex justify-content-center gap-2 list-unstyled m-0 align-items-center">
              {navItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.href}
                    end={item.href === "/dashboard/"}
                    className={({ isActive }) =>
                      `py-2 px-3 rounded-2 cursor-pointer text-decoration-none ${
                        isActive ? "bg-primary-light" : ""
                      }`
                    }
                  >
                    <span className="text-white font-inter font-body">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
