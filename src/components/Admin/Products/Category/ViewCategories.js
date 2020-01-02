import React from 'react';
import Loader from '../../../Loaders/Loader';
import {Card, CardHeader, CardBody, Button } from "shards-react"

class ViewCategories extends React.Component{

render(){
    const { categories, isLoading } = this.props;
    let i = 1;
    return(

        
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
                            Role
                        </th>
                        <th scope="col" className="border-0">
                           Id
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
                                    <td>{category.id}</td>
                                  
                                    <td>
                                        <Button size="sm" theme="warning" className="mb-2 mr-1" id={index}>
                                            Delete
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
            
    );
}
}

export default ViewCategories;
