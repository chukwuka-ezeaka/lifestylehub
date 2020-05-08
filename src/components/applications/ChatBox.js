import React, { Component } from "react";
import Col from "react-bootstrap/lib/Col";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import {
  Card,
  CardHeader,
  CardBody,
  CardSubtitle,
  FormInput,
  InputGroup,
  Button,
  FormGroup,
  InputGroupAddon,
} from "shards-react";
import { Navbar as NavbarComponent, Avatar } from "react-chat-elements";
import { MessageList } from "react-chat-elements";

/**
 *
 * ChatBox Component
 *
 * displays all the messages from chat history.
 * renders message text box for input.
 */
export default class ChatBox extends Component {
  state = {
    messageText: "",
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
    this.props.userTyping();
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
    return (
      <div>
        {this.props.targetUser ? (
          <div>
            <NavbarComponent
              left={
                <div>
                  <Col mdHidden lgHidden>
                    <p className="navBarText">
                      <Glyphicon
                        onClick={this.props.onBackPressed}
                        glyph="chevron-left"
                      />
                    </p>
                  </Col>
                  <Avatar
                    alt={this.props.targetUser.firstname}
                    size="large"
                    type="circle flexible"
                    src={this.props.targetUser.photo}
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
                  maxLength="300"
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
              <h1>Hello, {(this.props.signedInUser || {}).name}!</h1>
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
