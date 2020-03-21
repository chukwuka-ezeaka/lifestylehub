import React, { Component } from "react";
import { Row, Col } from "shards-react";
import HttpService from "../../utils/API";
import "./Chat.css";
import UserList from "../../components/applications/UserList";
import ChatBox from "../../components/applications/ChatBox";
import ErrorModal from "../../components/applications/ErrorModal";
import LoadingModal from "../../components/applications/LoadingModal";
import io from "socket.io-client";
import "react-chat-elements/dist/main.css";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import Subscribers from "../../components/Admin/Users/Subscribers";
import events from "./Utils/events";

/**
 * Fetches socket server URL from env
 */
const SOCKET_URI = process.env.REACT_APP_SERVER_URI;

/**
 * App Component
 *
 * initiaites Socket connection and handle all cases like disconnected,
 * reconnected again so that user can send messages when he is back online
 *
 * handles Error scenarios if requests from Axios fails.
 *
 */

// const _http = new HttpService();

class Chat extends Component {
  socket = null;

  constructor(props) {
    super(props);
    this.state = {
      userChatData: [], // this contains users from which signed-in user can chat and its message data.
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {},
      selectedUserIndex: null,
      showChatBox: false, // For small devices only
      showChatList: true, // For small devices only
      error: false,
      errorMessage: ""
    };
  }

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

    // let user = this.state.user;
    // let userChatData = this.state.users.filter(u => u.id !== user.id);
    // this.setState({ user,  userChatData });
  }

  fetchUsers() {
    let user = this.state.user;
    let subscriber = this.state.subscribers;

    const url = "account/user/list/with_roles";
    _http.sendGet(url).then(response => {
      response.data
        ? this.setState({
            userChatData: response.data.filter(u => u.id !== user.id),
            user
          })
        : this.setState({
            errorMessage: `Couldn't connect to server. try refreshing the page`,
            error: true
          });
    });
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
      config => {
        this.setState({ loading: true });
        return config;
      },
      error => {
        this.setState({ loading: false });
        this.setState({
          errorMessage: `Couldn't connect to server. try refreshing the page.`,
          error: true
        });
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      response => {
        this.setState({ loading: false });
        return response;
      },
      error => {
        this.setState({ loading: false });
        this.setState({
          errorMessage: `Some error occured. try after sometime`,
          error: true
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
   * Established new connection if reconnected.
   */
  onReconnection() {
    if (this.state.user) {
      this.socket.emit("sign-in", this.state.user);
      NotificationManager.success("Connection Established.", "Reconnected!");
    }
  }

  /**
   *
   * Setup all listeners
   */
  setupSocketListeners() {
    this.socket.emit(events.USER_CONNECTED, this.state.user);
    this.socket.on(events.PRIVATE_MESSAGE, this.onMessageRecieved.bind(this));
    this.socket.on(events.USER_RECONNECTED, this.onReconnection.bind(this));
    this.socket.on(
      events.USER_DISCONNECTED,
      this.onClientDisconnected.bind(this)
    );
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
    let userChatData = this.state.userChatData;
    let messageData = message.message;
    let targetId;
    if (message.from === this.state.user.id) {
      messageData.position = "right";
      targetId = message.to;
    } else {
      messageData.position = "left";
      targetId = message.from;
    }
    let targetIndex = userChatData.findIndex(u => u.id === targetId);
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
        this.setState({ selectedUserIndex: index, userChatData: users });
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
    let message = {
      to: this.state.userChatData[this.state.selectedUserIndex].id,
      message: {
        type: "text",
        text: text,
        date: +new Date(),
        className: "message"
      },
      from: this.state.user.id
    };
    this.socket.emit(events.PRIVATE_MESSAGE, message);
  }
  /**
   * Toggles views from 'ChatList' to 'ChatBox'
   *
   * only on Phone
   */
  toggleViews() {
    this.setState({
      showChatBox: !this.state.showChatBox,
      showChatList: !this.state.showChatList
    });
  }

  toggleModal() {
    this.setState({
      error: false
    });
  }

  render() {
    let chatBoxProps = this.state.showChatBox
      ? {
          xs: 12,
          sm: 12
        }
      : {
          xshidden: "true",
          smhidden: "true"
        };

    //     let chatListProps = this.state.showChatList
    //       ? {
    //           xs: 12,
    //           sm: 12
    //         }
    //       : {
    //           xshidden: "true",
    //           smhidden: "true"
    //         };

    let initChat = null;
    if (this.state.user) {
      initChat = (
        <div>
          <Row>
            <Col {...chatListProps} md={4}>
              <UserList
                userData={this.state.userChatData}
                onChatClicked={this.onChatClicked.bind(this)}
              />
            </Col>
            <Col {...chatBoxProps} md={8}>
              <ChatBox
                signedInUser={this.state.user}
                onSendClicked={this.createMessage.bind(this)}
                onBackPressed={this.toggleViews.bind(this)}
                targetUser={
                  this.state.userChatData[this.state.selectedUserIndex]
                }
              />
            </Col>
          </Row>
          <ErrorModal
            show={this.state.error}
            errorMessage={this.state.errorMessage}
            onToggle={this.toggleModal.bind(this)}
          />
          <LoadingModal show={this.state.loading} />
          <NotificationContainer />
        </div>
      );
    }

    return <div>{initChat}</div>;
  }
}

// export default Chat;
