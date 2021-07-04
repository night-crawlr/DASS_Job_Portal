import React, { Component } from "react";
import axios from "axios";
import { Navbar, Nav, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Container, Label, Input, Form, Alert } from "reactstrap";

export class JobCreation extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(sessionStorage.getItem("user"));
        let type = sessionStorage.getItem("type");
        if (user == null || user == undefined || type == null || type == undefined || type == "Applicant") {
            alert("Cannot access redirecting to home");
            this.props.history.push("/");
        }
        this.state = {
            curskill: "",
            Title: "",
            recid: user._id,
            maxApplication: "",
            maxPositions: "",
            DFA: "",
            skillsRequired: [],
            jobType: "",
            Duration: "",
            Salary: "",
        }
    }
    onadd1 = () => {
        let skills1 = this.state.skillsRequired;
        let curskill = this.state.curskill;
        if (curskill == "") {
            return
        }
        skills1.push(curskill);
        this.setState({
            skillsRequired: skills1,
            curskill: ""
        });
    }
    onTitlechange = (e) => {
        this.setState({ Title: e.target.value });
    }
    onMAchange = (e) => {
        this.setState({ maxApplication: e.target.value });
    }

    onMPchange = (e) => {
        this.setState({ maxPositions: e.target.value });
    }

    DFAchange = (e) => {
        this.setState({ DFA: e.target.value });
    }

    onduChange = (e) => {
        this.setState({ Duration: e.target.value });
    }

    onsalarychange = (e) => {
        this.setState({ Salary: e.target.value });
    }
    onSelect = (e) => {
        this.setState({ jobType: Number(e) });
    }
    onskillChange = (e) => {
        this.setState({ curskill: e.target.value })
    }

    renderthis1 = () => {
        const ret = this.state.skillsRequired.map((el, id) => {

            const value = "skillsRequired : " + el;
            if (el == "") {
                return ("");
            }
            return (<Alert>{value}</Alert>)
        })
        return ret;
    }
    onSubmit = async (e) => {
        e.preventDefault();
        let job = {
            Name: this.state.Title,
            maxapp: this.state.maxApplication,
            maxpo: this.state.maxPositions,
            date: {
                day: 0,
                month: 0,
                year: 0,
                hour: 0,
                min: 0
            },
            skillsreq: this.state.skillsRequired,
            type: this.state.jobType,
            duration: this.state.Duration,
            salary: this.state.Salary
        }
        let tobeFormat = this.state.DFA;
        let newarr = tobeFormat.split("-");
        job.date.day = newarr[2];
        job.date.month = newarr[1];
        job.date.year = newarr[0];
        job.date.hour = 11;
        job.date.min = 55;
        let user = JSON.parse(sessionStorage.getItem("user"));
        let res = await axios.post("http://localhost:4000/recr/jobs/" + user._id, job);
        //geting the updated user info
        let res1 = await axios.get("http://localhost:4000/recr/profile/" + user._id);
        sessionStorage.setItem("user", JSON.stringify(res1.data));
    }
    render() {
        return (
            <Container>
                <Navbar bg="primary" >
                    <Navbar.Brand href="/recr/job/create">Make Job</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/recr/prf">profile</Nav.Link>
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
                <Form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <Label>Title Of Job</Label>
                        <Input type="text" required className="from-control" value={this.state.Title} onChange={this.onTitlechange} />
                    </div>
                    <div className="form-group">
                        <Label>Maximum Applciations</Label>
                        <Input type="text" required className="from-control" value={this.state.maxApplication} onChange={this.onMAchange} />
                    </div>
                    <div className="form-group">
                        <Label>Maximum Positions</Label>
                        <Input type="text" required className="from-control" value={this.state.maxPositions} onChange={this.onMPchange} />
                    </div>
                    <div className="form-group">
                        <Label>Deadline For Applications on Job</Label>
                        <Input type="date" required className="from-control" value={this.state.DFA} onChange={this.DFAchange} />
                    </div>
                    <div className="form-group">
                        <Label>skillsRequired</Label>
                        {this.renderthis1()}
                        <Input type="text" className="from-control" value={this.state.curskill} onChange={this.onskillChange} />
                        <Button color="success" onClick={this.onadd1}>Add Skill</Button>

                    </div>
                    <div className="form-group">
                        <DropdownButton
                            alignRight
                            aria-required
                            title="Job Type"
                            id="dropdown-menu-align-right"
                            onSelect={this.onSelect}
                        >
                            <Dropdown.Item eventKey="1">Full Time</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Part Time</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Work from Home</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className="form-group">
                        <Label>Job Duration</Label>
                        <Input type="text" required placeholder="0(indefinite) to 6 months" className="from-control" value={this.state.Duration} onChange={this.onduChange} />
                    </div>
                    <div className="form-group">
                        <Label>Salary</Label>
                        <Input type="text" required className="from-control" value={this.state.Salary} onChange={this.onsalarychange} />
                    </div>
                    <Input type="submit" value="Register" className="btn btn-outline-primary"></Input>

                </Form>
            </Container>
        )
    }
}