import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
    }
  }

  signUp() {
    const { email, password, confirmPassword } = this.state;

    if (password === confirmPassword) {
      //Run Firebase Auth
      firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => {
          this.setState({error: error.message});
          console.log('Error', error);
        });
    } else {
      this.setState({error: "Passwords don't match."})
    }
  }

  render() {
    return(
      <div>
        <h2>Sign Up</h2>
        <form className="form">
          <div className="inner-form">
            <input
              className="email"
              type="email"
              placeholder="Email"
              onChange={event => this.setState({email: event.target.value})}
            />
            <input
              className="password"
              type="password"
              placeholder="Password"
              onChange={event => this.setState({password: event.target.value})}
            />
            <input
              className="password"
              type="password"
              placeholder="Confirm Password"
              onChange={event => this.setState({confirmPassword: event.target.value})}
            />
          </div>
          <div><Link to={'/signin'}>Alresd have an account? Click here to sign in</Link></div>
          <input
            className="sign-up-btn"
            type="submit"
            value="Create Account"
            onClick={() => this.signUp()}
          />
        </form>
        <div>{this.state.error}</div>
      </div>
    );
  }
}

export default SignUp;
