import React from 'react';
import Loader from '../../Loaders/Loader';
import { withRouter } from 'react-router-dom';
import {Card, CardHeader, CardBody, Button } from "shards-react"
import GetImage from '../../common/getImage';
import CategoryModal from './CategoryModal';

class ViewCategories extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentCategory: null,
            open: false,
        }
    }


     editCategory = (event) => {
        const id = event.target.id
        this.props.history.push(`/editCategory/?id=${id}`)
    }

render(){
    const { categories, isLoading } = this.props;
    //console.log(categories)
    const width = "70"
    let i = 1;
    return(

        <>
            <Card small className="mb-4 overflow-hidden">
                <CardHeader className="bg-light">
                    <h6 className="m-0 text-black">All Categories</h6>
                </CardHeader>
                <CardBody className="bg-light p-0 pb-3">
                    {isLoading ? 
                    <Loader/>
                :
                    <table className="table table-light mb-0">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col" className="border-0">
                            #
                        </th>
                        <th scope="col" className="border-0">
                            Name
                        </th>
                        <th scope="col" className="border-0">
                            Description
                        </th>
                        <th scope="col" className="border-0">
                            Cover
                        </th>
                        <th scope="col" className="border-0">

                        </th>
                        <th scope="col" className="border-0">

                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {categories? categories.map((category, index)  => {
                            //let userId = `#${user.id}`;
                            //console.log(index);
                            return(
                                <tr key={category.id}>
                                    <td>{i++}</td>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                    {category.image_url !== null ?
                                    <GetImage image={category.image_url} title={category.name} width={width}/>
                                    :
                                    ""}
                                    </td>
                                    <td>
                                        <Button size="xs" theme="secondary" className="mb-2 mr-1" id={index} onClick={this.editCategory}>
                                            Edit
                                        </Button>
                                    </td>
                                   
                                </tr> 
                                
                            )
                        })
                    :
                    ""
                    }
                    </tbody>
                    </table>
                    }
                </CardBody>
            </Card>
        </>
    );
}
}

export default withRouter(ViewCategories);
