import React from "react";
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  Button,
  Col,
  Row,
  FormSelect
} from "shards-react";

class Content extends React.Component{
    constructor(){
        super();
        this.state ={
            user: localStorage.getItem('user'),
            collapse: false,
            types:[],
            title: '',
            description: '',
            imageLink: '',
            audioLink: '',
            author: '',
            type:'',
            typeText: '',
            typeMedia: 'none'
        }

        this.toggle = this.toggle.bind(this);
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

    toggle() {
        this.setState({ collapse: !this.state.collapse });
        this.getPermissions();
      }
  
    handleAudio = (event) => {
        this.setState({audioLink: event.target.value});
    }

    handleType = (event) => {
        if(event.target.value === 6){
            this.setState({
                typeText: '',
                typeMedia: 'none'
            });
        }else{
            this.setState({
                typeText: 'none',
                typeMedia: ''
            });
        }
    }

    handleDescription = (event) => {
        this.setState({description: event.target.value});
    }

    handleImage = (event) => {
        this.setState({imageLink: event.target.value});
        console.log(this.state.imageLink)
    }

    handleTitle = (event) => {
        this.setState({title: event.target.value});
    }

   /* checkMimeType=(event)=>{
        //getting file object
        let file = event.target.file[0] 
        //define message container
        let err = ''
        // list allow mime type
       const types = ['image/png', 'image/jpeg', 'image/gif']
         // compare file type find doesn't matach
             if (types.every(type => file.type !== type)) {
             // create error message and assign to container   
             err += file.type+' is not a supported format\n';
           }
       if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file
            console.log(err)
             return false; 
        }
       return true;
      
      }*/

   

    componentDidMount(){
        fetch('https://lshub.herokuapp.com/api/v1/content/type/list',{
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + localStorage.getItem('Auth'),
                signal: this.abortController.signal
            }
        })
        .then(response => response.json())
        .then(object => {
            this.setState({
                types: object.data
            });
        })
        .catch(err => {
            if (err.name === 'AbortError') return; // expected, this is the abort, so just return
            console.log(err);
        });
    }   

    componentWillUnmount = () => this.abortController.abort();

    abortController = new window.AbortController(); 


    render(){
        const { title } = this.props;
        const { types, user, typeMedia, typeText } = this.state;
        return (
            <Card small className="h-100">
                {/* Card Header */}
                <CardHeader className="border-bottom">
                <h6 className="m-0">{title}</h6>
                </CardHeader>

                <CardBody className="d-flex flex-column">
                <Form className="quick-post-form">
                    <FormGroup>
                        <label htmlFor="feInputState">Content type</label>
                        <FormSelect id={user.id} onChange={this.handleType}>
                        <option>Select...</option>
                            {types ? types.map((type)  => {
                            return(
                                <option key={type.id} value={type.id}>{type.name}</option>
                            )
                            })
                        : ''}
                        </FormSelect>
                    </FormGroup>

                    <FormGroup style={{display: typeText}}>
                        <FormInput id="Title" type="text" placeholder="Title" onChange={this.handleImage}/>
                     </FormGroup>

                    <FormGroup style={{display: typeText}}>
                    <FormTextarea placeholder="Description" onChange={this.handleDescription}/>
                    </FormGroup>

                    <Row>
                    <Col md="6" style={{display: typeText}}>
                    <FormGroup>
                        <label htmlFor="coverImage">Cover Image</label>
                        <FormInput id="coverImage" type="file" onChange={this.handleImage}/>
                        </FormGroup>
                       
                    </Col>
                    {/* Last Name */}
                    <Col md="6"  style={{display: typeMedia}}>
                    <FormGroup>
                        <label htmlFor="coverImage">Select File</label>
                        <FormInput id="coverImage" type="file" onChange={this.handleImage}/>
                        </FormGroup>
                    </Col>
                    </Row>
                    <FormGroup className="mb-0">
                    <Button theme="accent" type="submit" onClick={this.handlePublish}>
                        Publish Content
                    </Button>
                    </FormGroup>
                </Form>
                </CardBody>
            </Card>
            );
        }

        handlePublish = (event) => {
            event.preventDefault();
            fetch('#',{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'bearer ' + localStorage.getItem('Auth')
                },
                body: JSON.stringify({
                    title: this.state.title,
                    content: this.state.description,
                    image_link: this.state.imageLink,
                    audio_link: this.state.audioLink,
                    author: this.state.author
                })
            })
            .then(response => response.json())
            .then(data => console.log(data))
        }

      
    }

Content.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

Content.defaultProps = {
  title: "Add Content"
};

export default Content;