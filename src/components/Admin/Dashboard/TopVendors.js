import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem
} from "shards-react";

const TopVendors = ({ title, referralData }) => (
  <Card small>
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
      <div className="block-handle" />
    </CardHeader>

    <CardBody className="p-0">
      <ListGroup small flush className="list-group-small">
        {referralData.map((item, idx) => (
          <ListGroupItem key={idx} className="d-flex px-3">
            <span className="text-semibold text-fiord-blue">{item.title}</span>
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              {item.value} posts
            </span>
          </ListGroupItem>
        ))}
      </ListGroup>
    </CardBody>

   
  </Card>
);

TopVendors.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The referral data.
   */
  referralData: PropTypes.array
};

TopVendors.defaultProps = {
  title: "Top Vendors",
  referralData: [
    {
      title: "GitHub",
      value: "301"
    },
    {
      title: "Stack Overflow",
      value: "291"
    },
    {
      title: "Hacker News",
      value: "283"
    },
    {
      title: "Reddit",
      value: "271"
    },
    {
      title: "The Next Web",
      value: "228"
    },
    {
      title: "Tech Crunch",
      value: "218"
    },
    {
      title: "YouTube",
      value: "207"
    },
    {
      title: "Adobe",
      value: "171"
    }
  ]
};

export default TopVendors;
