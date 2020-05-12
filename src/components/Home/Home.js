import React from "react";
//import { Container, Row, Col } from "shards-react";
import Header from "./HomeComponents/Header";
import FirstSection from "./HomeComponents/FirstSection";
import SecoundSection from "./HomeComponents/SecoundSection";
import FooterSecoundary from "./HomeComponents/FooterSecoundary";

import "./css/style.css";
import "./css/btn.css";
import "./css/corporate.css";
import "./css/fonts/font-awesome/css/font-awesome.css";
import "./css/fonts/et-line-font/et-line-font.css";
import Main from "./HomeComponents/Main/Main";

class Landing extends React.Component {
  render() {
    return (
      <div >
        {/* <Header /> */}
        <Main />
        {/* <SecoundSection /> */}
        <FooterSecoundary />
      </div>
    );
  }
}
export default Landing;
