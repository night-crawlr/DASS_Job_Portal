import React, { Component } from "react";
import axios from "axios";
import { Navbar, Nav, Dropdown, DropdownButton, Button, Card } from "react-bootstrap";
import { Container, Label, Input, Form, Alert } from "reactstrap";

//this.props contain only jobid. ie only this.props.jobid


export class EditJobs extends Component {
    constructor(props) {
        console.log("Constructor of edit.js")
        super(props);
        let type = sessionStorage.getItem("type");
        let user = JSON.parse(sessionStorage.getItem("user"));
        if (user == null || user == undefined || type == null || type == undefined || type == "Applicant") {
            alert("Cannot access redirecting to home");
            this.props.history.push("/");
        }
        this.state = {
            job: this.props.job,
            applications: this.props.applications,
            edit: 0,
            MNA: "",
            MNP: "",
            DFA: "",
            HOUR: "",
            MIN: "",
        }
        // this.setState({ MNA: this.state.job.maxApplication });

        // this.setState({ MNP: this.state.job.maxPositions });
        // this.setState({ DFA: this.state.job.DFA.Day + "-" + this.state.job.DFA.Month + "-" + this.state.job.Year });
        // this.setState({ HOUR: this.state.job.DFA.Hour });
        // this.setState({ MIN: this.state.job.DFA.Minute });
    }
    componentDidMount() {
        this.setState({ MNA: this.state.job.maxApplication });

        this.setState({ MNP: this.state.job.maxPositions });
        this.setState({ DFA: this.state.job.DFA.Year + "-" + this.state.job.DFA.Month + "-" + this.state.job.DFA.Day });
        this.setState({ HOUR: this.state.job.DFA.Hour });
        this.setState({ MIN: this.state.job.DFA.Minute });
    }
    onMNAchange = (e) => {
        this.setState({ MNA: e.target.value });
    }
    onMNPchange = (e) => {
        this.setState({ MNP: e.target.value });
    }
    onDFAchange = (e) => {
        this.setState({ DFA: e.target.value });
    }
    onDFAHchange = (e) => {
        this.setState({ HOUR: e.target.value });
    }
    onDFAMchange = (e) => {
        this.setState({ MIN: e.target.value });
    }

