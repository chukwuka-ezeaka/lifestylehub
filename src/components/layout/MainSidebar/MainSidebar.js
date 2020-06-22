import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Col } from "shards-react";
import { withRouter } from "react-router-dom";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";

import { Store } from "../../../flux";
const initialState = {
  menuVisible: false,
  sidebarNavItems: null
}
class MainSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentDidMount(){
    this.setState({sidebarNavItems: Store.getSidebarItems()})
  }

  componentWillUnmount() {
    this.setState(initialState);
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      menuVisible: Store.getMenuState(),
      sidebarNavItems: Store.getSidebarItems()
    });
  }

  render() {
    const classes = classNames(
      "main-sidebar",
      "px-0",
      "col-8",
      this.state.menuVisible && "open"
    );

    return (
      <Col
        style={{ backgroundColor: "rgba(0,0,0,1)" }}
        tag="aside"
        className={classes}
        lg={{ size: 2 }}
        md={{ size: 3 }}
      >
        <SidebarMainNavbar hideLogoText={this.props.hideLogoText} />
        {/* <SidebarSearch /> */}
        <SidebarNavItems />
      </Col>
    );
  }
}

MainSidebar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

MainSidebar.defaultProps = {
  hideLogoText: false
};

export default withRouter(MainSidebar);
