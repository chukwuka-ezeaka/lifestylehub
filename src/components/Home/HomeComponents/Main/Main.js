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
                            In hub academy we believe in the transfer of knowledge, wealth and the transformation of people’s mind as a way of
                             empowering them towards growth and significant achievement in every area of life.
                            </p>
                            <Button className="btn  btn-warning text-white mt-2 mx-3"><i className="im-apple-bite"></i>App store</Button>
                            <Button className="btn  btn-warning text-white mt-2 mx-3"><i className="im-android"></i>Play store</Button>
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
                            <h2>Get tailored mentorships in a <br />range of different categories.</h2>
                            <p>
                            Still looking for someone to mentor you in your area of interest? Hub academy 
                            provides you with various mentors on demand that are vast in various fields and have 
                            records of achievement over years of experience
                            </p>
                        </Col>
                        <Col sm="12" className="col-lg-6 text-light">
                            <hr className="space-xs" />
                            <ul className="icon-list icon-circle icon-list-11">
                                <li>We covers areas like business, management, family, finances, relationships, planning, 
                                    and more topics that affects the day to day life of the average person. </li>
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
                                        <h2>Identify </h2>
                                        <p>
                                        Identify 
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12" className="col-lg col-md grid-item anima">
                                <div className="cnt-box cnt-box-top-icon">
                                    <i className="im-leafs text-warning"></i>
                                    <div className="caption">
                                        <h2>Choose</h2>
                                        <p>
                                        Choose any author that you like from the list available
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="1" className="col-lg col-md grid-item anima">
                                <div className="cnt-box cnt-box-top-icon">
                                    <i className="im-globe-2 text-warning"></i>
                                    <div className="caption">
                                        <h2>Subscribe</h2>
                                        <p>
                                        Subscribe to join their team of mentees on the go
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="1" className="col-lg col-md grid-item anima">
                                <div className="cnt-box cnt-box-top-icon">
                                    <i className="im-chemical-3 text-warning"></i>
                                    <div className="caption">
                                        <h2>Participate</h2>
                                        <p>
                                        Participate in the daily tips and guides they provide in that industry 
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
                            <h2>Start private sessions with <br />experienced counselors in seconds.</h2>
                            <p>
                            We understand that sometimes, having a mentor and participating in a general discussion is not enough because 
                            you have sensitive or personal issues that you want to discuss. Get hooked up with counsellors who will take 
                            time to listen to you and provide professional advice in what you are in interested in talking about
                            </p>
                            
                        </div>
                    </div>
                    <hr className="space-sm" />
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6" data-anima="fade-left" data-time="1000">
                            <hr className="space-sm visible-md" />
                            <h2>Audio, video and ebook libraries <br />from your favorite authors.</h2>
                            <p>
                            There’s more! Get any book, video or audio you want from our library both free and paid versions. 
                            Digest a daily dose of knowledge and empower yourself in your industry of choice. 
                            Knowledge improves your ability of apply solution at any given time or circumstance 
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
                         <GetVideo width="100%"/>
                    </Col>
                    <Col  className="col-md">
                    <h2 className="text-warning">Don't wait download our app now.</h2>
                    <p className="width-650">
                    We already have our applications online. To act is to progress. Don’t wait for another second. 
                    Immediately take the simple steps to download and install Hub Academy mobile Application.
                    </p>
                    <Button className="btn  btn-warning text-white mt-0 mb-2 mx-3"><i className="im-apple-bite"></i>App store</Button>
                    <Button className="btn  btn-warning text-white mb-2 mx-3"><i className="im-android"></i>Play store</Button>
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
                            <h2>Organize Todo's effectively <br />from the Todo area.</h2>
                            <p>
                            Planning action steps is important to mastering any knowledge base you have acquired.
                             Let us remind you of your tasks on the go so you do no forget. Take your time write down your todo
                              list and you will not forget a thing again.
                            </p>
                            
                        </div>
                    </div>
                    <hr className="space-sm" />
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6" data-anima="fade-left" data-time="1000">
                            <hr className="space-sm visible-md" />
                            <h2>Get daily reflections <br />to help you kickstart your day.</h2>
                            <p>
                            We want you to keep focus everyday you wake up. Download the application and get the daily reflection by Abioye Oke 
                            that will give you a 365 days guide on what to do per day. You will never again have any day when you do not know what 
                            exactly to do to build a productive life. 
                            </p>
                            
                        </div>
                        <div className="col-lg-6 col-md-6" data-anima="fade-right" data-time="1000">
                            <img className="margin-23" src={require("./media/phone-n1.png")} alt="" />
                        </div>
                    </div>
                </div>
            </section>
             {/* <section id="reviews" className="section-base bg-white py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h2>Reviewed from all over the world <br />by a wide range of users.</h2>
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
            </section> */}
            <section id="gallery" className="section-base section-full-width bg-white align-center py-5">
                <div className="container">
                    <h2 className="text-center" >Don't wait download our app now.</h2>
                    <p className="width-650">
                    Don’t wait to be told what is happening in the life of others. Immediately click on 
                    the links above to download the Hub Academy and improve your lifestyle automatically 
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
                        <p>Stay up to date on all new features and events of the Hub Academy.</p>
                        {/* <hr className="space-sm" /> */}
                       
                            <div className="row">
                                <div className="col-lg-6
                                m-2">
                                    <FormInput id="name" name="name" placeholder="Name and surname" type="text" className="input-text" required/>
                                </div>
                                <div className="col-lg-4
                                m-2">
                                    <FormInput id="email" name="email" placeholder="Email" type="email" className="input-text" required/>
                                </div>
                                <div className="col-lg-4
                                m-2">
                                    <Button className=" btn-warning text-white" type="submit">Subscribe</Button>
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


