import "./HomeLayout.scss";
import { Outlet, NavLink } from "react-router-dom";
import IconResource from "../../_widgets/IconResource/IconResource";
import { Image, Dropdown } from "react-bootstrap";
import Avatar from "../../assets/avatar.png";
import Text from "../../_widgets/Text/Text";
import Logo from "../../assets/logo.png";
import Button from "../../_widgets/Button/Button";
import { isEmployee } from "../../helpers";
import { USER_DATA } from "../../constants/appConstants";

const HomeLayout = () => {

  const logout = () => localStorage.clear();

  const userData = JSON.parse(localStorage.getItem(USER_DATA));

  return (
    <div className="home">
      <div className="overlay-sidebar" onClick={() => document.body.classList.remove("side_active")}>
        <div className="sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="closebtn">
            <Button
              buttonType="icon"
              icon={<IconResource type="back" />}
              onClick={() => document.body.classList.remove("side_active")}
            />
          </div>
          <div className="w-100">
            <div className="top_menu justify-content-start">
              <div className="default_profile_pic" style={{ width: "45px", height: "45px", minWidth: "45px" }}>
                <Image src={Logo} />
              </div>
              <div className="d-flex align-items-center w-100">
                <Dropdown className="w-100 profile-dropdown">
                  <Dropdown.Toggle
                    className="p-0 m-0 border-0 w-100 justify-content-start"
                    variant="transparent"
                    id="dropdown-basic"
                    style={{ border: "1px solid var(--border-light)" }}
                  >
                    <div className="text-start">
                      <h5 style={{ fontWeight: 600, fontSize: "var(--p1)", color: "var(--black2)" }}>
                        EMS
                      </h5>
                      <p style={{ fontSize: "var(--p0)", textWrap: "wrap" }}>Employee Management System</p>
                    </div>
                  </Dropdown.Toggle>
                </Dropdown>
              </div>
            </div>

            <ul className="sidebar-links">
              {!isEmployee() && <li onClick={() => document.body.classList.remove("side_active")}>
                <NavLink to="/departments">
                  <IconResource type="departments" />
                  Departments
                </NavLink>
              </li>}

              <li onClick={() => document.body.classList.remove("side_active")}> <NavLink to="/employees">
                <IconResource type="users" />
                Employees
              </NavLink>
              </li>
            </ul>
          </div>

          <ul>
            <li>
              <div className="profile_menu">
                <div className="profile_pic">
                  <Image style={{ objectFit: "contain" }} src={Avatar} />
                </div>
                <Dropdown>
                  <Dropdown.Toggle
                    className="p-0 m-0 border-0"
                    variant="transparent"
                    id="dropdown-basic"
                  >
                    {userData?.name || 'User'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Dropdown.Item>
                      <NavLink to="/" onClick={logout} className="profile_menu">
                        <div className="profile_pic">
                          <IconResource type="logout" />
                        </div>
                        <Text text="Logout" />
                      </NavLink>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="main_outlet">
        <div className="minh80" >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
