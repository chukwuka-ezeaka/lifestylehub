import React from "react";
import { Container, Row, Col } from "shards-react";
import FooterSecoundary from "../../HomeComponents/FooterSecoundary";
import "./Contact.css";

import axios from "axios";

class Contact extends React.Component {
  state = {
    name: "",
    email: "",
    message: "",
    showErrorMessage: false,
    error: false,
    sent: false
  };

  handleNameChange = event => {
    event.preventDefault();
    this.setState({ name: event.target.value });
  };

  handleEmailChange = event => {
    event.preventDefault();
    this.setState({ email: event.target.value });
  };

  handleMessageChange = event => {
    event.preventDefault();
    this.setState({ message: event.target.value });
  };

  formSubmit = event => {
    event.preventDefault();

    let data = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    };

    axios
      .post("API_URI", data)
      .then(res => {
        this.setState({ sent: true }, this.resetForm());
      })
      .catch(error => {
        this.setState({
          errorMessage: "Message Sending Failed",
          showErrorMessage: true,
          error: true
        });
      });
  };

  resetForm = () => {
    this.setState({
      name: "",
      email: "",
      message: "",
      sent: false
    });
  };

  render() {
    let messageStatus = null;
    if (this.state.error && !this.state.sent) {
      messageStatus = (
        <p className="error-message">{this.state.errorMessage}</p>
      );
    }

    if (this.state.sent) {
      messageStatus = (
        <p className="success-message">Message successfully sent</p>
      );
    }

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
                  {messageStatus}
                  <form className="contact-form" onSubmit={this.formSubmit}>
                    <div className="form-row">
                      <div className="column-half">
                        <span className="box input-box name-box">
                          <input
                            type="text"
                            name="name"
                            required
                            className=""
                            placeholder="Your name"
                            onChange={this.handleNameChange}
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
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="column-full">
                        <span className="box text-area_box message-box">
                          <textarea
                            type="text"
                            name="message"
                            className="text-area"
                            required
                            placeholder="Your message"
                            value={this.state.message}
                            onChange={this.handleMessageChange}
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
