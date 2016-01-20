import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import ApiUserUtil from '../../apiutil/api_user_util.js';

class SignUpForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.handleSignUpSubmission = this.handleSignUpSubmission.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changePasswordConf = this.changePasswordConf.bind(this);
    this.changeFile = this.changeFile.bind(this);
    this.state = {
        username: "",
        password: "",
        passwordConf: "",
        imageUrl: "/images/avatar_placeholder.png",
        imageFile: null
    };
  }

  handleSignUpSubmission (e) {
    if (e) { e.preventDefault(); }

    $(".submit").addClass("disabled").prop("disabled", true);

    let formData = new FormData();

    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    formData.append("confirm", this.state.passwordConf);
    formData.append("avatar", this.state.imageFile);

    ApiUserUtil.create(formData, this.props.success, this.props.failure);
  }

  handleKeyPress (e) {
    if (e.charCode === 13) { this.handleSignUpSubmission(); }
  }

  changeUsername (e) {
    if ($(".form-username-input").hasClass("invalid")) {
      $(".form-username-input").removeClass("invalid");
    }

    this.props.deleteUsernameErrors();

    this.setState({ username: e.currentTarget.value });
  }

  changePassword (e) {
    this.removeInvalidClass();

    this.props.deletePasswordErrors();

    this.setState({ password: e.currentTarget.value });
  }

  changePasswordConf (e) {
    this.removeInvalidClass();

    this.props.deletePasswordErrors();

    this.setState({ passwordConf: e.currentTarget.value });
  }

  removeInvalidClass () {
    if ($(".form-password-input").hasClass("invalid")) {
      $(".form-password-input").removeClass("invalid");
    }
  }

  changeFile (e) {
    let reader = new FileReader();
    let file = e.currentTarget.files[0];

    reader.onloadend = () =>
      this.setState({ imageUrl: reader.result, imageFile: file });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
  }

  render() {
    let usernameErrors = this.props.usernameErrors.map( function(err, idx) {
      return <li key={ idx }>{ err }</li>;
    });

    let passwordErrors = this.props.passwordErrors.map( function (err, idx) {
      return <li key={ idx }>{ err }</li>;
    });
    return (
      <form className="sign-up-form"
        onKeyPress={ this.handleKeyPress }
        onSubmit={ this.handleSignUpSubmission }>

        <div className="sign-up-form-wrapper">
          <label>Username
          <ul className="error-wrapper">
            { usernameErrors }
          </ul>
          <input
            className="form-username-input"
            type="text"
            onChange={ this.changeUsername }/>
          </label>

          <label>Password
          <ul className="error-wrapper">
            { passwordErrors }
          </ul>
          <input
            className="form-password-input"
            type="password"
            onChange={ this.changePassword }/>
          </label>

          <label>Confirm Password
          <input
            className="form-password-input"
            type="password"
            onChange={ this.changePasswordConf }/>
          </label>

          <label>Avatar Upload
          <input
            className="form-avatar"
            type="file"
            onChange={ this.changeFile }/>
          </label>

          <img className="form-avatar-preview" src={ this.state.imageUrl } />

          <button className="submit" type="submit">Sign Up!</button>
          <Link to={ `/` }>Already have an account?</Link>
        </div>
      </form>
    );
  }
}

export default SignUpForm;
