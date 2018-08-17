import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment, Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom' //need this for history.push
import Axios from '../../node_modules/axios';

class RegistrationForm extends Component {

  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: ''
  }

  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    console.log("The input values are", Object.values(this.state));

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }

    Axios.post("http://localhost:5000/signup", newUser)
    .then(response => {
      console.log(response)
      alert("Success")
      window.location.reload()
    }).catch(err => {
      alert("Sign up failed, please make sure no field is left blank");
      this.setState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      })
    })
  }

  render() {
    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 650 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Register for a new account  
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  onChange={this.handleInput}
                  name="first_name"
                  value={this.state.first_name}
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='First Name'
                />
                <Form.Input
                  onChange={this.handleInput}
                  name="last_name"
                  value={this.state.last_name}
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='Last Name'
                />
                <Form.Input
                  onChange={this.handleInput}
                  name="email"
                  value={this.state.email}
                  fluid icon='mail'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input
                  onChange={this.handleInput}
                  name="password"
                  value={this.state.password}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                <Form.Input
                  onChange={this.handleInput}
                  name="password_confirm"
                  value={this.state.password_confirm}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password Confirm'
                  type='password'
                />

                <Button color='teal' fluid size='large'>
                  Register
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const ModalContainer = props => (
  <Modal dimmer="blurring" style={{height: '34em', marginTop: '10em'}} size="small" open={props.openLogin} onClose={props.closeLogin} centered={false}>
      <RegistrationForm history={props.history} />
  </Modal>
)

export default withRouter(ModalContainer);
