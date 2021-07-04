import React, { Component } from "react";
import axios from "axios";
import { Navbar, Nav, Dropdown, DropdownButton, Button, Card } from "react-bootstrap";
import { Container, Label, Input, Form, Alert } from "reactstrap";

export class Applications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: this.props.obj,
            SOA: ""
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ obj: nextProps.obj, SOA: nextProps.obj.SOA });
    }
    showEdu = () => {
        let SOA = this.state.SOA;
        if (SOA == 1) {
            return "Applied";
        }
        if (SOA == 2) {
            return "Shortlisted";
        }
        if (SOA == 3) {
            return "Accpeted";
        }
    }
    onShortlist = async (e) => {
        //changing status to 2
        this.setState({ SOA: 2 });
        let endpoint = "http://localhost:4000/recr/applications/status?s=2&aid=" + this.state.obj.applicationid;
        await axios.get(endpoint);
        // window.location.reload(false)
    }
    onAccept = async (e) => {
        //changing status to 2
        this.setState({ SOA: 3 });
        let endpoint = "http://localhost:4000/recr/applications/status?s=3&aid=" + this.state.obj.applicationid;
        await axios.get(endpoint);
        //   window.location.reload(false)
    }
    onReject = async (e) => {
        //changing status to 2
        this.setState({ SOA: 4 });
        let endpoint = "http://localhost:4000/recr/applications/status?s=4&aid=" + this.state.obj.applicationid;
        await axios.get(endpoint);
        // window.location.reload(false)
    }
    okafunction = () => {
        console.log(this.state.SOA);
        if (this.state.SOA == 1 || this.state.SOA == 2) {
            return (
                <div>
                    <Button variant="primary" style={{ marginRight: "50%" }} onClick={(e) => this.onShortlist(e)}>Shortlist</Button>
                    <Button variant="primary" onClick={(e) => this.onAccept(e)}>Accept</Button>
                    <Button variant="primary" onClick={(e) => this.onReject(e)}>Reject</Button>
                </div>
            )
        }
    }
    componentDidMount() {
        this.setState({ SOA: this.state.obj.SOA })
    }
    render() {
        return (
            <Container>
                <br />
                <Card>
                    <Card.Body>
                        <Card.Title>{"Name :      " + this.state.obj.name}</Card.Title>
                        <Card.Title>{"Skills :  \n" + "\t\t" + this.state.obj.skills}</Card.Title>
                        <Card.Title>{"Edcation :   \n" + "\t\t" + this.state.obj.instName + "\t\t" + this.state.obj.startY + "\t\t" + this.state.obj.endY}</Card.Title>
                        <Card.Title>{"Deadline Of Application : " + this.state.obj.doa.Day + "-" + this.state.obj.doa.Mon + "-" + this.state.obj.doa.Yea}</Card.Title>
                        <Card.Title>{"SOP : " + this.state.obj.SOP}</Card.Title>
                        <div style={{ backgroundColor: this.props.color }}><Card.Title>{"SOA  :" + this.showEdu()}</Card.Title></div>
                        {this.okafunction()}
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
