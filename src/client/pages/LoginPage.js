import axios from 'axios';
import React, { Component } from 'react';
import {
    Row,
    Form,
    Col,
    Button
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import Cookies from 'universal-cookie'
import { loginUser } from '../actions';

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            errorText: '',
            isLoggedIn: false
        }
    }

    async submit(e){
        e.preventDefault();

        let uName = document.getElementById("username").value
        let uPassword = document.getElementById("password").value
        let reqURL = 'https://list-maker-api.herokuapp.com/login'
        await axios.post(reqURL, {
            userName: uName,
            password: uPassword
        }).then((response) => {
            if (response.data.status_code === 406){
                console.log("bad login")
                this.setState({errorText: "Invalid username/password please try again"})
            }else{
                const cookies = new Cookies();
                this.setState({isLoggedIn: true})
                console.log('calling dispatcher now')
                this.props.loginAction(response.data.username, response.data.userId);
            }
            console.log(response);
        })
        
    }

    render(){

        if(this.state.isLoggedIn){
            return <Redirect to="/"/>
        }

        return (
        <div>
            <Row className="homePageRow">
                <div className="w-25 mx-auto formShadow">
                    <h1 className="formTitle">Login</h1>
                    <Form onSubmit={(e) => this.submit(e)}>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="username">Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" id="username" required/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" id="password" required/>
                        </Form.Group>
                        <div>
                            <p className="errorText"> {this.state.errorText} </p>
                        </div>

                        <Col className="centerText">
                            <Button variant="primary" type="submit">Login</Button> 
                        </Col>
                    
                    </Form>
                </div>
            </Row>
        </div>);
    }
}

function mapDispatchToProps(dispatch){
    return ({
        loginAction : (userName, userId) => {dispatch(loginUser(userName, userId))}
    })
}

export default {
    component: connect(null,mapDispatchToProps)(LoginPage)
};