import React, { Component } from "react";
import { Container, Row, Col, Button, FormInput } from "shards-react";
import "../../css/content-box.css";
import "./skin.css";
import "../../media/icons/iconsmind/line-icons.min.css";
import GetVideo from "../../../common/GetVideo";

class Main extends Component {
  render() {
    return (
        <>
        <main>
            <section className="section-image light section-bottom-layer" style={{backgroundImage:require("./media/bg.svg")}}>
                <div className="container">
                    <hr className="space" />
                    <div className="row">
                        <div className="col-lg-6" data-anima="fade-in" data-time="1000">
                            <hr className="space-lg hidden-md" />
                            <h1 className="text-warning">
                                Welcome to The Lifestyle Hub Academy.
                            </h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboriso.
                            </p>
                            <Button className="btn btn-sm bg-warning mt-0 mx-3"><i className="im-apple-bite"></i>App store</Button>
                            <Button className="btn btn-sm bg-warning mx-3"><i className="im-android"></i>Play store</Button>
                           <hr className="space-xs" />
                        </div>
                        <div className="col-lg-6" data-anima="fade-bottom" data-time="1000">
                            <img src={require("./media/phone-1.png")} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section id="overview" className="section-base bg-white">
                <div className="container py-5">
                    <Row className="pt-5 mt-4">
                       
                        <Col  sm="12" className="col-lg-6 order-md-first">
                            <h2>Global support in a<br />range of different languages.</h2>
                            <p>
                                Lorem ipsum dolor sit amet no sea takimata sanctus est Lorem ipsum dolor sit amete.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco sea takimata sanctus eslaboriso.
                            </p>
                        </Col>
                        <Col sm="12" className="col-lg-6 text-light">
                            <hr className="space-xs" />
                            <ul className="icon-list icon-circle icon-list-11">
                                <li>Lorem ipsum dolor sit ameteminim veniam amoartes.</li>
                                <li>Lorem exercitation ipsum dolor sittakimata amete magna doloros.</li>
                                <li>Aullamco ipsum dolor sit amete sanctus artes.</li>
                                <li>Ut enim ad minim veniam, quis nostrud exercitation tempore.</li>
                                <li>Aullamco ipsum dolor sitare amete magna magna.</li>
                            </ul>
                        </Col>
                    </Row>
                    <hr className="space" />
                    <div className="grid-list" data-columns="4" data-columns-xs="1" data-anima="fade-bottom" data-timeline="asc" data-timeline-time="300" data-time="1000">
                        <Row className="grid-box">
                            <Col sm="1" className="col-lg col-md grid-item anima">
                                <div className="cnt-box cnt-box-top-icon">
                                    <i className="im-checked-user text-warning"></i>
                                    <div className="caption">
                                        <h2>Creative community</h2>
                                        <p>
                                            Lorem ipsum dolor sitamet ullamco labor consenso.
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12" className="col-lg col-md grid-item anima">
                                <div className="cnt-box cnt-box-top-icon">
                                    <i className="im-leafs text-warning"></i>
                                    <div className="caption">
                                        <h2>Eco friendly</h2>
                                        <p>
                                            Lorem ipsum dolor sitamere ullamacone laboret presio.
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="1" className="col-lg col-md grid-item anima">
                                <div className="cnt-box cnt-box-top-icon">
                                    <i className="im-globe-2 text-warning"></i>
                                    <div className="caption">
                                        <h2>Global support</h2>
                                        <p>
                                            Lorem ipsum dolor sita ullamco labormet conse orto.
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="1" className="col-lg col-md grid-item anima">
                                <div className="cnt-box cnt-box-top-icon">
                                    <i className="im-chemical-3 text-warning"></i>
                                    <div className="caption">
                                        <h2>Lot's of features</h2>
                                        <p>
                                            Lorem ipsum dolor sita ullamco labormet conse nobile.
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
            <section id="features" className="section-base section-color py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6" data-anima="fade-left" data-time="1000">
                            <img className="margin-23" src={require("./media/phone-2.png")} alt="" />
                        </div>
                        <div className="col-lg-6 col-md-6" data-anima="fade-right" data-time="1000">
                            <h2>Start private conversations <br />with experience mentors in seconds.</h2>
                            <p>
                                Lorem ipsum dolor sit ametno sea takimata sanctus est Lorem ipsum dolor sit amete.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco sea takimata sanctus eslaboriso.
                                Aipsum dolor sit amete sanctus artequis nostrud exercitation ullamco sea tassa.
                            </p>
                            
                        </div>
                    </div>
                    <hr className="space-sm" />
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6" data-anima="fade-left" data-time="1000">
                            <hr className="space-sm visible-md" />
                            <h2>Audio, video and ebook library <br />from your favorite authors.</h2>
                            <p>
                                Lorem ipsum dolor sit ametno sea takimata sanctus est Lorem ipsum dolor sit amete.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco sea takimata sanctus eslaboriso.
                                Aipsum dolor sit amete sanctus artequis nostrud exercitation ullamco sea tassa.
                            </p>
                            
                        </div>
                        <div className="col-lg-6 col-md-6" data-anima="fade-right" data-time="1000">
                            <img className="margin-23" src={require("./media/phone-3.png")} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-video align-center light">
                {/* <video autoplay loop muted playsinline poster="http://via.placeholder.com/1920x1080">
                    <source src="media/video.mp4" type="video/mp4">
                </video> */}
                <div className="container">
                <Row className="py-5 align-items-center container">
                    <Col sm="12" className="col-md">
                        <div className="container">
                         <GetVideo width="100%"/>
                        </div>
                    </Col>
                    <Col  className="col-md">
                    <div className="container">
                    <h2 className="text-warning">Don't wait download our app now.</h2>
                    <p className="width-650">
                        Lorem ipsum dolor sit amet no sea takimata sanctus est Lorem ipsum dolor sit amete
                        sare nostrud exercitation ullamco sea takiquis nostrud exercitatio.
                    </p>
                    <Button className="btn bg-warning mt-0 mx-3"><i className="im-apple-bite"></i>App store</Button>
                    <Button className="btn bg-warning mx-3"><i className="im-android"></i>Play store</Button>
                </div>
                    </Col>
                </Row>
                
                </div>
            </section>
            <section id="features" className="section-base section-color">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6" data-anima="fade-left" data-time="1000">
                            <img className="margin-23" src={require("./media/phone-5.png")} alt="" />
                        </div>
                        <div className="col-lg-6 col-md-6" data-anima="fade-right" data-time="1000">
                            <h2>Organize friends and<br />groups from the contacts area.</h2>
                            <p>
                                Lorem ipsum dolor sit ametno sea takimata sanctus est Lorem ipsum dolor sit amete.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco sea takimata sanctus eslaboriso.
                                Aipsum dolor sit amete sanctus artequis nostrud exercitation ullamco sea tassa.
                            </p>
                            
                        </div>
                    </div>
                    <hr className="space-sm" />
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6" data-anima="fade-left" data-time="1000">
                            <hr className="space-sm visible-md" />
                            <h2>Trusted all over the world<br />by a wide range of companies.</h2>
                            <p>
                                Lorem ipsum dolor sit ametno sea takimata sanctus est Lorem ipsum dolor sit amete.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco sea takimata sanctus eslaboriso.
                                Aipsum dolor sit amete sanctus artequis nostrud exercitation ullamco sea tassa.
                            </p>
                            
                        </div>
                        <div className="col-lg-6 col-md-6" data-anima="fade-right" data-time="1000">
                            <img className="margin-23" src={require("./media/phone-4.png")} alt="" />
                        </div>
                    </div>
                </div>
            </section>
             <section id="reviews" className="section-base bg-white py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h2>Loved all over the world<br />by a wide range of costumers.</h2>
                        </div>
                        <div className="col-lg-6 align-right align-left-md">
                            
                        </div>
                    </div>
                    <hr className="space" />
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="cnt-box cnt-box-testimonials-bubble rating-5">
                                <p>
                                    Lorem ipsum dolor sitamet consectetur adipisicing elito sed do eiusmod tempore artisio meto.
                                </p>
                                <div className="thumb-bar">
                                    <img src="http://via.placeholder.com/450x450" alt="" />
                                    <p>
                                        <span>Robert Junior</span>
                                        <span>Slack</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="cnt-box cnt-box-testimonials-bubble rating-5">
                                <p>
                                    Lorem ipsum dolor sitamet consectetur adipisicinge stratone elito sed do eiusmod tempore.
                                </p>
                                <div className="thumb-bar">
                                    <img src="http://via.placeholder.com/450x450" alt="" />
                                    <p>
                                        <span>Brad Manson</span>
                                        <span>Google</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="cnt-box cnt-box-testimonials-bubble rating-4">
                                <p>
                                    Lorem ipsum dolor sitamet consectetur adipisicing elito sed do eiusmod tempore eclessio.
                                </p>
                                <div className="thumb-bar">
                                    <img src="http://via.placeholder.com/450x450" alt="" />
                                    <p>
                                        <span>Jessica Poster</span>
                                        <span>Facebook</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="gallery" className="section-base section-full-width section-color align-center py-5">
                <div className="container">
                    <h2 className="text-center" >Don't wait download our app now.</h2>
                    <p className="width-650">
                        Lorem ipsum dolor sit amet no sea takimata sanctus est Lorem ipsum dolor sit amete
                        sare nostrud exercitation ullamco sea takiquis nostrud exercitatio.
                    </p>
                    <hr className="space" />
                    <ul className="slider d-flex" data-options="type:carousel,perView:5,perViewSm:2,perViewXs:1,focusAt:center,gap:0,nav:true,controls:out,autoplay:3000">
                        <li>
                            <img src={require("./media/phone-screen-1.png")} alt="" />
                        </li>
                        <li>
                            <img src={require("./media/phone-screen-2.png")} alt="" />
                        </li>
                        <li>
                            <img src={require("./media/phone-screen-3.png")} alt="" />
                        </li>
                        <li>
                            <img src={require("./media/phone-screen-4.png")} alt="" />
                        </li>
                        <li>
                            <img src={require("./media/phone-screen-5.png")} alt="" />
                        </li>
                        <li>
                            <img src={require("./media/phone-screen-6.png")} alt="" />
                        </li>
                    </ul>
                </div>
            </section>
            <section className="section-base align-center py-5">
                <div className="container">
                    <h2 className="text-warning text-center">Subscribe now.</h2>
                    <div className="width-650">
                        <p>Sare nostrud exercitation ullamco seitatio.</p>
                        {/* <hr className="space-sm" /> */}
                       
                            <div className="row">
                                <div className="col-lg-6
                                m-2">
                                    <FormInput id="name" name="name" placeholder="Eame and surname" type="text" className="input-text" required/>
                                </div>
                                <div className="col-lg-4
                                m-2">
                                    <FormInput id="email" name="email" placeholder="Email" type="email" className="input-text" required/>
                                </div>
                                <div className="col-lg-4
                                m-2">
                                    <Button className="bg-warning" type="submit">Subscribe</Button>
                                </div>
                            </div>
                            <div className="form-checkbox">
                                <input type="checkbox" id="check" name="check" value="check" required/>
                                <label for="check">You accept the terms of service and the privacy policy</label>
                            </div>
                           
                    </div>
                </div>
            </section>
        </main>
        <i className="scroll-top-btn scroll-top show"></i>
        
       
        </>
    );
  }
}

export default Main;


