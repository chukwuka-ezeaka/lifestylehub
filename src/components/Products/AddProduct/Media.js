import React from "react";
import PropTypes from "prop-types";
//import AddCategory from './AddCategory';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  Button,
  Col,
  Row,
  FormSelect,
} from "shards-react";
import HttpService from "../../../utils/API";
import LoaderSmall from "../../Loaders/LoaderSmall";

const _http = new HttpService();

class Media extends React.Component{
    constructor(){
        super();
        this.state ={
            user: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : {},
            title: '',
            type: 0,
            types:[],
            category: 0,
            categories:[],
            errorMessage: '',
            fileError: '',
            disable: false,
            requestPending: false
        }
    }
  
    handleTitle = (event) => {
        this.setState({title: event.target.value});
    }

    handleType = (event) => {
        this.setState({type: event.target.value});
        this.setState({fileError: ""})
    }

    handleCategory = (event) => {
        this.setState({category: event.target.value});
    }

   checkMimeType=(event)=>{
       if(!event.target.files[0]){
           return false
       }
        //getting file object
        this.setState({fileError: ""})
        let file = event.target.files[0] 
        //define message container
        let err = ''
        let types = [];
        const type = parseInt(this.state.type)
        // list allow mime types
        switch(type){
            case 1:
                types = ['video/mp4']
                break;
            case 5:
                types = ['audio/mp3', 'audio/wav', 'audio/ogg']
                break;
            case 4:
                types = ['application/pdf', 'application/epub']
                break;
            default:
                this.setState({fileError: "Please select a product type"})
                event.target.value = null // discard selected file
                return false; 
        }
         // compare file type find doesn't matach
            
             if (types.every(type => file.type !== type)) {
             // create error message and assign to container   
             err += file.type+' is not a supported format\n';
             this.setState({fileError: err})
           }
       if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file
             return false; 
        }
       return true;
      
      }


    render(){
        const { title } = this.props;
        const { user, categories, requestPending, disable, fileError} = this.state;
        return (
            <Row>
            <Col lg="8" className="pb-4">
            <Card small className="h-100">
                {/* Card Header */}
                <CardHeader className="border-bottom">
                <h6 className="m-0">{title}</h6>
                </CardHeader>

                <CardBody className="d-flex flex-column">
                <Form onSubmit={this.handlePublish}>
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label htmlFor={user.id}>Product type</label>
                            <FormSelect id={user.id} onChange={this.handleType} required>
                            <option>Select...</option>
                            <option value='1'>Video</option>
                            <option value='5'>Audio</option>
                            <option value='4'>E-book</option>
                            </FormSelect>
                        </FormGroup>
                        </Col>
                        <Col md="6" className="pb-4">
                        <FormGroup>
                            <label htmlFor={user.id}>Category</label>
                            <FormSelect id={user.id} onChange={this.handleCategory} onClick={this.getCategory} required>
                                {categories ? categories.map((category)  => {
                                return(
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                )
                                })
                            : <LoaderSmall/>}
                            </FormSelect>
                        </FormGroup>
                        </Col>
                    </Row>     
                    <FormGroup>
                        <label htmlFor="title">Title</label>
                        <FormInput id="Title" type="text" placeholder="Title" onChange={this.handleTitle} required/>
                     </FormGroup>

                    <Row>
                    <Col md="6">
                    <FormGroup>
                        <label htmlFor="coverImage">Select File</label>
                        <FormInput id="file" type="file" onChange={this.checkMimeType} required/>
                        {fileError ? <p className="f8 red">{fileError}</p> : ''}
                        </FormGroup>
                    </Col>
                    </Row>
                    <FormGroup>
                        <label htmlFor="title">Author Name</label>
                        <FormInput id="Title" type="text" placeholder="Author" />
                     </FormGroup>
                    {/* <fieldset>
                        <FormCheckbox toggle onChange={this.toggle} small checked={this.state.checked}>
                            Sell product on store
                        </FormCheckbox>
                    </fieldset> */}
                    <FormGroup className="mb-0">
                    <Button theme="accent" type="submit" disabled={disable}>
                       {requestPending ? <LoaderSmall/> : 'Publish Media'}
                    </Button>
                    </FormGroup>
                </Form>
                </CardBody>
            </Card>
             </Col>
             <Col lg="4">
                    {/* {<AddCategory/>} */}
             </Col>
           </Row> 
            );
        }

        handlePublish = (event) => {
            event.preventDefault();
            this.setState({requestPending: true, disable: true});
            let url = '';
            let mediaType = '';
            const type = parseInt(this.state.type)

            if(type === 1){
                url = 'media/manager/video/single/create';
                mediaType = 'video';
            }                   
            if(type === 4){
                url = 'media/manager/pdf/single/create';
                mediaType = 'pdf';
            }                  
            if(type === 5){
                url = 'media/manager/audio/single/create';
                mediaType = 'audio';
            }                  
              

            const file = document.getElementById('file');
            
            const data = new FormData();
            data.append('title', this.state.title)
            data.append('description', this.state.title)
            data.append('category_id', this.state.category)
            data.append(mediaType, file.files[0])

            //post data
            _http.sendPost(url, data)
            .then(res => {
                //console.log(res)
                if(res.data){
                    const payload = {
                        "content_media_id" : res.data.id,
                        'title': this.state.title,
                        'description' : this.state.title,
                        "owner_id" : this.state.user.id,
                        "category_id" : this.state.category,
                        "content_type_id" : parseInt(this.state.type)
                    }

                const mediaUrl = 'content/create';

                //post media data
                _http.sendPost(mediaUrl, payload)
                .then(response => {
                    this.setState({ requestPending: false, disable: false });
                    if(response.data ){
                        let type = "";
                        if(response.status === "success"){
                            type = "success";
                            _http.notify("Media published successfully", type)
                        }else{
                            type = "warn";
                            _http.notify(response.message, type)
                        }
                    
                    }else{
                        _http.notify(response.message)
                        this.setState({requestPending: false, disable: false })
                    }
                });
                }else{
                    _http.notify(res.message)
                    this.setState({requestPending: false, disable: false })
                }
            });
        }

        getType = () => {
            const url = 'content/type/list';
            _http.sendGet(url)
            .then(response => {
                response.data ?
                this.setState({ errorMessage: '', types: response.data, loading: false })
                :
                this.setState({ errorMessage: response.message, loading: false })
            })
        }

        getCategory = () => {
            const url = 'content/category/list';
            _http.sendGet(url)
            .then(response => {
                response.data ?
                this.setState({ errorMessage: '', categories: response.data, loading: false })
                :
                this.setState({ errorMessage: response.message, loading: false })
            })
        }

      
    }

Media.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

Media.defaultProps = {
  title: "New Product"
};

export default Media;