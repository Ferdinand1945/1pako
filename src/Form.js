import React from "react";
import InputField from "./InputField";
import Submit from "./Submit";
import UserStore from "./stores/UserStorage";
import {Form, Col, Container, Label, FormGroup} from 'reactstrap';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            username: '',
            password: '',
            buttonDisabled: false,
        }
    }

    setInputValue(property, val) {
        val=val.trim();
        if(val.length > 12) {
            return
        }
        this.setState({[property]: val})
    }
    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false,
        })
    }
    async doLogin(){
        if (!this.state.username){
            return;
        }
        if (!this.state.password) {
            return;
        }
        this.setState({buttonDisabled: true});

        try {
            let res = await fetch('./login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });
            let result = await res.json();
            if (result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            } else if (result && result.success === false) {
                this.resetForm();
                alert(result.msg)
            }
        } catch(e) {
            console.log(e);
            this.resetForm();
        }
    }
    render() {
        return(
            <>

                <Container className="App col-md-6 col-sm-12">
                    <Col className={'mb-4 mt-4'}>
                        <img style={{'width': '80px'}} src={require('./images/logo-pako.png')} />
                    </Col>
                    <div className={'border rounded bg-white'}>
                        <h3 className={'mb-2 mt-2'}>Log In</h3>
                        <Form className="form">
                            <Col>
                                <FormGroup>

                                    <InputField
                                        type={'text'}
                                        placeholder={'Username'}
                                        value={this.state.username ? this.state.username : ''}
                                        onChange={(val)=> this.setInputValue('username', val) }
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>

                                    <InputField
                                        type={'password'}
                                        placeholder={'Password'}
                                        value={this.state.password ? this.state.password : ''}
                                        onChange={(val)=> this.setInputValue('password', val) }
                                    />
                                </FormGroup>
                            </Col>
                            <div className="form-group form-check">
                                <Label className="form-check-label ">
                                    <input className="form-check-input" type="checkbox"/> Remember me
                                </Label>
                            </div>
                            <Submit
                                text={'Login'}
                                disabled={this.state.buttonDisabled}
                                onClick={()=> this.doLogin()}
                            />
                        </Form>
                    </div>
                </Container>
            </>
        )
    }
}
export default LoginForm;