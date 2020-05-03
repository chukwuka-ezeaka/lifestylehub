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

const Purchases = ({ title, referralData }) => {
    return(
        <Card small className="mb-4">
        
            <CardHeader className="border-bottom">
            <h6 className="m-0">Purchases</h6>
            <div className="block-handle" />
            </CardHeader>

            <CardBody className="p-0 ">
            <ListGroup small flush className="list-group-small">
                {referralData.map((item, idx) => (
                <ListGroupItem key={idx} className="">
                    <Row>
                        <Col className="border-bottom d-flex px-3">
                            <span className="text-semibold text-fiord-blue">{item.name}</span>
                        </Col>
                        <Col className="border-bottom d-flex px-3">
                            <span className="text-semibold text-fiord-blue">{item.date}</span>
                        </Col>
                        <Col className="border-bottom d-flex px-3">
                            <span className="text-semibold text-fiord-blue">{item.amount}</span>
                        </Col>
                    </Row>
                    
                </ListGroupItem>
                ))}
            </ListGroup>
            </CardBody>

            <CardFooter className="border-top">
            <Row>
                <Col></Col>
                <Col md='3' className="text-right view-report">
                <Button className="btn btn-secondary btn-xs px-1" >Prev</Button> <Button className="btn btn-dark btn-xs px-1" >Next</Button>
                </Col>
            </Row>
            </CardFooter>
        </Card>

        
    )
}

Purchases.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string,
    /**
     * The referral data.
     */
    referralData: PropTypes.array
  };
  
  Purchases.defaultProps = {
    title: "",
    referralData: [
      {
        name: "Tunde Jerry",
        date: "27/01/2020",
        amount: "₦2,500"
      },
      {
        name: "Chukwuka Ezeaka",
        date: "2/02/2020",
        amount: "₦9,000"
      },
      {
        name: "Mark Stein",
        date: "7/03/2020",
        amount: "₦5,000"
      },
    ]
  };

export default Purchases;