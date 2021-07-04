import axios from 'axios';
import React, { Component } from 'react'
import { } from "react-bootstrap";
import { Button, Table, Alert, Form, Label, Input, Container } from 'reactstrap';
import { Navbar, Nav } from "react-bootstrap"

export class Profile extends Component {
    constructor(props) {
        super(props);
        let type = sessionStorage.getItem("type");
        let user = JSON.parse(sessionStorage.getItem("user"));
        if (type == "Applicant" || user == null || user == undefined) {
            alert("Cannot access redirecting to home");
            this.props.history.push("/");
        }
        this.state = {
            type: "Recruiter",
            resdata: {
                name: "",
                email: "",
                _id: user._id,
                Number: "",
                bio: ""
            },
            edit: 0 //not in editmode
        }
    }
    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        axios.get("http://localhost:4000/recr/profile/" + user._id).then(res => {
            this.setState({
                type: "Recruiter",
                name: "",
                email: "",
                cno: "",
                bio: "",
                resdata: {
                    name: res.data.Name,
                    email: res.data.Email,
                    Number: res.data.contactNum,
                    bio: res.data.Bio,
                    _id: res.data._id
                },
                edit: 0 //not in edit mode
            });
        }
        )
    }
    onNameChange = (e) => {
        this.setState({ name: e.target.value });
    }
    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }
    oncnoChange = (e) => {
        this.setState({ cno: e.target.value });
    }
    onbioChange = (e) => {
        this.setState({ bio: e.target.value });
    }

    onSubmit = async () => {
        //need to send request to server
        let endpoint = "http://localhost:4000/recr/profile/" + this.state.resdata._id + "?";
        let query1 = "username="; let ans1 = this.state.name;
        let query2 = "&email="; let ans2 = this.state.email;
        let query3 = "&cno="; let ans3 = this.state.cno;
        let query4 = "&bio="; let ans4 = this.state.bio;
        endpoint += query1 + ans1 + query2 + ans2 + query3 + ans3 + query4 + ans4;
        let res = await axios.get(endpoint);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        await this.setState({
            type: "Recruiter",
            name: "",
            email: "",
            cno: "",
            bio: "",
            resdata: res.data,
            edit: 0
        });
    }
    enableEdit = () => {
        this.setState({
            edit: 1
        })
    }
    onEdit = () => {
        if (this.state.edit == 0) //on non edit mode
        {
            return (
                <React.Fragment>
                    <Table striped bordered hover size="sm">
                        {
                            Object.keys(this.state.resdata).map((e) => {
                                let key = e;
                                let value = this.state.resdata[e];
                                if (!Array.isArray(value)) {
                                    return (
                                        <tr>
                                            <th>{key}</th>
                                            <th>{value}</th>
                                        </tr>
                                    )
                                } else {
                                    let final = value[0];
                                    for (let i = 1; i < value.length; i++) {
                                        if (final === null || final == "") {
                                            final = value[i];
                                            continue;
                                        }
                                        final = final + "," + value[i];
                                    }

                                    return (
                                        <tr>
                                            <th>{key}</th>
                                            <th>{final}</th>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </Table>
                    <Button color="success" onClick={this.enableEdit} >Edit</Button>
                </React.Fragment>
            );
        } else {
            return (
                <Form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <Label>Name</Label>
                        <Input type="text" className="from-control" value={this.state.name} onChange={this.onNameChange} />
                    </div>
                    <div className="form-group">
                        <Label>Email</Label>
                        <Input type="email" className="from-control" value={this.state.email} onChange={this.onEmailChange} />
                    </div>
                    <div className="from-group">
                        <Label>Contact Num</Label>
                        <Input type="text" className="form-control" value={this.state.cno} onChange={this.oncnoChange} />
                        <Label>Bio</Label>
                        <Input type="text" className="form-control" value={this.state.bio} onChange={this.onbioChange} />
                    </div>
                    <div className="form-group">
                        <Input type="submit" value="Save" className="btn-success"></Input>
                    </div>
                </Form>

            )

        }
    }
    render() {
        return (
            <Container>
                <Navbar bg="primary" >
                    <Navbar.Brand href="/recr/prf">Profile</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/recr/job/create">Make Job</Nav.Link>
                        <Nav.Link href="/recr/myepls">My Employees</Nav.Link>
                        <Nav.Link href="/recr/myjbs">My Jobs</Nav.Link>
                        <Nav.Link onClick={() => {
                            sessionStorage.clear();
                            this.props.history.push("/");
                        }}>Log Out</Nav.Link>
                    </Nav>
                </Navbar>
                <br />
                <br />
                {this.onEdit()}
            </Container>
        )
    }
}

export default Profile
