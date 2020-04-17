import React, { Component } from "react";
import { ChatList } from "react-chat-elements";
import { Nav, NavItem, NavLink, FormGroup, FormInput } from "shards-react";
/**
 *
 * Renders user list
 *
 * Used on both places Sign-in modal and as ChatList
 */

export default class UserList extends Component {
  state = {
    userData: [],
    searchQuery: null
  };
  componentDidMount() {}
  searchInput(e) {
    let value = e.target.value;
    let searchQuery = null;
    if (value) {
      searchQuery = value;
    }
    this.setState({ searchQuery });
  }
  /**
   *
   * Implement filter logic on basis of search query.
   */
  getFilteredUserList() {
    return !this.state.searchQuery
      ? this.props.userData
      : this.props.userData.filter(user =>
          user.firstname
            .toLowerCase()
            .includes(this.state.searchQuery.toLowerCase())
        );
  }

  render() {
    let users = this.getFilteredUserList();
    return (
      <div>
        <div className="chat-nav">
          <Nav>
            <NavItem>
              <NavLink active href="#">
                All
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Chat Request</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Active Chat</NavLink>
            </NavItem>
          </Nav>
        </div>

        <FormGroup>
          <FormInput
            type="text"
            placeholder="Search for a user here..."
            onInput={this.searchInput.bind(this)}
          />
        </FormGroup>
        {users.length ? (
          <ChatList
            className={"chat-list"}
            dataSource={users.map((f, i) => {
              let date = null;
              let subtitle = "";
              if (
                !this.props.showSignInList &&
                f.messages &&
                f.messages.length
              ) {
                let lastMessage = f.messages[f.messages.length - 1];
                date = new Date(lastMessage.timeStamp);
                subtitle =
                  (lastMessage.position === "right"
                    ? "You: "
                    : f.firstname + ": ") + lastMessage.text;
              }
              return {
                //avatar: require(`../static/images/avatar/${f.id}.jpg`),
                alt: f.firstname,
                title: f.firstname,
                subtitle: subtitle,
                date: date,
                unread: f.unread,
                user: f
              };
            })}
            onClick={this.props.onChatClicked}
          />
        ) : (
          <div className="text-center no-users">No subscribers to show.</div>
        )}
      </div>
    );
  }
}
