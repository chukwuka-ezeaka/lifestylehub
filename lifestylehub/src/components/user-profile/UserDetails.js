import React from "react";
import axios from 'axios';
import LoaderSmall from '../Loaders/LoaderSmall';
import { toast } from 'react-toastify';
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress, 
  FormInput
} from "shards-react";

class UserDetails extends React.Component {
  constructor(){
    super()
    this.state = {
      loading: false,
      avatar: ''
    }
  }

  notify = (message) => {
    switch(this.state.type){
      case "success":
              toast.success(message);
          break;
      case "warn":
          toast.warn("Error: " + message);
          break;
      default:
          break;
    }
}

handleUpload = () => {
 const image = document.getElementById('avatar');
 const formdata = new FormData();
  formdata.append("image", image.files[0], ".jpg");
  this.setState({ loading: true })

  axios.put('https://lshub.herokuapp.com/api/v1/user/profile/photo/', formdata,
  { headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization : `Bearer ${localStorage.getItem('Auth')}`} 
  })
  .then(object => {
    this.setState({ loading: false });
    switch(object.data.status){
      case "success":
          this.setState({type: "success"});
          this.notify(object.data.message); 
      break;
      case "fail":
          this.setState({type: "warn"});
          this.notify(object.data.message); 
      break;
      default:
              this.setState({type: "warn"});
          this.notify(object.data.message);
      break;
  }
    console.log(object);
  }, (error) => {
    this.setState({ loading: false });
    console.log(error);
});
}

  render() { 
    const { loading } = this.state;
    const { user } = this.props;
    const userDetails = {
        name: user.fullname,
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
          <img
          className="rounded-circle"
          src={userDetails.avatar}
          alt={userDetails.name}
          width="110"
        />
          </div>
          <FormInput size="sm"
              id="avatar"
              type="file"
            />
          <Button pill outline size="sm" className="mb-2 mt-2" onClick={this.handleUpload} disabled={loading}>
            {loading? <LoaderSmall /> : 'Change Avatar'}
          </Button>
          <h4 className="mb-0">{userDetails.name}</h4>
          <span className="text-muted d-block mb-2">{userDetails.jobTitle}</span>
        
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="px-4">
            <div className="progress-wrapper">
              <strong className="text-muted d-block mb-2">
                {userDetails.performanceReportTitle}
              </strong>
              <Progress
                className="progress-sm"
                value={userDetails.performanceReportValue}
              >
                <span className="progress-value">
                  {userDetails.performanceReportValue}%
                </span>
              </Progress>
            </div>
          </ListGroupItem>
          <ListGroupItem className="p-4">
            <strong className="text-muted d-block mb-2">
              {userDetails.metaTitle}
            </strong>
            <span>{userDetails.metaValue}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }

}

export default UserDetails;
