import { useState } from "react";
import MyDocDayLogo from "../../assets/NavLogo.svg";
import { currentUser } from "../../data/user";

const Navigation = () => {
  const navItems = [
    { label: "Overview" },
    { label: "Your Doctors" },
    { label: "Appointments" },
    { label: "Calendar" },
    { label: "Reminders" },
    { label: "Account" },
  ];
  const [activeLabel, setActiveLabel] = useState(navItems[0].label);
  const handleNavItemClick = (label) => {
    setActiveLabel(label);
  };

  return (
    <div className="container" id="navigation">
      <div className="row py-2">
        <div className="col-12 d-flex justify-content-between">
          <img src={MyDocDayLogo} alt="MyDocDay Logo" className="navlogo" />
          <div className="d-flex align-items-center gap-3">
            <h2 className="h5 m-0 font-inter fw-semibold text-body d-none d-sm-block">
              Hello, {currentUser.firstName}
            </h2>
            {currentUser.profilePhoto ? (
              <img
                alt="User Profile Image"
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
      <div className="row bg-primary py-3 justify-content-center">
        <ul className="d-none d-md-flex justify-content-end justify-content-md-center gap-2 list-unstyled m-0 align-items-center">
          <button className="d-md-none nav-menu"></button>
          {navItems.map((item) => {
            const isActive = item.label === activeLabel;
            return (
              <li
                key={item.label}
                className={`${isActive ? "bg-active" : ""} py-1 px-3 rounded-2`}
              >
                <a
                  className="text-white text-decoration-none font-inter font-body cursor-pointer"
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavItemClick(item.label);
                  }}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