    onEdit = () => {
        this.setState({ edit: 1 });
    }
    onSave = async () => {
        let endpoint = "http://localhost:4000/recr/edit/" + this.state.job.recid + "?jobid=" + this.state.job._id;
        let editedMNA = this.state.MNA; let query1 = `&mna=${editedMNA}`;
        let editedMNP = this.state.MNP; let query2 = `&mnp=${editedMNP}`;
        let editedHOUR = this.state.HOUR; let query3 = `&hr=${editedHOUR}`;
        let editedMIN = this.state.MIN; let query4 = `&min=${editedMIN}`;
        let tobeFormat = this.state.DFA;
        let newarr = tobeFormat.split("-");
        let deitedDFAd = newarr[2]; let query5 = `&day=${deitedDFAd}`;
        let deitedDFAm = newarr[1]; let query6 = `&mon=${deitedDFAm}`;
        let deitedDFAy = newarr[0]; let query7 = `&yea=${deitedDFAy}`;
        endpoint += query1 + query2 + query3 + query4 + query5 + query6 + query7

        let resjob = await axios.get(endpoint);
        console.log(resjob.data);
        await this.setState({ job: resjob.data });
        await this.setState({ edit: 0 });
    }
    onBack = () => {
        this.setState({ edit: 0 });
    }
    onApplications = async (e) => {
        //need to send this.applications
        // need to send each applicant details of each application
        // let req = {
        //     applications: this.state.applications
        // }
        // let applicants = await axios.post("http://localhost:4000/qanda/seeApplicants", req);
        // let obj = {
        //     applicants: applicants.data,
        //     applications: req.applications
        // }
        // sessionStorage.setItem("obj", JSON.stringify(obj));
        let recid = JSON.parse(sessionStorage.getItem("user"))._id;
        let jobid = this.state.job._id;
        sessionStorage.setItem("fromeditjobs", JSON.stringify({ recid, jobid }));
        this.props.history.push("/recr/myjbs/applications");

    }
    render() {
        console.log("iam in condrendering of editjs");
        let job = this.state.job;
        let title = job.Title;
        let DOPd = job.DOP.Day;
        let DOPm = job.DOP.Month;
        let DOPy = job.DOP.Year;
        let DOP = DOPd + "-" + DOPm + "-" + DOPy;
        let noofApplicants = this.state.applications.length;
        let MNP = job.maxPositions;
        //this.setState({ BMNP: MNP });
        let MNA = job.maxApplication;
        //this.setState({ BMNA: MNA });
        let DFAd = job.DFA.Day;
        let DFAm = job.DFA.Month;
        let DFAy = job.DFA.Year;
        let DFAh = job.DFA.Hour;
        let DFAmi = job.DFA.Minute;
        let DFA = DFAd + "-" + DFAm + "-" + DFAy;
        console.log(this.state.MNA, this.state.MNP, this.state.DFA)
        if (this.state.edit == 0) {
            //console.log("here edit=0")

            //this.setState({ BDFA: DFA });
            //this.setState({ BHOUR: DFAh });
            //this.setState({ obj: { BMIN: DFAmi, BHOUR: DFAh, BDFA: DFA, BMNA: MNA, BMNP: MNP } });
            return (
                <Container>
                    <br />
                    <Card>
                        <Card.Body>
                            <Card.Title>{"Title :  " + title}</Card.Title>
                            <Card.Title>{"No Of Applications :  " + noofApplicants}</Card.Title>
                            <Card.Title>{"Max No Of Positions :  " + MNP}</Card.Title>
                            <Card.Title>{"Max No Of Applications :  " + MNA}</Card.Title>
                            <Card.Title>{"Date OF Posting :  " + DOPd + "-" + DOPm + "-" + DOPy}</Card.Title>
                            <Card.Title>{"Date For Application :  " + DFAd + "-" + DFAm + "-" + DFAy + "-" + DFAh + "-" + DFAmi}</Card.Title>
                            <Button variant="primary" style={{ marginRight: "50%" }} onClick={(e) => this.onEdit(e)}>Edit</Button>
                            <Button variant="primary" onClick={(e) => this.onApplications(e)}>See All non-rejected Applications</Button>
                        </Card.Body>
                    </Card>
                </Container>
            )
        } else {
            return (
                <Container>
                    <Card>
                        <Card.Body>
                            <Alert color="danger">If you need to go back You should not change any field ! once you have changed any character you must hit save (if you hit back you data is changed to recvoer you must refresh the page)</Alert>
                            <Form>
                                <div className="form-group">
                                    <Label>Maximum Number of Applications</Label>
                                    <Input type="text" required placeholder={`before it was ${MNA}`} className="from-control" value={this.state.MNA} onChange={this.onMNAchange} />
                                </div>
                                <div className="form-group">
                                    <Label>Maximum Number of Positions</Label>
                                    <Input type="text" required placeholder={`before it was ${MNP}`} className="from-control" value={this.state.MNP} onChange={this.onMNPchange} />
                                </div>
                                <div className="form-group">
                                    <Label>Deadline for Application                             {`before it was ${DFA}`}</Label>
                                    <Input type="date" required className="from-control" value={this.state.DFA} onChange={this.onDFAchange} />
                                    <Input type="text" required placeholder={`Mention DFA in hours ,before it was ${DFAh}`} className="from-control" value={this.state.HOUR} onChange={this.onDFAHchange} />
                                    <Input type="text" required placeholder={`Mention DFA in minutes ,before it was ${DFAmi}`} className="from-control" value={this.state.MIN} onChange={this.onDFAMchange} />
                                </div>
                                <div className="form-group">
                                    <Button style={{ marginRight: "75%" }} className="primary" onClick={this.onSave}>Save</Button>
                                    <Button className="primary" onClick={this.onBack}>{"Back"}</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            )
        }

    }
}