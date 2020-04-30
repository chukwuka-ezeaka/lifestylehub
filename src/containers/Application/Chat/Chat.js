import React, { Component } from "react";
import HttpService from "../../../utils/API";
import "./Chat.css";

//Chat Components
import UserList from "../../../components/applications/UserList";
import ChatBox from "../../../components/applications/ChatBox";
import ErrorModal from "../../../components/applications/ErrorModal";

//Import Socket-Client
import io from "socket.io-client";

//Import Utils
import "react-chat-elements/dist/main.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

// import Modal and Utils from "react-bootstrap/lib/Modal";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

// Other Imports
import events from "../../containerUtils/events";

const socket = io("https://lshub.herokuapp.com/api/v1/chat");
const _http = new HttpService();

/**
 * Fetches socket server URL from env
 */

class Chat extends Component {
  state = {
    userChatData: [], // this contains users from which signed-in user can chat and its message data.
    sender: {
      username: this.props.user.firstname,
      id: this.props.user.id,
      name: this.props.user.fullname,
    },
    reciever: {},
    selectedUserIndex: null,
    errorMessage: "",
    usersOnline: [],
    data: {},
    typing: "",
    showChatBox: false, // For small devices only
    showChatList: true, // For small devices only
    error: false,
  };

  /**
   *
   * Setups Axios to monitor XHR errors.
   * Initiates and listen to socket.
   * fetches User's list from backend to populate.
   */
  componentDidMount() {
    this.setupSocketListeners();
    this.fetchUsers();
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
  ifError({ error }) {
    NotificationManager.error(`${error}, unable to send message.`, "Error!");
  }

  /**
   *
   * Established new connection.
   */
  onConnection(data) {
    console.log(data);
    NotificationManager.success(
      `Connection to chat Server Established.`,
      `Success`
    );
  }

  /**
   *
   * Checks if Client is connected
   */
  onClientConnected(data) {
    const entries = Object.values(data);
    this.setState({ data: data });
    this.setState({ usersOnline: entries });

    console.log(this.state.data[this.state.sender.id], this.state.usersOnline);

    // NotificationManager.success(
    //   `${this.state.sender.username} is connected`,
    //   `Connected`
    // );
  }

  /**
   *
   * @param {Typing New Message} text
   *
   * Alerts Users to message typing events
   */
  onTyping(data) {
    const { userChatData, selectedUserIndex } = this.state;
    if (!userChatData[selectedUserIndex]) {
      return;
    } else if (data.id === userChatData[selectedUserIndex].id) {
      this.setState({ typing: `${data.name} is typing` });
      setTimeout(() => {
        this.setState({ typing: "" });
      }, 2000);
    }
  }

  /**
   *
   * Setup all listeners
   */
  setupSocketListeners() {
    // CONNECTED EVENT
    socket.on("connection", this.onConnection.bind(this));
    socket.on(events.USER_CONNECTED, this.onClientConnected.bind(this));
    socket.on(events.PRIVATE_MESSAGE, this.onMessageRecieved.bind(this));
    socket.on("disconnect", this.onClientDisconnected.bind(this));
    // TYPING EVENTS
    socket.on(events.TYPING, this.onTyping.bind(this));
  }

  /**
   *
   * Fetch all users
   */
  fetchUsers() {
    const { sender } = this.state;
    socket.emit(events.USER_CONNECTED, sender, this.ifError.bind(this));

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

  onMessageRecieved(data) {
    let userChatData = this.state.userChatData;
    let messageData = data.message;
    let targetId;
    if (data.sender_id === this.state.sender.id) {
      messageData.position = "right";
      targetId = data.receiver_id;
    } else {
      messageData.position = "left";
      targetId = data.sender_id;
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
  createMessage(message) {
    const { data, sender, userChatData, selectedUserIndex } = this.state;
    if (data) {
      if (data[sender.id] && data[userChatData[selectedUserIndex].id]) {
        let payload = {
          receiverSocketId: data[userChatData[selectedUserIndex].id].socketId,
          sender_username: data[sender.id].username,
          sender_id: data[sender.id].id,
          sender_name: data[sender.id].name,
          receiver_username: data[userChatData[selectedUserIndex].id].username,
          receiver_id: data[userChatData[selectedUserIndex].id].id,
          receiver_name: data[userChatData[selectedUserIndex].id].name,
          message: {
            type: "text",
            text: message,
            date: +new Date(),
            className: "message",
          },
        };
        socket.emit(events.PRIVATE_MESSAGE, payload, ({ error }) => {
          alert(error);
        });

        this.onMessageRecieved(payload);
      } else {
        NotificationManager.error(
          `Unable to send message.`,
          "User is not connected!"
        );
      }
    } else {
      NotificationManager.error(
        `Unable to send message.`,
        "Cannot connect to server"
      );
    }
  }

  userTyping() {
    socket.emit(events.TYPING, this.state.sender);
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
    let chatBoxProps = this.state.showChatBox
      ? {
          xs: 12,
          sm: 12,
        }
      : {
          xsHidden: true,
          smHidden: true,
        };

    let chatListProps = this.state.showChatList
      ? {
          xs: 12,
          sm: 12,
        }
      : {
          xsHidden: true,
          smHidden: true,
        };

    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col {...chatListProps} md={4}>
              <UserList
                userData={this.state.userChatData}
                onChatClicked={this.onChatClicked.bind(this)}
              />
            </Col>
            <Col {...chatBoxProps} md={8}>
              <ChatBox
                signedInUser={this.state.sender}
                onSendClicked={this.createMessage.bind(this)}
                onBackPressed={this.toggleViews.bind(this)}
                targetUser={
                  this.state.userChatData[this.state.selectedUserIndex]
                }
                userTyping={this.userTyping.bind(this)}
              />
            </Col>
          </Row>
        </Grid>
        <ErrorModal
          show={this.state.error}
          errorMessage={this.state.errorMessage}
          onToggle={this.toggleModal.bind(this)}
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default Chat;
