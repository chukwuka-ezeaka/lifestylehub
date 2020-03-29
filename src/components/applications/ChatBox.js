import React, { Component } from "react";
import { Card, CardBody, CardHeader, CardSubtitle } from "shards-react";
import {
  FormInput,
  InputGroup,
  Button,
  FormGroup,
  Col,
  InputGroupAddon
} from "shards-react";

// import Jumbotron from "react-bootstrap/lib/Jumbotron";
// import Glyphicon from "react-bootstrap/lib/Glyphicon";
import {
  MessageList,
  Navbar as NavbarComponent,
  Avatar
} from "react-chat-elements";

/**
 *
 * ChatBox Component
 *
 * displays all the messages from chat history.
 * renders message text box for input.
 */

export default class ChatBox extends Component {
  state = {
    messageText: ""
  };

  /**
   *
   * Sends a message only if it is not falsy.
   */
  onSendClicked() {
    if (!this.state.messageText) {
      return;
    }
    this.props.onSendClicked(this.state.messageText);
    this.setState({ messageText: "" });
  }

  onMessageInputChange(e) {
    this.setState({ messageText: e.target.value });
  }

  /**
   *
   * @param {KeyboardEvent} e
   *
   * listen for enter pressed and sends the message.
   */
  onMessageKeyPress(e) {
    if (e.key === "Enter") {
      this.onSendClicked();
    }
  }

  render() {
    console.log(this.props.targetUser);
    return (
      <div>
        {this.props.targetUser ? (
          <div>
            <NavbarComponent
              left={
                <div>
                  <Col mdHidden lgHidden>
                    <p className="navBarText"></p>
                  </Col>
                  <Avatar
                    alt={this.props.targetUser.firstname}
                    size="large"
                    type="circle flexible"
                  />
                  <p className="navBarText">
                    {this.props.targetUser.firstname}
                  </p>
                </div>
              }
            />
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={this.props.targetUser.messages}
            />
            <FormGroup>
              <InputGroup>
                <FormInput
                  type="text"
                  value={this.state.messageText}
                  onChange={this.onMessageInputChange.bind(this)}
                  onKeyPress={this.onMessageKeyPress.bind(this)}
                  placeholder="Type a message here (Limit 200 characters)..."
                  ref="messageTextBox"
                  className="messageTextBox"
                  maxLength="200"
                  autoFocus
                />
                <InputGroupAddon type="append">
                  <Button
                    disabled={!this.state.messageText}
                    className="sendButton"
                    theme="secondary"
                    onClick={this.onSendClicked.bind(this)}
                  >
                    Send
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </div>
        ) : (
          <Card className="text-center">
            <CardHeader>
              <h1>Hello, {(this.props.signedInUser || {}).fullname}!</h1>
            </CardHeader>
            <CardBody>
              <CardSubtitle>
                <p>Select a friend to start a chat.</p>{" "}
              </CardSubtitle>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}
