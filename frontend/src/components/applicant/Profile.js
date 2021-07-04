import React, { Component } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap"
import { Button, Table, Alert, Form, Label, Input, Container } from 'reactstrap';

export class Profile extends Component {
    constructor(props) {
        super(props);

        let type = sessionStorage.getItem("type");
        let user = JSON.parse(sessionStorage.getItem("user"));
        if (type != "Applicant" || user == undefined) {
            alert("Cannot access redirecting to home");
            this.props.history.push("/");
        }
        this.state = {
            resdata: {},
            edit: 0,
            curskill: "",
            curinst: "",
            startY: "",
            endY: "",
            name: "",
            email: "",
            pass: "",
            edu: [{
                instname: "",
                sy: "",
                ey: "",
            }],
            skills: [],
            rating: [],
            avgrating: 0,

        }
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        this.setState({ resdata: user });
    }
    renderthis = (edu) => {

        const ret = edu.map((el, id) => {

            const value = `Instution Name : ${el.instname} , Start Year : ${el.sy} , End Year : ${el.ey}`;
            if (el.instname == "") {
                return "";
            }
            return (<Alert key={id}>{value}</Alert>)
        })
        return (ret)
    }
    onNameChange = (e) => {
        this.setState({ name: e.target.value });
    }
    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }
    oninstChange = (e) => {
        this.setState({ curinst: e.target.value });
    }
    onskillChange = (e) => {
        this.setState({ curskill: e.target.value })
    }
    onstartChange = (e) => {
        this.setState({ startY: e.target.value });
    }

    onendChange = (e) => {
        this.setState({ endY: e.target.value });
    }
    renderthis1 = () => {
        const ret = this.state.skills.map((el, id) => {

            const value = "Skills : " + el;
            if (el == "") {
                return ("");
            }
            return (<Alert>{value}</Alert>)
        })
        return ret;
    }
    onadd = () => {
        let edu1 = this.state.edu
        let curinst = this.state.curinst;
        let startY = this.state.startY;
        let endY = this.state.endY;
        if (curinst == "") {
            return;
        }
        edu1.push(
            {
                instname: curinst,
                sy: startY,
                ey: endY
            }
        );
        this.setState({
            edu: edu1,
            curinst: "",
            startY: "",
            endY: ""
        });
    }
    onadd1 = () => {
        let skills1 = this.state.skills;
        let curskill = this.state.curskill;
        if (curskill == "") {
            return
        }
        skills1.push(curskill);
        this.setState({
            skills: skills1,
            curskill: ""
        });
    }

    showOnEdit = () => {
        if (this.state.edit == 1) {
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
                    <div className="form-group">
                        <Label>Education</Label>
                        <br />
                        {this.renderthis(this.state.edu)}
                        <Label>Instution Name</Label>
                        <Input type="text" className="from-control" value={this.state.curinst} onChange={this.oninstChange} />
                        <Label>Start year</Label>
                        <Input type="text" className="from-control" value={this.state.startY} onChange={this.onstartChange} />
                        <Label>End year</Label>
                        <Input type="text" className="from-control" value={this.state.endY} onChange={this.onendChange} />
                        <Button color="success" onClick={this.onadd}>Add Education</Button>
                        <br></br>
                        <Label>Skills</Label>
                        {this.renderthis1()}
                        <Input type="text" className="from-control" value={this.state.curskill} onChange={this.onskillChange} />
                        <Button color="success" onClick={this.onadd1}>Add Skill</Button>
                    </div>
                </Form>
            )

        } else {
            return (
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
            )
        }
    }
    toogleEdit = async () => {
        if (this.state.edit == 1) {
            //sending request to save data
            let tobesend = {
                name: this.state.name,
                email: this.state.email,
                instName: [],
                startY: [],
                endY: [],
                skills: this.state.skills
            };
            let made1 = this.state.edu.map((e) => e.instname);
            tobesend.instName = made1;
            let made2 = this.state.edu.map((e) => e.sy);
            tobesend.startY = made2;
            let made3 = this.state.edu.map((e) => e.ey);
            tobesend.endY = made3;
            console.log(tobesend);
            let res = await axios.post("http://localhost:4000/appl/profile/" + this.state.resdata._id, tobesend);
            await this.setState({ resdata: res.data });
            sessionStorage.setItem("user", JSON.stringify(res.data));
        }
        this.setState({ edit: (1 - this.state.edit) });
    }
    r = () => {
        if (this.state.edit == 0)
            return "Edit";
        return "Save";
    }
    render() {
        return (
            <Container>
                <Navbar bg="primary" >
                    <Navbar.Brand href="/appl/prf">Profile</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/appl/srch">Search</Nav.Link>
                        <Nav.Link href="/appl/myapl">My Applications</Nav.Link>
                        <Nav.Link onClick={() => {
                            sessionStorage.clear();
                            this.props.history.push("/");
                        }}>Log Out</Nav.Link>
                    </Nav>
                </Navbar>
                <br />
                <br />
                {this.showOnEdit()}
                <Button color="success" onClick={this.toogleEdit}>{this.r()}</Button>
            </Container >
        )
    }
}

export default Profile;
