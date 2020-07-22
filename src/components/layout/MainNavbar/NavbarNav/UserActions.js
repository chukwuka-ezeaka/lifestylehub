import React, { useState, useContext} from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

import { AuthContext } from "../../../../contexts/AuthContext";
import constants from "../../../../reducers/constants";
//import { AuthContext } from "../../../../contexts/AuthContext";
function UserActions(props){
  const { user, dispatch } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const logout = () => {
    dispatch({type: constants.IS_LOGGED_OUT})
  }

  const toggleUserActions = () => {
    setVisible(!visible)
  }

  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
        <img
          className="user-avatar rounded-circle mr-2 pointer"
          src={require("./../../../../images/avatars/0.png")}
          alt="User Avatar"
        />{" "}
        <span className="d-none d-md-inline-block pointer">
          {user ? user.data.fullname : ""}
        </span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible}>
        <DropdownItem tag={Link} to="/profile">
          <i className="material-icons">&#xE7FD;</i> Profile
        </DropdownItem>
        {/* <DropdownItem tag={Link} to="#">
          <i className="material-icons">&#xE2C7;</i> Files
        </DropdownItem> */}
        <DropdownItem divider />
        <DropdownItem onClick={logout} className="text-danger">
          <i className="material-icons text-danger">&#xE879;</i> Logout
        </DropdownItem>
      </Collapse>
    </NavItem>
  )
}

export default UserActions;
