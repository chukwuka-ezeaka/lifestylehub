import React from "react";
import { Container, Row, Col } from "shards-react";
import FooterSecoundary from "../../HomeComponents/FooterSecoundary";
import "./Contact.css";

class Contact extends React.Component {
  render() {
    return (
      <div className="contact">
        <section className="section-main">
          <Container>
            <Row>
              <Col md="12">
                <div className="text-center">
                  <h2>Let’s talk about something awesome.</h2>
                  <p>
                    Drop us a line, or give us a heads up if you’re interested
                    in visiting us.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {
          //   ===========================================================
        }

        <section className="section-contact">
          <Container>
            <Row>
              <Col md="12" className="text-center">
                <div>
                  <h2>Get in touch</h2>
                  <p>Let's talk about your LifeStyle</p>
                </div>
                <div class="title-line"></div>

                <div className="form">
                  <form>
                    <div className="form-row">
                      <div className="column-half">
                        <span className="box input-box name-box">
                          <input
                            type="text"
                            name="name"
                            required
                            className=""
                            placeholder="Your name"
                          />
                        </span>
                      </div>
                      <div className="column-half">
                        <span className="box input-box email-box">
                          <input
                            type="email"
                            name="email"
                            required
                            className=""
                            placeholder="Your email"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="column-full">
                        <span className="box text-area_box message-box">
                          <textarea
                            name="your-message"
                            className="text-area"
                            required
                            placeholder="Your message"
                          ></textarea>
                        </span>
                      </div>
                    </div>
                    <button type="submit" className="button">
                      Send message
                    </button>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <FooterSecoundary />
      </div>
    );
  }
}
export default Contact;
