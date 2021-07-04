import React, { Component } from 'react'
import axios from "axios";
import { Alert, Container, Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';

class MyApplications extends Component {
    constructor(props) {
        super(props);
        let type = sessionStorage.getItem("type");
        let user = JSON.parse(sessionStorage.getItem("user"));
        if (user == null || user == undefined || type == null || type == undefined || type == "Applicant") {
            alert("Cannot access redirecting to home");
            this.props.history.push("/");
        }
        this.state = {
            user,
            employees: [],
            sortby: "",
            order: "",
        }
    }
    componentDidMount() {
        let endpoint = "http://localhost:4000/recr/employees/?id=" + this.state.user._id;
        axios.get(endpoint).then(res => {
            let employs = res.data;
            this.setState({ employees: employs });
            console.log(employs);
        })
    }
    renderThis = () => {
        let tobesortemployees = this.state.employees;
        let sortby = this.state.sortby;

        let sortedarray = [];
        let order = this.state.order;
        if (order == "Descending") {
            order = -1;
        } else {
            order = 1;
        }
        if (sortby == "Name" || sortby == "") {
            sortedarray = tobesortemployees.sort((a, b) => {
                let a1 = a.name.toLowerCase();
                let b1 = b.name.toLowerCase();

                if (a1 < b1) return (-1 * order);
                if (a1 > b1) return (1 * order);
                return 0;
            })
        } else if (sortby == "Title") {
            sortedarray = tobesortemployees.sort((a, b) => {
                let a1 = a.title.toLowerCase();
                let b1 = b.title.toLowerCase();

                if (a1 < b1) return (-1 * order);
                if (a1 > b1) return (1 * order);
                return 0;
            })
        } else if (sortby == "DOJ") {
            sortedarray = tobesortemployees.sort((a, b) => {
                let ay = a.yea; let by = b.yea;
                let am = a.mon; let bm = b.mon;
                let ad = a.day; let bd = b.day;
                if (ay == by) {
                    if (am == bm) {
                        if (ad == bd) {
                            return 0;
                        } else {
                            return ((ad - bd) * order);
                        }
                    } else {
                        return (order * (am - bm));
                    }
                } else {
                    return (order * (ay - by));
                }
            })
        }
        let tobereturned = sortedarray.map(e => {
            let DOJ = "";
            if (e.day == 0) {
                DOJ = "Not applicable";
            } else {
                DOJ = e.day + "/" + e.mon + "/" + e.yea;
            }
            let status = "";
            let varaint = "";
            varaint = "secondary";
            if (e.Jobtype == 1) {
                status = "Full-time";
            }
            if (e.Jobtype == 2) {
                status = "Part-time";
            }
            if (e.Jobtype == 3) {
                status = "Work From Home";
            }
            return (
                <Alert variant={varaint}>{"Title :   " + e.title}<br />{"Applicant :   " + e.name}<br />{"Date of Joining :   " + DOJ}<br />{"Job Type :   " + status}<br /></Alert>
            )
        })
        return (tobereturned);
    }
    hadleChange = (e) => {
        this.setState({ sortby: e })
    }
    hadleChange1 = (e) => {
        this.setState({ order: e })
    }
    render() {
        return (
            <Container>
                <Navbar bg="primary" >
                    <Navbar.Brand href="/recr/myepls">My Employees</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/recr/prf">profile</Nav.Link>
                        <Nav.Link href="/recr/myjbs">My Jobs</Nav.Link>
                        <Nav.Link href="/recr/job/create">Make Job</Nav.Link>
                        <Nav.Link onClick={() => {
                            sessionStorage.clear();
                            this.props.history.push("/");
                        }}>Log Out</Nav.Link>
                    </Nav>
                </Navbar>
                <br />
                <DropdownButton
                    alignRight
                    title={"Sort By : " + this.state.sortby}
                    id="dropdown-menu-align-right"
                    onSelect={this.hadleChange}
                >
                    <Dropdown.Item eventKey="Name">{"Name (Default)"}</Dropdown.Item>
                    <Dropdown.Item eventKey="Title">Title</Dropdown.Item>
                    <Dropdown.Item eventKey="DOJ">DOJ</Dropdown.Item>
                </DropdownButton>
                <br />
                <DropdownButton
                    alignRight
                    title={"Sort By : " + this.state.order}
                    id="dropdown-menu-align-right"
                    onSelect={this.hadleChange1}
                >
                    <Dropdown.Item eventKey="Ascending">Ascending</Dropdown.Item>
                    <Dropdown.Item eventKey="Descending">Descending</Dropdown.Item>
                </DropdownButton>
                <br />
                {this.renderThis()}
            </Container>
        )
    }
}
export default MyApplications;