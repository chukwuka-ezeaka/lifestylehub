import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  FormRadio,
  FormInput,
InputGroup,
InputGroupAddon,
Button
} from "shards-react";

const SidebarCategories = ({ title }) => (
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody className="p-3">
    <fieldset>
      <FormRadio name="category">Inspiration</FormRadio>
      <FormRadio defaultChecked name="category">Religion</FormRadio>
      <FormRadio name="category">Education</FormRadio>
      <FormRadio name="category">
        Business
      </FormRadio>
    </fieldset>
    <InputGroup className="ml-auto">
      <FormInput placeholder="New category" />
      <InputGroupAddon type="append">
        <Button theme="white" className="px-2">
          <i className="material-icons">add</i>
        </Button>
      </InputGroupAddon>
    </InputGroup>
        
      </CardBody>
  </Card>
);

SidebarCategories.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SidebarCategories.defaultProps = {
  title: "Category"
};

export default SidebarCategories;
