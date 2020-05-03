import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    ListGroup,
    ListGroupItem,
    CardFooter,
    Row,
    Col,
    FormInput,
    InputGroup,
    InputGroupAddon,
    Button,
    ButtonGroup
  } from "shards-react";

const Sessions = ({ title, referralData }) => {
    // const { title, referralData } = this.props
    return(
        <Card small className="mb-4">
        
            <CardHeader className="border-bottom">
            <h6 className="m-0">Sessions</h6>
            <div className="block-handle" />
            </CardHeader>

            <CardBody className="p-0">
            <ListGroup small flush className="list-group-small">
                {referralData.map((item, idx) => (
                <ListGroupItem key={idx} className="d-flex px-3">
                    <span className="text-semibold text-fiord-blue">{item.title}</span>
                    <span className="ml-auto text-right text-semibold text-reagent-gray">
                    {item.value}
                    </span>
                </ListGroupItem>
                ))}
            </ListGroup>
            </CardBody>

            <CardFooter className="border-top">
            <Row>
                {/* Time Span */}
                <Col>
                <span className="text-semibold text-fiord-blue">Request withdrawal</span>
                </Col>

                {/* View Full Report */}
                <Col md='3' className="text-right view-report">
                {/* eslint-disable-next-line */}
                <InputGroup className="mb-2">
                    <FormInput type="number" id="withdrawAmount" placeholder="0.00"/>
                    <InputGroupAddon type="append">
                        {/* {this.state.requestPending ?
                        <Button className="btn btn-secondary btn-xs" disabled >requesting...</Button>
                        : */}
                        <Button className="btn btn-secondary btn-xs px-1" >Request</Button>
                        {/* } */}
                    </InputGroupAddon>
                </InputGroup>
                </Col>
            </Row>
            </CardFooter>
        </Card>
        
    )
}

Sessions.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string,
    /**
     * The referral data.
     */
    referralData: PropTypes.array
  };
  
  Sessions.defaultProps = {
    title: "",
    referralData: [
      {
        title: "Total Earnings",
        value: "19,291"
      },
      {
        title: "Total Withdrawn",
        value: "11,201"
      },
      {
        title: "Total Balance",
        value: "9,291"
      },
    ]
  };

export default Sessions;