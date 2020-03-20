import React from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";

export default () => (
  <Form className="main-navbar__search w-100 d-none d-md-flex d-md-flex">
    <InputGroup seamless className="mt-3 mb-3 mr-5 ml-4">
      <InputGroupAddon type="prepend">
        <InputGroupText>
          <i className="material-icons">search</i>
        </InputGroupText>
      </InputGroupAddon>
      <FormInput
        className="navbar-search"
        placeholder="Search for something..."
      />
    </InputGroup>
  </Form>
);
