import React, { Component } from 'react';
import axios from "axios";
import { Form, Alert, Button } from "react-bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Container, Input, Label } from 'reactstrap';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            pass: "",
            type: "none",
            error: "no"
        }
    }
    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }
    onPassChange = (e) => {
        this.setState({ pass: e.target.value });
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            pass: this.state.pass,
        }
        let endpoint = "http://localhost:4000/login"
        const res = await axios.post(endpoint, user);
        console.log(res.data);
        if (res.data.error != undefined) {
            await this.setState({ error: "yes" });
            sessionStorage.setItem("logedin", 0);
        } else {
            await this.setState({ error: "no" });
            console.log(res.data);
            if (res.data.contactNum == undefined) // he is a applicant
            {
                sessionStorage.setItem("type", "Applicant");
                sessionStorage.setItem("user", JSON.stringify(res.data));
                sessionStorage.setItem("logedin", 1);
                this.props.history.push("/appl/prf");
            } else {
                sessionStorage.setItem("type", "Recruiter");
                sessionStorage.setItem("user", JSON.stringify(res.data));
                sessionStorage.setItem("logedin", 1);
                this.props.history.push("/recr/prf");
            }
        }
        await this.setState(
            {
                email: "",
                pass: "",
                type: "none"
            }
        )
    }

    onAlert = () => {

        if (this.state.error == "no") {
            return
        }
        else {
            return (
                <Alert variant="danger">
                    <p>
                        Authentication Failed !
                    </p>
                </Alert>
            )
        }
    }

    render() {
        return (
            <Container>
                <h1>Login</h1>
                <Link to="/reg" className="btn-link" ><Button color="success">To Register Page</Button></Link>
                <br></br>
                <br></br>
                {this.onAlert()}
                <Form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <Label>Email</Label>
                        <Input type="email" className="from-control" value={this.state.email} onChange={this.onEmailChange} />
                    </div>
                    <div className="form-group">
                        <Label>Password</Label>
                        <Input type="password" className="from-control" value={this.state.pass} onChange={this.onPassChange} />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <Input type="submit" value="Login" className="btn btn-outline-primary"></Input>
                    </div>
                </Form>
            </Container>
        )
    }
}

export default Login
