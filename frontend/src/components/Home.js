import React, { Component } from 'react';
import { Button, Container } from "reactstrap";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

export class Home extends Component {
    render() {
        return (
            <Container className="Home">
                <h1 style={{ marginLeft: "22%", marginTop: "20%" }}> Job-Application Portal</h1>
                <div style={{ margin: "10% 10% 5% 5%", textAlign: "center" }}>
                    <Link to="/auth" className="btn-link"><Button style={{ marginRight: "15%", marginLeft: "-4%" }} color="success">Login</Button></Link>
                    <Link to="/reg" className="btn-link"><Button color="success">Register</Button></Link>
                </div>
            </Container>
        )
    }
}
//<Button color="success">Login</Button>

export default Home;
