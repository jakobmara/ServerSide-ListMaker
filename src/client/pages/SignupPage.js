import axios from 'axios';
import React, { Component } from 'react';
import {
    Row,
    Form,
    Col,
    Button
} from 'react-bootstrap';
import Cookies from 'universal-cookie'
import { Redirect } from 'react-router-dom'

class SignupPage extends Component{
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
        let reqURL = 'https://list-maker-api.herokuapp.com/signUp'
        await axios.post(reqURL, {
            userName: uName,
            password: uPassword
        }).then((response) => {
            if (response.data.status_code === 406){
                console.log("bad Signup")
                this.setState({errorText: "Invalid username/password please try again"})
            }else{
                const cookies = new Cookies();
                
                cookies.set('username', response.data.username);
                cookies.set('userId', response.data.userId);
                this.setState({isLoggedIn: true})
                browserHistory.push('/');
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
                    <h1 className="formTitle">Signup</h1>
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
                            <Button variant="primary" type="submit">Signup</Button> 
                        </Col>
                    
                    </Form>
                </div>
            </Row>
        </div>);
    }
}
export default {
    component: SignupPage
};