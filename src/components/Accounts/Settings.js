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
  FormSelect
} from "shards-react";
//import ReactMediaLibraryWrapper from "../common/MediaLibrary";
import HttpService from "../../utils/API";
import LoaderSmall from "../Loaders/LoaderSmall";

const _http = new HttpService();

class Settings extends React.Component{
    constructor(){
        super();
        this.state ={
          account: {},
          bankList: [],
          errorMessage: '',
          loading: true,
          bankName: '',
          bankCode: '',
          accountNumber: '',
          requestPending: false
        }
    }

    componentDidMount(){
      const url = "settlement/bank/account";
      _http.sendGet(url)
      .then(response => {
          response.data ?
          this.setState({ errorMessage: '', account: response.data, loading:false})
          :
          this.setState({ errorMessage: response.message, loading:false})
    })
  }
  
    bankList = () => {
      const url = "settlement/bank/list";
      _http.sendGet(url)
      .then(response => {
          response.data ?
          this.setState({ errorMessage: '', bankList: response.data})
          :
          this.setState({ errorMessage: response.message})
      })
    }

    handleBankList = (event) => {
      const code = this.state.bankList[event.target.value].code;
      const name = this.state.bankList[event.target.value].name;
      this.setState({
        bankName: name,
        bankCode: code
      })
    }

    handleAccountNum = (event) => {
      this.setState({accountNumber: event.target.value})
    }

    updateAccount = (event) => {
      event.preventDefault();
      const payload = {
        account_number: this.state.accountNumber,
        bank_name: this.state.bankName,
        bank_code: this.state.bankCode
      }

      console.log(payload)
      this.setState({ requestPending: true})
      const url = `settlement/bank/account`;
    _http.sendPut(url, payload)
    .then(response => {
        this.setState({ requestPending: false });
        // if(response.data ){
            if(response.status === "success"){
                _http.notify("Account updated successfully", "success");
            }else{
              this.setState({ requestPending: false})
                _http.notify(response.message)
            }
        
    });
    }
    render(){
        const { title } = this.props;
        const { bankList, loading, account } = this.state;
        console.log(account)
        return (
            loading ?
            <LoaderSmall/>
            :
            <Row>
            <Col lg="8" className="pb-4">
            <Card small className="h-100">
                {/* Card Header */}
                <CardHeader className="border-bottom">
                <h6 className="m-0">{title}</h6>
                </CardHeader>

                <CardBody className="d-flex flex-column">
                <Form onSubmit={this.updateAccount}>
                  <Row>
                    <Col>
                         <FormGroup>
                        <label htmlFor="title">Account Number</label>
                        <FormInput id="accNumber" type="number" defaultValue={account.bank_account ? account.bank_account : ''} placeholder="" onChange={this.handleAccountNum} required/>
                     </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                    <label htmlFor="bankList">Bank Name</label>
                    <FormSelect  id="bankList" onChange={this.handleBankList} onClick={() => this.bankList()} required>
                        <option  value={account.bank_name ? account.bank_name : ''} id={account.bank_code ? account.bank_code : ''}>{account.bank_name ? account.bank_name : ''}</option>
                            {bankList.map((bank, index)  => {
                            return(
                                <option key={bank.code} id={index} value={index}>{bank.name}</option>
                            )
                            })
                        }
                        </FormSelect>
                  </FormGroup>
                         {/* <FormGroup>
                        <label htmlFor="title">Bank name</label>
                        <FormInput id="bankNamee" type="text" placeholder="" onChange={this.handleTitle} required/>
                     </FormGroup> */}
                    </Col>
                  </Row>
                 
                    {/* <FormGroup>
                          <label htmlFor="description">Account Name</label>
                          <FormInput id="accName" type="text" placeholder="" onChange={this.handlename} required/>
                      </FormGroup> */}
                      <FormGroup>
                        <Button type="submit" theme="success" disabled={this.state.requestPending}>{this.state.requestPending ? <LoaderSmall/> : "Save"}</Button>
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

       
    }

Settings.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

Settings.defaultProps = {
  title: "Account Settings"
};

export default Settings;