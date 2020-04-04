import React, { Component } from 'react';
import HttpService from '../../utils/API';

const _http = new HttpService();
class GetImage extends Component {
   constructor(props){ 
    super(props)   
    this.state = { 
        image: '',
        type: ''
     }
    }

    componentDidMount(){
        this.getImage(this.props.image);
    }
    render() { 
        const {title, width, classname, height} = this.props;
        return ( 
            <img src={`data:${this.state.type};base64,${this.state.image}`} alt={title}  height={height} width={width} className={ classname ? classname: ''}/>
         );
    }

    getImage = (image)=>{
        const url = `media/manager/image/single/find/${image}`;
        _http.sendGet(url)
        .then(res => {
            if('image' in res.data && 'type' in res.data){
            const {image, type} = res.data;
            
            this.setState({
                image:image,
                image_type:type
            })
            }else{
                console.log('Invalid media received')
            }
        })
        .catch(error => console.log(error))
      }
}
 
export default GetImage;