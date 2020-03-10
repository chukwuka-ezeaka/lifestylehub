import React from "react";
import LoaderSmall from '../Loaders/LoaderSmall';
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  FormInput,
  Row,
  Col
} from "shards-react";
import GetImage from "../common/getImage";
import GetVideo from "../common/GetVideo";

class UserDetails extends React.Component {
  constructor(){
    super()
    this.state = {
      loading: false,
      avatar: ''
    }
  }

handleUpload = () => {
 const image = document.getElementById('avatar');
 const formdata = new FormData();
 if(image.files[0]){
  formdata.append("image", image.files[0], ".jpg");
  this.props.updatePhoto(formdata)
 }
}

  render() { 
    const { user, pending } = this.props;
    //console.log(user)
    const userDetails = {
        name: user ? user.firstname + " " + user.lastname : " ",
        avatar: require("./../../images/avatars/0.png"),
        jobTitle: "Life Coach",
        performanceReportTitle: "Experience",
        performanceReportValue: 74,
        metaTitle: "Work History",
        metaValue:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
      }
    return (  
      <Card small className="mb-4 pt-3">
        <CardHeader className="border-bottom text-center">
          <div className="mb-3 mx-auto">
          {user.photo ? 
          <GetImage image={user.photo}   title={userDetails.name} width="130px" classname="rounded-circle"/>
          :
          <img
          className="rounded-circle"
          src={userDetails.avatar}
          alt={userDetails.name}
          width="110"
        />
        }
          </div>
          <FormInput size="xs"
              id="avatar"
              type="file"
            />
          <Button pill outline size="sm" className="mb-2 mt-2" onClick={this.handleUpload} disabled={pending}>
            {pending ? <LoaderSmall /> : 'Change Avatar'}
          </Button>
          <h4 className="mb-0">{userDetails.name}</h4>
        
        </CardHeader>
        <ListGroup flush>
         
          <ListGroupItem className="p-4">
            <strong className="text-muted d-block mb-2">
              Pitch video
            </strong>
           <GetVideo width="auto"/>
          </ListGroupItem>
        </ListGroup>

        <ListGroup flush>
          <ListGroupItem className="p-4">
          <Row>
            <Col md="4" sm="4" xs="4" className="f7 text-primary fw4">
              <i className="material-icons mr-1">person_add</i>0<br/>
              <span>Followers</span>
            </Col>
            <Col md="4" sm="4" xs="4" className="f7 text-primary fw4">
              <i className="material-icons mr-1">thumb_up</i>{user.likeCount}<br/>
              <span>Likes</span>
            </Col>
            <Col md="4" sm="4" xs="4" className="f7 text-primary fw4">
              <i className="material-icons mr-1">how_to_reg</i>{user.subscriptionCount}<br/>
              <span>Subscriptions</span>
            </Col>
          </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }

}

export default UserDetails;
