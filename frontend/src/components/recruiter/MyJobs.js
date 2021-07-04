import React, { Component } from "react";
import axios from "axios";
import { Navbar, Nav, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Container, Label, Input, Form, Alert } from "reactstrap";
import { EditJobs } from "./EditJobs";
export class MyJobs extends Component {
    constructor(props) {
        super(props);
        let type = sessionStorage.getItem("type");
        let user = JSON.parse(sessionStorage.getItem("user"));
        if (user == null || user == undefined || type == null || type == undefined || type == "Applicant") {
            alert("Cannot access redirecting to home");
            this.props.history.push("/");
        }
        this.state = {
            user: user,
            global: []
        };

    }
    componentDidMount() {

        let user = JSON.parse(sessionStorage.getItem("user"));

        console.log("Iam in component did mount")
        //let user = JSON.parse(sessionStorage.getItem("user"));
        axios.get("http://localhost:4000/qanda/getJobs?recid=" + user._id).then(res => {
            console.log("Iam in request")
            this.setState({ global: res.data }) // global contains an array of object ,each objet contains two propeties one is jobDoc (object) and applications (array of objects)
        })
    }
    render() {
        console.log("Iam at start")
        let jobs = this.state.global.map(e => {
            console.log("Iam in confrendering");
            return (
                <EditJobs job={e.jobDoc} applications={e.applications} history={this.props.history} ></EditJobs>
            )
        })
        console.log(jobs);
        return (
            <Container>
                <Navbar bg="primary" >
                    <Navbar.Brand href="/recr/myjbs">My Jobs</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/recr/prf">profile</Nav.Link>
                        <Nav.Link href="/recr/job/create">Make Job</Nav.Link>
                        <Nav.Link href="/recr/myepls">My Employees</Nav.Link>
                        <Nav.Link onClick={() => {
                            sessionStorage.clear();
                            this.props.history.push("/");
                        }}>Log Out</Nav.Link>
                    </Nav>
                </Navbar>
                {jobs}
            </Container>
        )
    }
}