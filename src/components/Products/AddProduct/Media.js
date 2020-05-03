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
  FormCheckbox,
  InputGroupAddon,
  InputGroup,
  FormTextarea
} from "shards-react";
import HttpService from "../../../utils/API";
import LoaderSmall from "../../Loaders/LoaderSmall";
import MultiToggle from "react-multi-toggle";
import "./Media.css";

const _http = new HttpService();
const productOptions = [
    {
      displayName: 'Freebie',
      value: 'freebie'
    },
    {
      displayName: 'Subscription',
      value: 'subscription'
    },
    {
        displayName: 'Sell on store',
        value: 'store'
      },
  ];

class Media extends React.Component{
    constructor(){
        super();
        this.state ={
            title: '',
            type: 0,
            types:[],
            category: null,
            categories:[],
            errorMessage: '',
            fileError: '',
            disable: false,
            requestPending: false,
            checked: false,
            price: null,
            description: '',
            authors: null,
            filter: '',
            searchQuery: null,
            author: null,
            productOption: 'subscription'
        }
    }

    toggle = () => {
        this.setState({checked: !this.state.checked})
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

    handleDescription = (event) =>{
        this.setState({description: event.target.value});                                                                                                      
    }

    handlePrice = (event) =>{
        this.setState({price: event.target.value});                                                                                                      
    }

    onProductOptionSelect = (value) => {
        this.setState({productOption: value},() => {
            console.log(this.state.productOption);
        });
        console.log(this.state.productOption);
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
        
        const { user, title } = this.props;
        const {requestPending, disable, fileError} = this.state;
        let author= "";
        let message = "";
        let paymentFeild = null;

        if(user && user.UserRole.roleId === 75){
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

        if(user && user.category === null){
            message = <p className="text-center text-danger">Please update your category under your profile to continue</p>;
        }

        if(this.state.productOption === 'store'){
            paymentFeild = <Row>
                <Col lg="6" md="6" className="pb-4">
                    <FormGroup className="mb-0">
                        <label htmlFor="price">Price</label>
                        <InputGroup className="mb-3">
                            <InputGroupAddon type="append">
                            ₦
                            </InputGroupAddon>
                            <FormInput id="price" type="number" classplaceholder="Title" onChange={this.handlePrice} required/>
                        </InputGroup>
                    </FormGroup>
                </Col>
                </Row>
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
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label htmlFor={user.id}>Product type</label>
                            <FormSelect id={user.id} onChange={this.handleType} required disabled={user.category === null}>
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
                        <FormInput defaultValue={user.category ? user.category.name : ''} required disabled/>
                        </FormGroup>
                        </Col>
                    </Row>     
                    <FormGroup>
                        <label htmlFor="title">Title</label>
                        <FormInput id="Title" type="text" placeholder="Title" onChange={this.handleTitle} required disabled={user.category === null}/>
                     </FormGroup>
                     <FormGroup>
                            <label htmlFor="description">Description</label>
                            <FormTextarea rows="5"placeholder="main body..." onChange={this.handleDescription} required disabled={user.category === null}/>
                        </FormGroup>
                    <Row>
                    <Col md="6">
                    <FormGroup>
                        <label htmlFor="coverImage">Select File</label>
                        <FormInput id="file" type="file" onChange={this.checkMimeType} required disabled={user.category === null}/>
                        {fileError ? <p className="f8 red">{fileError}</p> : ''}
                        </FormGroup>
                    </Col>
                    </Row>
                    {author}
                    <MultiToggle
                        options={productOptions}
                        selectedOption={this.state.productOption}
                        onSelectOption={this.onProductOptionSelect}
                        disabled={user.category === null}
                        label="Product options"
                    />
                    {/* <fieldset>
                        <FormCheckbox toggle onChange={this.toggle} small checked={this.state.checked} disabled={user.category === null}>
                            Sell product on store
                        </FormCheckbox>
                    </fieldset> */}
                    {paymentFeild}
                    <FormGroup className="mb-0 mt-4">
                    <Button theme="accent" type="submit" disabled={disable}>
        {requestPending ? <span>uploading <LoaderSmall/></span> : 'Publish Media'}
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
            data.append('category_id', this.props.user.category.id)
            data.append(mediaType, file.files[0])

            //post data
            _http.sendPost(url, data)
            .then(res => {
                //console.log(res)
                if(res.data){
                    let payload = {};
                    const data = {
                        "content_media_id" : res.data.id,
                        'title': this.state.title,
                        'description' : this.state.description,
                        "owner_id" : this.state.author ? this.state.author : this.props.user.id,
                        "category_id" : this.state.category ? this.state.category : this.props.user.category.id,
                        "content_type_id" : parseInt(this.state.type),
                        
                    }
                    if(this.state.productOption === 'store' && this.state.price){
                        payload={
                            ...data,
                            "price": this.state.price
                        }
                    }else if(this.state.productOption === 'freebie'){
                        payload={
                            ...data,
                            "free": "1"
                        }
                        console.log(payload);
                    }else{
                        payload={
                            ...data
                        }
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

        getAuthors = () => {
            const url = `account/user/list?role=99`
          
            _http.sendGet(url)
            .then(response => {
             console.log(response)
              if(response.status === 'success'){
                this.setState({ authors: response.data, loading: false})
              }else{
              this.setState({ loading: false})
              _http.notify(response.message);
              }
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