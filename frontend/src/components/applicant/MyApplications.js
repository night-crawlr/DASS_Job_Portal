import React, { Component } from 'react'
import axios from "axios";
import { Alert, Container, Nav, Navbar } from 'react-bootstrap';

class MyApplications extends Component {
    constructor(props) {
        super(props);
        let type = sessionStorage.getItem("type");
        let user = JSON.parse(sessionStorage.getItem("user"));
        if (type != "Applicant" || user == undefined) {
            alert("Cannot access redirecting to home");
            this.props.history.push("/");
        }
        this.state = {
            user: user,
            myappls: []
        }
    }
    componentDidMount() {
        let endpoint = "http://localhost:4000/appl/apply/?id=" + this.state.user._id;
        axios.get(endpoint).then(res => {
            let applications = res.data;
            this.setState({ myappls: applications });
        })
    }
    render() {
        return (<Container>
            <Navbar bg="primary" >
                <Navbar.Brand href="/appl/myappl">My Applications</Navbar.Brand>
                <Nav>
                    <Nav.Link href="/appl/prf">Profile</Nav.Link>
                    <Nav.Link href="/appl/srch">Search</Nav.Link>
                    <Nav.Link onClick={() => {
                        sessionStorage.clear();
                        this.props.history.push("/");
                    }}>Log Out</Nav.Link>
                </Nav>
            </Navbar>
            <br />
            {this.state.myappls.map(e => {
                let DOJ = "";
                if (e.Doj.Day == 0) {
                    DOJ = "Not applicable";
                } else {
                    DOJ = e.Doj.Day + "/" + e.Doj.Mon + "/" + e.Doj.Yea;
                }
                let status = "";
                let varaint = "";
                if (e.stage == 1) {
                    status = "Applied";
                    varaint = "secondary";
                }
                if (e.stage == 2) {
                    status = "Shortlisted";
                    varaint = "warning";
                }
                if (e.stage == 3) {
                    status = "Accepted";
                    varaint = "success";
                }
                if (e.stage == 4) {
                    status = "Rejected";
                    varaint = "danger";
                } return (
                    <Alert variant={varaint}>{"Title :   " + e.title}<br />{"Recruiter :   " + e.recname}<br />{"Salary :   " + e.salary}<br />{"Date of Joining :   " + DOJ}<br />{"Status :   " + status}<br /></Alert>

                )
            })}
        </Container>)
    }
}

export default MyApplications;