import React from "react";
import PropTypes from "prop-types";
//import AddCategory from './AddCategory'
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  FormSelect,
  Button,
  Col,
  Row,
  InputGroup,
  InputGroupAddon
} from "shards-react";
import HttpService from "../../../utils/API";
import LoaderSmall from "../../Loaders/LoaderSmall"

const _http = new HttpService();

class Content extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            title: '',
            description: '',
            category: null,
            requestPending: false,
            loading: false,
            errMessage: '',
            categories: [],
            disable: false,
            authors: null,
            filter: '',
            searchQuery: null,
            author: null
        }
    }

    handleDescription = (event) => {
        this.setState({description: event.target.value});
    }

    handleTitle = (event) => {
        this.setState({title: event.target.value});
    }

    handleCategory = (event) => {
        this.setState({category: event.target.value});
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

      categoryCheck = () => {
        this.setState({disable: true})
    }

    searchFilter = (e) => {
        let filter = e.target.value;
         return this.setState({filter: filter});
      }
      
      searchInput = (e) => {
        let value = e.target.value;
       this.setState({ searchQuery: value });
      } 
      
      getFilteredAuthorList() {
        return !this.state.searchQuery || !this.state.authors
        ? null
        : this.state.authors.filter(user => {
            switch(this.state.filter){
              case "name":
                  return  user.firstname.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || 
                          user.lastname.toLowerCase().includes(this.state.searchQuery.toLowerCase());
              // case "username":
              //     return  user.username.toLowerCase().includes(this.state.searchQuery.toLowerCase());
              case "email":
                  return  user.email.toLowerCase().includes(this.state.searchQuery.toLowerCase());
              default:
               return user.firstname.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || 
                      user.lastname.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || 
                      //user.username.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
                      user.email.toLowerCase().includes(this.state.searchQuery.toLowerCase());
            }
           
        }
          );
      }  
      
      selectAuthor = (author) => {
          if(author.category){
          this.setState({
              category: author.category.id,
              author: author.id,
              searchQuery: null
        })
          document.getElementById('author').value = author.firstname + " " + author.lastname;
        }else{
            _http.notify("Selected author doesn't belong to any category")
            this.setState({
                category: null,
                author: null,
                searchQuery: null
          })
          document.getElementById('author').value = '';
        }
    }

      componentDidMount() {
        if(this.props.user.UserRole.roleId === 75){
          this.getAuthors();
        }
      }

    render(){
        const { title, user } = this.props;
        let author= "";
        let message = null;
        if(user.UserRole.roleId === 75){
            const authorList = this.getFilteredAuthorList();
            author = <>
            <FormGroup>
                <label htmlFor="title">Author Name</label>
                <InputGroup className="mb-3">
                        <FormInput type="text" id="author" placeholder="search for authors based on filter..." onInput={this.searchInput}/>
                        <InputGroupAddon type="append">
                        <FormSelect onChange={this.searchFilter}>
                        <option vlaue="all">All</option>
                        <option value="name">Name</option>
                        {/* <option value="username">Username</option> */}
                        <option value="email">Email</option>
                        </FormSelect> 
                        </InputGroupAddon>
                    </InputGroup>
            </FormGroup>
            <ul style={{border : '0.2px solid grey'}}>
                {authorList ?
                authorList.map((author, idx) => {
                   if(this.state.filter === 'email'){
                        return idx < 5 ? <li key={idx} onClick={() => this.selectAuthor(author)} className="link pointer dim">{author.email}</li> : null
                    }else{
                        return idx < 5 ? <li key={idx} onClick={() => this.selectAuthor(author)} className="link pointer dim">{author.firstname} {author.lastname}</li> : null
                    }
                })
            :
            null}
            </ul>
            </>
        }

        if(user.category === null){
            message = <p className="text-center text-danger">Please update your category under your profile to continue</p>;
        }
        
        return (
            <Row>
            <Col lg="8" className="pb-4">
                <Card small className="h-100">
                    {/* Card Header */}
                    <CardHeader className="border-bottom">
                    <h6 className="m-0">{title}</h6>
                    </CardHeader>

                    <CardBody className="d-flex flex-column">
                    {message}
                    <Form onSubmit={this.handlePublish}>
                    <FormGroup>
                        <label htmlFor={user.id}>Category</label>
                        <FormInput defaultValue={user.category ? user.category.name : ''} required disabled/>
                    </FormGroup>
                        <FormGroup>
                            <label htmlFor="Title">Title</label>
                            <FormInput placeholder="Title" onChange={this.handleTitle} required disabled={user.category === null}/>
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="description">Main body</label>
                            <FormTextarea rows="7"placeholder="main body..." onChange={this.handleDescription} required disabled={user.category === null}/>
                        </FormGroup>

                        <Row>
                        <Col md="6">
                        <FormGroup>
                            <label htmlFor="coverImage">Cover Image</label>
                            <FormInput id="coverImage" placeholder="Image link" type="file" required disabled={user.category === null}/>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                        {author}
                        </Col>
                        </Row>
                        <FormGroup className="mb-0">
                        <Button theme="accent" type="submit" disabled={this.state.requestPending}>
                        {this.state.requestPending  ? <LoaderSmall/>: 'Publish Content'}
                        </Button>
                        </FormGroup>
                    </Form>
                    </CardBody>
                </Card>
            </Col>
            <Col lg="4" className="pb-4">
                   {/* {<AddCategory/>} */}
            </Col>
          </Row> 
            );
        }



        handlePublish = (event) => {
            event.preventDefault();
            this.setState({requestPending: true, disable: true});
            const url = 'media/manager/image/single/create';

            const file = document.getElementById('coverImage');
            
            const data = new FormData();
            data.append('title', this.state.title)
            data.append('description', this.state.description)
            data.append('content_type_id', 7)
            data.append('category_id', this.props.user.category.id)
            data.append('image', file.files[0])

            //post image data
            _http.sendPost(url, data)
            .then(res => {
                if(res.data){
                    const payload = {
                        "content_media_id" : res.data.id,
                        "owner_id" : this.state.author ? this.state.author : this.props.user.id,
                        "category_id" : this.state.category ? this.state.category : this.props.user.category.id,
                        "content_type_id" : 7,
                        "title" : this.state.title,
                        "description" : this.state.description,
                        // "content_art" : contnet_art
                    }
                    const contentUrl = 'content/create';

                    //post content data
                _http.sendPost(contentUrl, payload)
                .then(response => {
                    this.setState({ requestPending: false });
                    if(response.data ){
                        let type = "";
                        if(response.status === "success"){
                            type = "success";
                            _http.notify(response.message, type)
                        }else{
                            type = "warn";
                            _http.notify(response.message, type)
                        }
                    
                    }else{
                        _http.notify(response.message)
                        this.setState({requestPending: false })
                    }
                });
                }
            });
        }

        getAuthors = () => {
            const url = `account/user/list?role=99`
          
            _http.sendGet(url)
            .then(response => {
              if(response.status === 'success'){
                this.setState({ authors: response.data, loading: false})
              }else{
              this.setState({ loading: false})
              _http.notify(response.message);
              }
            })
        }
    }

Content.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

Content.defaultProps = {
  title: "New Text"
};

export default Content;