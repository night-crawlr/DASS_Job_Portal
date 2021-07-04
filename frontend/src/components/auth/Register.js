import React, { Component } from 'react';
import axios from "axios";
import { Form, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Container, Input, Label, Alert, } from 'reactstrap';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curskill: "",
            curinst: "",
            startY: "",
            endY: "",
            name: "",
            email: "",
            pass: "",
            type: "none",
            edu: [{
                instname: "",
                sy: "",
                ey: "",
            }],
            skills: [],
            rating: [],
            avgrating: 0,
            cno: "",
            bio: ""
        }
    }
    onNameChange = (e) => {
        this.setState({ name: e.target.value });
    }
    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }
    onPassChange = (e) => {
        this.setState({ pass: e.target.value });
    }
    onSelect = (e) => {
        this.setState({ type: e });
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
    oncnoChange = (e) => {
        this.setState({ cno: e.target.value });
    }
    onbioChange = (e) => {
        this.setState({ bio: e.target.value });
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
    renderFields = (edu) => {

        if (this.state.type == "Applicant") {

            return (
                <div className="form-group">
                    <Label>Education</Label>
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
            )
        } else if (this.state.type == "Recruiter") {
            return (
                <div className="from-group">
                    <Label>Contact Num</Label>
                    <Input type="text" className="form-control" value={this.state.cno} onChange={this.oncnoChange} />
                    <Label>Bio</Label>
                    <Input type="text" className="form-control" value={this.state.bio} onChange={this.onbioChange} />
                </div>
            )
        }
    }
    onSubmit = async (e) => {
        e.preventDefault();
        let instName = this.state.edu.map(e => e.instname);
        let sy = this.state.edu.map(e => e.sy);
        let ey = this.state.edu.map(e => e.ey);
        const user = {
            name: this.state.name,
            email: this.state.email,
            num: this.state.cno,
            bio: this.state.bio,
            jobsId: [],
            pass: this.state.pass,
            instName: instName,
            startY: sy,
            endY: ey,
            skills: this.state.skills
        }
        let endpoint = "http://localhost:4000/register"
        if (this.state.type == "none") {
            return;
        }
        else {
            if (this.state.type == "Applicant") {
                endpoint += "/appl";
            } else {
                endpoint += "/recr";
            }
        }
        const res = await axios.post(endpoint, user);
        console.log(res.data);
        await this.setState(
            {
                curskill: "",
                curinst: "",
                startY: "",
                endY: "",
                name: "",
                email: "",
                pass: "",
                type: "none",
                edu: [{
                    instname: "",
                    sy: "",
                    ey: "",
                }],
                skills: [],
                rating: [],
                avgrating: 0,
                cno: "",
                bio: ""
            }
        )
    }
    render() {
        return (
            <Container>
                <h1>Register</h1>
                <Link to="/auth" className="btn-link"><Button color="success">To Login Page</Button></Link>
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
                        <Label>Password</Label>
                        <Input type="password" className="from-control" value={this.state.pass} onChange={this.onPassChange} />
                    </div>
                    <DropdownButton
                        alignRight
                        title={this.state.type}
                        id="dropdown-menu-align-right"
                        onSelect={this.onSelect}
                    >
                        <Dropdown.Item eventKey="Applicant">Applicant</Dropdown.Item>
                        <Dropdown.Item eventKey="Recruiter">Recruiter</Dropdown.Item>
                    </DropdownButton>
                    {this.renderFields(this.state.edu)}
                    <br />
                    <div className="form-group">
                        <Input type="submit" value="Register" className="btn btn-outline-primary"></Input>
                    </div>
                </Form>
            </Container>
        )
    }
}

export default Register
