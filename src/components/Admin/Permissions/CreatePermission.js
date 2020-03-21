import React, { Component } from "react";
import LoaderSmall from "../../Loaders/LoaderSmall";
import {
  Card,
  CardHeader,
  ListGroup,
  FormInput,
  Button,
  InputGroup,
  InputGroupAddon
} from "shards-react";
import HttpService from "../../../utils/API";

const _http = new HttpService();

class CreatePermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: "",
      errMessage: "",
      requestPending: false
    };
  }

  handlePermission = event => {
    const val = event.target.value;
    const data = val.trim().replace(" ", "_");
    this.setState({ permission: data });
  };

  onSubmitRequest = () => {
    this.setState({ requestPending: true });
    const url = "account/permission/create";
    const postData = {
      name: this.state.permission
    };
    _http.sendPost(url, postData).then(response => {
      if (response.data) {
        this.setState({ requestPending: false });
        let type = "";
        if (response.status === "success") {
          type = "success";
          _http.notify(response.message, type);
        } else {
          type = "warn";
          _http.notify(response.message, type);
        }
      } else {
        _http.notify(response.message);
        this.setState({ requestPending: false });
      }
    });
  };

  render() {
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Create Permission</h6>
        </CardHeader>
        {this.state.requestPending === true ? <LoaderSmall /> : ""}
        <ListGroup flush className="p-4">
          <label htmlFor="role">Permission Name</label>
          <InputGroup seamless className="mb-3">
            <FormInput
              onChange={this.handlePermission}
              placeholder="permission name"
            />
            <InputGroupAddon type="append">
              <Button onClick={this.onSubmitRequest} theme="success">
                Add
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </ListGroup>
      </Card>
    );
  }
}

export default CreatePermission;
