import React, { Component } from "react";
import { Row, Col } from "shards-react";
import HttpService from "../../../utils/API";
import "./Chat.css";

import UserList from "../../../components/applications/UserList";
import ChatBox from "../../../components/applications/ChatBox";
import ErrorModal from "../../../components/applications/ErrorModal";
import io from "socket.io-client";

import "react-chat-elements/dist/main.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import events from "../../containerUtils/events";

const _http = new HttpService();

/**
 * Fetches socket server URL from env
 */
// const SOCKET_URI = "http://localhost:5000";

const SOCKET_URI = "https://lshub.herokuapp.com/api/v1/chat";

class Chat extends Component {
  socket = null;

  state = {
    userChatData: [], // this contains users from which signed-in user can chat and its message data.
    sender: {
      username: this.props.user.firstname,
      id: this.props.user.id,
      name: this.props.user.fullname,
    },
    selectedUserIndex: null,
    typing: "",
    error: false,
    errorMessage: "",
  };

  /**
   *
   * Setups Axios to monitor XHR errors.
   * Initiates and listen to socket.
   * fetches User's list from backend to populate.
   */
  componentDidMount() {
    this.initAxios();
    this.initSocketConnection();
    this.setupSocketListeners();
    this.fetchUsers();
  }

  initSocketConnection() {
    this.socket = io.connect(SOCKET_URI);
  }

  // /**
  //  *
  //  * Checks if request from axios fails
  //  * and if it does then shows error modal.
  //  */
  initAxios() {
    axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        this.setState({
          errorMessage: `Couldn't connect to server. try refreshing the page.`,
          error: true,
        });
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        this.setState({
          errorMessage: `Some error occured. try after sometime`,
          error: true,
        });
        return Promise.reject(error);
      }
    );
  }

  /**
   *
   * Shows error if client gets disconnected.
   */
  onClientDisconnected() {
    NotificationManager.error(
      "Connection Lost from server please check your connection.",
      "Error!"
    );
  }

  /**
   *
   * Check error.
   */
  ifError() {
    NotificationManager.error("Unable to send message.", "Error!");
  }

  /**
   *
   * Established new connection.
   */
  onConnection() {
    if (this.state.sender) {
      console.log("connected");
      NotificationManager.success("Connection Established.", "Success");
    }
  }

  /**
   *
   * Checks if Client is connected
   */
  onClientConnected(data) {
    console.log(data);
    NotificationManager.success(`User is connected successfully`);
  }

  /**
   *
   * Setup all listeners
   */
  setupSocketListeners() {
    // TYPING EVENTS
    this.socket.on(events.TYPING, this.onTyping.bind(this));
    this.socket.on("connection", this.onConnection.bind(this));

    // CONNECTED EVENT
    this.socket.on(events.USER_CONNECTED, this.onClientConnected.bind(this));
    this.socket.on(events.PRIVATE_MESSAGE, this.onMessageRecieved.bind(this));
    this.socket.emit(
      events.USER_CONNECTED,
      this.state.sender,
      this.ifError.bind(this)
    );
    this.socket.on("disconnect", this.onClientDisconnected.bind(this));
  }

  /**
   *
   * Fetch all users
   */
  fetchUsers() {
    const { sender } = this.state;

    const url = "account/user/list/with_roles";
    _http.sendGet(url).then((response) => {
      response.data
        ? this.setState({
            userChatData: response.data.filter(
              (u) => u.id !== sender.id && u.UserRole.roleId === 100
            ),
          })
        : this.setState({
            errorMessage: `Couldn't connect to server. try refreshing the page`,
            error: true,
          });
    });
  }

  /**
   *
   * @param {MessageRecievedFromSocket} message
   *
   * Triggered when message is received.
   * It can be a message from user himself but on different session (Tab).
   * so it decides which is the position of the message "right" or "left".
   *
   * increments unread count and appends in the messages array to maintain Chat History
   */

  onMessageRecieved(message) {
    console.log(message, "message recieved");
    let userChatData = this.state.userChatData;
    let messageData = message.message;
    let targetId;
    if (message.sender_id === this.state.sender.id) {
      messageData.position = "right";
      targetId = message.reciever_id;
    } else {
      messageData.position = "left";
      targetId = message.sender_id;
    }
    let targetIndex = userChatData.findIndex((u) => u.id === targetId);
    if (!userChatData[targetIndex].messages) {
      userChatData[targetIndex].messages = [];
    }
    if (targetIndex !== this.state.selectedUserIndex) {
      if (!userChatData[targetIndex].unread) {
        userChatData[targetIndex].unread = 0;
      }
      userChatData[targetIndex].unread++;
    }
    userChatData[targetIndex].messages.push(messageData);
    this.setState({ userChatData });
  }

  /**
   *
   * @param {ChatItem} e
   *
   * handles if user clickes on ChatItem on left.
   */
  onChatClicked(e) {
    this.toggleViews();
    let users = this.state.userChatData;
    for (let index = 0; index < users.length; index++) {
      if (users[index].id === e.user.id) {
        users[index].unread = 0;
        this.setState({
          selectedUserIndex: index,
          userChatData: users,
        });
        return;
      }
    }
  }

  /**
   *
   * @param {messageText} text
   *
   * creates message in a format in which messageList can render.
   * position is purposely omitted and will be appended when message is received.
   */
  createMessage(text) {
    const { sender, userChatData, selectedUserIndex } = this.state;

    const message = {
      sender_username: sender.username,
      sender_id: sender.id,
      sender_name: sender.name,
      reciever_username: userChatData[selectedUserIndex].firstname,
      reciever_id: userChatData[selectedUserIndex].id,
      reciever_name: userChatData[selectedUserIndex].firstname,
      message: {
        type: "text",
        text: text,
        date: +new Date(),
        className: "message",
      },
    };
    this.socket.emit(events.PRIVATE_MESSAGE, message, ({ error }) => {
      console.log(error);
    });
  }

  /**
   *
   * @param {Typing New Message} text
   *
   * Alerts Users to message typing events
   */
  onTyping(data) {
    if (data.id === 90) {
      this.setState({ typing: `${data.name} is typing` });
      setTimeout(() => {
        this.setState({ typing: "" });
      }, 2000);
    }
  }

  /**
   * Toggles views from 'ChatList' to 'ChatBox'
   *
   * only on Phone
   */
  toggleViews() {
    this.setState({
      showChatBox: !this.state.showChatBox,
      showChatList: !this.state.showChatList,
    });
  }

  /**
   * Toggles error modal after init axios fails
   *
   */
  toggleModal() {
    this.setState({
      error: false,
    });
  }

  render() {
    const { sender, userChatData, selectedUserIndex } = this.state;

    let initChat = null;

    if (sender) {
      initChat = (
        <div>
          <Row>
            <Col md={4}>
              <UserList
                userData={this.state.userChatData}
                onChatClicked={this.onChatClicked.bind(this)}
              />
            </Col>
            <Col md={8}>
              <ChatBox
                signedInUser={sender}
                onSendClicked={this.createMessage.bind(this)}
                onBackPressed={this.toggleViews.bind(this)}
                targetUser={userChatData[selectedUserIndex]}
              />
            </Col>
          </Row>
          <ErrorModal
            show={this.state.error}
            errorMessage={this.state.errorMessage}
            onToggle={this.toggleModal.bind(this)}
          />
          <NotificationContainer />
        </div>
      );
    }

    return <div>{initChat}</div>;
  }
}

export default Chat;
