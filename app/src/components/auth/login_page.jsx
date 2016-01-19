import React from 'react';
import $ from 'jquery';
import LoginForm from './login_form.jsx';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.successfulSignUp = this.successfulSignUp.bind(this);
    this.failedSignUp = this.failedSignUp.bind(this);
    this.deleteUsernameErrors = this.deleteUsernameErrors.bind(this);
    this.deletePasswordErrors = this.deletePasswordErrors.bind(this);
    this.state={ usernameErrors:[], passwordErrors:[] };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  successfulSignUp (username) {
    this.context.router.push('/users/' + username);
  }

  failedSignUp (errors) {
    $(".submit").removeClass("disabled").prop("disabled", false);

    let [usernameErrors, passwordErrors] = [[], []];

    errors.forEach (function (err) {
      switch (err[0]) {
        case "username":
          usernameErrors.push(err[1][0]);
          $(".login-form-username-input").addClass("invalid");
          break;
        case "password":
          passwordErrors.push(err[1][0]);
          if (!$(".login-form-password-input").hasClass("invalid")) {
            $(".login-form-password-input").addClass("invalid");
          }
          break;
      }
    });

    this.setState({
      usernameErrors: usernameErrors,
      passwordErrors: passwordErrors
    });
  }

  deleteUsernameErrors () {
    this.setState({ usernameErrors: [] })
  }

  deletePasswordErrors () {
    this.setState({ passwordErrors: [] })
  }

  render () {
    return (
      <div className="login-page">
        <h1>Welcome to Chatterbox!</h1>
        <h2>Please login to continue.</h2>
        <LoginForm success={ this.successfulSignUp }
          failure={ this.failedSignUp }
          usernameErrors={ this.state.usernameErrors }
          passwordErrors={ this.state.passwordErrors }
          deleteUsernameErrors={ this.deleteUsernameErrors }
          deletePasswordErrors={ this.deletePasswordErrors }/>
      </div>
    );
  }
}

export default LoginPage;
