import React, { Component } from 'react'
import axios from "axios";
import { Button, Container, Dropdown, DropdownButton, Nav, Navbar, Alert } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortby: "",
            jt: "",
            sx: "",
            sy: "",
            d: 7,
            jobs: [],
            recnames: [],
            tobesub: [],
            searchon: "",
            showSOP: {
                show: false,
                text: ""
            },
            respromise: {},
            order: ""
        }
    }
    componentDidMount() {
        let endpoint = "http://localhost:4000/appl/search/";
        axios.get(endpoint).then(res => {
            this.setState({ jobs: res.data });
        });
    }
    hadleChange = (e) => {
        this.setState({ sortby: e });
    }
    handlesx = (e) => {
        this.setState({ sx: e.target.value });
    }
    handlesy = (e) => {
        this.setState({ sy: e.target.value });
    }
    onchange = (e) => {
        this.setState({ jt: e });
    }
    valueforthis(x) {
        if (x == "") {
            return "";
        } else if (x == 1) {
            return "Full-time";
        } else if (x == 2) {
            return "Part-time";
        } else {
            return "Work from Home";
        }
    }
    duChange = (e) => {
        this.setState({ d: e });
    }
    handletitle = (e) => {
        this.setState({ searchon: e.target.value });
    }
    buuton = async () => {
        let endpoint = "http://localhost:4000/appl/search/?";
        let jt = this.state.jt;
        if (jt != "") {
            endpoint += `jt=${jt}&`;
        }
        let sx = this.state.sx;
        if (sx != "") {
            endpoint += `sx=${sx}&`;
        }
        let sy = this.state.sy;
        if (sy != "") {
            endpoint += `sy=${sy}&`;
        }
        let d = this.state.d;
        endpoint += `d=${d}&`;
        let Title = this.state.searchon;
        if (Title != "") {
            endpoint += `title=${Title}&`;
        }
        let sortby = this.state.sortby;
        if (sortby != "") {
            if (sortby == "Rating") {
                sortby = "avgRating";
            }
            endpoint += `sortby=${sortby}`;
        }
        let res = await axios.get(endpoint);
        await this.setState({ jobs: res.data });
        let recids = this.state.jobs.map(e => e.recid);
        let res1 = await axios.post("http://localhost:4000/qanda/recnames", recids);
        await this.setState({ recnames: res1.data });
        console.log(this.state.jobs, this.state.recnames);
        let jobs = this.state.jobs;
        let recnames = this.state.recnames;
        let user = JSON.parse(sessionStorage.getItem("user"));
        let obj = {
            jobs,
            applid: user._id
        }
        res = await axios.post("http://localhost:4000/qanda/forsearch", obj)

        let statuses = res.data;
        console.log(statuses);
        let tobsub = [];
        let order = this.state.order;
        for (let i = 0; i < jobs.length; i++) {
            //1 mamul color
            //2 green
            //3 red
            let j = i;
            if (order == "Descending") {
                j = jobs.length - 1 - i
            }
            let btnstatus = "";
            if (statuses[j] == 1) btnstatus = "Apply"
            if (statuses[j] == 2) btnstatus = "Applied"
            if (statuses[j] == 3) btnstatus = "Full"

            let varaint = "";
            if (statuses[j] == 1) varaint = "secondary";
            if (statuses[j] == 2) varaint = "success";
            if (statuses[j] == 3) varaint = "danger";
            tobsub.push(<Alert variant={varaint}>{"Title   :  " + jobs[j].Title}<br />{"Recruiter Name   :  " + recnames[j]}<br />{"Salary   :  " + jobs[j].Salary}<br />{"Duration   :  " + jobs[j].Duration}<br />{"Deadline    :  " + `${jobs[j].DFA.Day}-${jobs[j].DFA.Month}-${jobs[j].DFA.Year}-${jobs[j].DFA.Hour}:${jobs[j].DFA.Minute}`}
                <br /><Button variant={varaint} onClick={e => {
                    if (statuses[j] == 1) {
                        this.apply(e, jobs[j], user._id)
                    };
                }}>{btnstatus}</Button></Alert>)
        }
        await this.setState({ tobesub: tobsub });
    }
    apply = async (e, job, applid) => {
        let user = JSON.parse(sessionStorage.getItem("user"));
        //need to apply;
        if (user.curappl >= 10) {
            alert("Sorry maximum limit for open applications is 10");
            this.setState({
                showSOP: {
                    show: false,
                    text: this.state.showSOP.text
                }
            })
        }
        await this.setState({
            showSOP: {
                show: true,
                text: ""
            }
        })

        let d = new Date();
        let endpoint = "http://localhost:4000/appl/apply";
        let objtosend = {
            recid: job.recid,
            applid: applid,
            jobid: job._id,
            SOP: "",
            SOA: 1,
            Doa: {
                Day: d.getDate(),
                Mon: d.getMonth() + 1,
                Yea: d.getFullYear()
            },
            Doj: {
                Day: 0,
                Mon: 0,
                Yea: 0
            }
        };
        const prom = new Promise((res, rej) => {
            this.setState({ respromise: res });
        })
        console.log(11111111);
        objtosend.SOP = await prom;
        console.log(objtosend);
        let applicantDoc = await axios.post("http://localhost:4000/appl/apply", objtosend);
        sessionStorage.setItem("user", JSON.stringify(applicantDoc.data));
    }
    renderJobs = () => {
        return (this.state.tobesub);
    }
    onoder = (e) => {
        this.setState({ order: e })
    }
    render() {
        return (<React.Fragment>
            <Navbar bg="primary" >
                <Navbar.Brand href="/appl/srch">Search</Navbar.Brand>
                <Nav>
                    <Nav.Link href="/appl/prf">Profile</Nav.Link>
                    <Nav.Link href="/appl/myapl">My Applications</Nav.Link>
                    <Nav.Link onClick={() => {
                        sessionStorage.clear();
                        this.props.history.push("/");
                    }}>Log Out</Nav.Link>
                </Nav>
            </Navbar>
            <Container>
                <br />
                <DropdownButton
                    alignRight
                    title={"Job Type : " + this.valueforthis(this.state.jt)}
                    id="dropdown-menu-align-right"
                    onSelect={this.onchange}
                >
                    <Dropdown.Item eventKey={""}>{"None (No filter is applied)"} </Dropdown.Item>
                    <Dropdown.Item eventKey={1}>Full-time</Dropdown.Item>
                    <Dropdown.Item eventKey={2}>Part-time</Dropdown.Item>
                    <Dropdown.Item eventKey={3}>Work From Home</Dropdown.Item>
                </DropdownButton>

                <br />
                <DropdownButton
                    alignRight
                    title={"Duration :  < " + this.state.d}
                    id="dropdown-menu-align-right"
                    onSelect={this.duChange}
                >
                    <Dropdown.Item eventKey={7}>{"None (No filter is applied)"}</Dropdown.Item>
                    <Dropdown.Item eventKey={1}>{"< 1"}</Dropdown.Item>
                    <Dropdown.Item eventKey={2}>{"< 2"}</Dropdown.Item>
                    <Dropdown.Item eventKey={3}>{"< 3"}</Dropdown.Item>
                    <Dropdown.Item eventKey={4}>{"< 4"}</Dropdown.Item>
                    <Dropdown.Item eventKey={5}>{"< 5"}</Dropdown.Item>
                    <Dropdown.Item eventKey={6}>{"< 6"}</Dropdown.Item>
                    <Dropdown.Item eventKey={7}>{"< 7"}</Dropdown.Item>
                </DropdownButton>
                <br />
                <DropdownButton
                    alignRight
                    title={"Sort By : " + this.state.sortby}
                    id="dropdown-menu-align-right"
                    onSelect={this.hadleChange}
                >
                    <Dropdown.Item eventKey="">{"Title (Default)"}</Dropdown.Item>
                    <Dropdown.Item eventKey="Salary">Salary</Dropdown.Item>
                    <Dropdown.Item eventKey="Duration">Duration</Dropdown.Item>
                    <Dropdown.Item eventKey="Rating">Rating</Dropdown.Item>
                </DropdownButton>
                <br />
                <DropdownButton
                    alignRight
                    title={"Order : " + this.state.order}
                    id="dropdown-menu-align-right"
                    onSelect={this.onoder}
                >
                    <Dropdown.Item eventKey={"Ascending"}>Ascending</Dropdown.Item>
                    <Dropdown.Item eventKey={"Descending"}>Descending</Dropdown.Item>
                </DropdownButton>
                <br />
                <List component="nav" aria-label="mailbox folders">
                    <ListItem button>
                        <form noValidate autoComplete="off">
                            <label>Salary</label>
                            <TextField id="standard-basic" value={this.state.sx} onChange={this.handlesx} label="Enter Min" fullWidth={true} />
                            <br />
                            <br />
                            <TextField id="standard-basic" value={this.state.sy} onChange={this.handlesy} label="Enter Max" fullWidth={true} />
                        </form>
                    </ListItem>
                    <ListItem button>
                        <form noValidate autoComplete="off">
                            <label>Search on Tile</label>
                            <TextField id="standard-basic" value={this.state.searchon} onChange={this.handletitle} label="Enter Min" fullWidth={true} />
                        </form>
                    </ListItem>
                </List>
                <Button onClick={this.buuton}>Apply</Button>
                <br />
                <br />
                <br />
                {this.renderJobs()}
                <Dialog open={this.state.showSOP.show} onClose={() => { this.setState({ showSOP: { show: false, text: this.state.showSOP.text } }) }} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">SOP</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Write the SOP in lessthan 250 words
                            </DialogContentText>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="SOP"
                            multiline
                            value={this.state.showSOP.text}
                            onChange={(e) => {
                                this.setState({
                                    showSOP: {
                                        show: true,
                                        text: e.target.value
                                    }
                                })
                            }}
                            variant="outlined"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { console.log("I closed"); this.setState({ showSOP: { show: false, text: this.state.showSOP.text } }); this.state.respromise(this.state.showSOP.text) }} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </React.Fragment>

        )
    }
}


export default Search;