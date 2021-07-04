import React, { Component } from "react";
import axios from "axios";
import { Navbar, Nav, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Container, Label, Input, Form, Alert } from "reactstrap";
import { PhotoSizeSelectActual } from "@material-ui/icons";
import { Applications } from "./Application";
export class ShowDesiredApplications extends Component {
    constructor(props) {
        super(props);
        let type = sessionStorage.getItem("type");
        let user = JSON.parse(sessionStorage.getItem("user"));
        let obj = JSON.parse(sessionStorage.getItem("fromeditjobs"));
        if (user == null || user == undefined || type == null || type == undefined || type == "Applicant" || obj == undefined || obj == null) {
            alert("Cannot access redirecting to home");
            this.props.history.push("/");
        }
        this.state = {
            recid: obj.recid,
            jobid: obj.jobid,
            tosend: [],
            sortby: "Sort By",
            order: ""
        }
    }
    componentDidMount() {
        //http://localhost:4000/recr/applications/?id=&jid=&sortby=
        axios.get(`http://localhost:4000/recr/applications/?id=${this.state.recid}&jid=${this.state.jobid}`).then(res => {
            this.setState({ tosend: res.data });
        })

    }
    onSelect = async (e) => {
        let endpoint = `http://localhost:4000/recr/applications/?id=${this.state.recid}&jid=${this.state.jobid}&sortby=`
        let sortby = "";
        if (e == "Name") {
            sortby = "name";
        } else if (e == "Rating") {
            sortby = "avgrating";
        } else {
            sortby = "DOA";
        }
        endpoint += sortby;
        let res = await axios.get(endpoint);
        let order = this.state.order;
        let tosend = res.data;
        console.log(22222, tosend);
        if (order == "Descending") {
            tosend.reverse();
            console.log(1111111, tosend);
        }
        await this.setState({ tosend: tosend, sortby: e });
        console.log("completed");
    }
    onRender = () => {
        let renders = this.state.tosend.map(e => {
            console.log(e);
            console.log(e.name);
            let color = "";
            if (e.SOA == 2) {
                color = "#ffbf00"
            } else if (e.SOA == 3) {
                color = "#00ff40";
            }

            return (
                <Applications obj={e} history={this.props.history} color={color} ></Applications>
            )
        })
        return renders;
    }
    onorder = (e) => {
        this.setState({ order: e })
    }
    render() {
        return (
            <Container>
                <Navbar bg="primary" >
                    <Nav>
                        <Nav.Link href="/recr/prf">Profile</Nav.Link>
                        <Nav.Link href="/recr/job/create">Make Job</Nav.Link>
                        <Nav.Link href="/recr/myjbs">My Jobs</Nav.Link>
                        <Nav.Link onClick={() => {
                            sessionStorage.clear();
                            this.props.history.push("/");
                        }}>Log Out</Nav.Link>
                    </Nav>
                </Navbar>
                <br />
                <DropdownButton
                    alignRight
                    title={this.state.sortby}
                    id="dropdown-menu-align-right"
                    onSelect={this.onSelect}
                >
                    <Dropdown.Item eventKey="Name">Name (Default)</Dropdown.Item>
                    <Dropdown.Item eventKey="Rating">Rating</Dropdown.Item>
                    <Dropdown.Item eventKey="DOA">Date of Application</Dropdown.Item>
                </DropdownButton>
                <br />
                <DropdownButton
                    alignRight
                    title={"Order :" + this.state.order}
                    id="dropdown-menu-align-right"
                    onSelect={this.onorder}
                >
                    <Dropdown.Item eventKey="Ascending">Ascending</Dropdown.Item>
                    <Dropdown.Item eventKey="Descending">Descending</Dropdown.Item>
                </DropdownButton>
                {this.onRender()}
                <br />
            </Container>
        )
    }
};