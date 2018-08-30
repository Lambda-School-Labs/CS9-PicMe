import React, {Component} from 'react';
import {Modal, Header, Segment, Input, Button} from "semantic-ui-react";
import "./css/profile-settings.css";
// import Navbar from "../Navbar/Navbar"
import Axios from "axios";
import Closed from "./icons/closed.png";
import Open from "./icons/open.png"
import "./css/settings.css"

class ProfileSettings extends Component {
    constructor() {
        super();

        this.state = {
            firstName: "", //With redux defualt values will be user's info
            lastName: "",
            email: "",
            password: "",
            nickname: "",
            //Styling below
            closed: show,
            open: noshow,
            showPass: "password",
            modalOpen: false
        }
    }


    onEyeClick = () => {
        if(this.state.closed === show) { //Makes password visible and changes icon
            this.setState({
                closed: noshow,
                open: show,
                showPass: "text"
            })
        } else {
            this.setState({
                closed: show,
                open: noshow,
                showPass: "password"
            })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {currEmail: localStorage.email};
        // Adds only properties updated so values aren't overwritten with blanks
        if (this.state.firstName !== "") updatedUser.first_name = this.state.firstName;
        if (this.state.lastName !== "") updatedUser.last_name = this.state.lastName;
        if (this.state.email !== "") updatedUser.email = this.state.email;
        if (this.state.password !== "") updatedUser.password = this.state.password;
        if (this.state.nickname !== "") updatedUser.nick_names = this.state.nickname;

        Axios.put(`${process.env.REACT_APP_API}/update`, updatedUser, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(response => {
            this.setState({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                nickname: "",
                modalOpen: true
            });
        }).catch(err => {
            console.log(err)
        })
    }

    handleClose = () => this.setState({ modalOpen: false })

    //Post method will be here, server needs work first


    render() {
        const modalStyle = {
            margin: 'auto',
            marginTop: '50% - 80px',
            height: '160px'
        };
        return(
            <div className="settings__nav">
                <Modal open={this.state.modalOpen} onClose={this.handleClose} size='small' style={modalStyle}>
                    <Modal.Content>
                        <Modal.Description>
                            <h4>Settings Changed</h4>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary onClick={this.handleClose}>
                            OK
                        </Button>
                    </Modal.Actions>
                </Modal>
                <form onSubmit={this.onSubmit} className="settings">
                    <Header as='h3' content='Edit Profile' style={style.h3} textAlign='center' />
                    {/* <Container text> */}
                    <Segment.Group className="settings-container">
                        <Segment>First Name: <Input name="firstName" onChange={this.onChange} value={this.state.firstName} type="text"/></Segment>
                        <Segment>Last Name: <Input name="lastName" onChange={this.onChange} value={this.state.lastName} type="text"/></Segment>
                        <Segment>Email: <Input name="email" onChange={this.onChange} value={this.state.email} type="text"/></Segment>
                        <Segment>Password: <Input name="password" type={this.state.showPass} value={this.state.password} onChange={this.onChange}/>
                        <div className="settings__icon">
                            <img onClick={this.onEyeClick} style={this.state.closed} src={Closed} alt="Password hidden"/>
                            <img onClick={this.onEyeClick} style={this.state.open} src={Open} alt="Password hidden"/>
                        </div>
                        </Segment>
                        <Segment>Nickname: <Input name="nickname" onChange={this.onChange} value={this.state.nickname} type="text"/></Segment>
                    </Segment.Group>
                    <Button type="submit" content='Save' primary />
                    {/* </Container> */}
                </form>
            </div>
        )
    }
}

const style = {
}


const show = {

}

const noshow = {
    display: "none"
}

export default ProfileSettings;
