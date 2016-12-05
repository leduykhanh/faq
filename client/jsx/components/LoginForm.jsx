import React from 'react';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import { Button, Glyphicon } from 'react-bootstrap';
import AuthenticationServices from '../services/AuthenticationServices.jsx';
export default class LoginForm extends React.Component {
    _handleValidSubmit(values){
		console.log(values);
        AuthenticationServices.login(values.username, values.password);
        this.setState({ isLoading: true });
    }
	
	loginSuccess(list){
		this.props.refresh(list);
	}
    _handleInvalidSubmit(errors, values) {
        console.log("invalid submit");
    }
	
  render() {
    var userGlyphicon = <Glyphicon glyph="user" />;
    var passwordGlyphicon = <Glyphicon glyph="lock" />;
	   
    return(
	   <div className="col-md-4 col-md-offset-4 ">
          <Form  role="form" className="col-xs-12 text-center"
            onValidSubmit={this._handleValidSubmit.bind(this)}
              onInvalidSubmit={this._handleInvalidSubmit.bind(this)} >
          <div className="header">
            Please Login !
          </div>
          <div className="form-group">
              <ValidatedInput
                  type="text"
                  name="username"
                  className=""
                  id="username"
                  placeholder="Username"
                  validationEvent='onBlur'
                  addonBefore={userGlyphicon}
                  validate='required'
                  errorHelp={{
                    required: 'Username cannot be empty',
                  }} />
          </div>
          <div className="form-group">

            <ValidatedInput
              name="password"
              type="password"
              className=""
              placeholder="Password"
              addonBefore={passwordGlyphicon}
              validationEvent='onBlur'
              ref="password"
              validate='required,isLength:6:30'
              errorHelp={{
                required: 'Password cannot be empty.',
                isLength: 'Password must be at least 6 characters.'
              }} />
          </div>
          <div className="form-group">
              <Button type="submit"
              className="btn btn-primary btn-lg btn-block"
              disabled = {false}>
                  Login
              </Button>

          </div>
           </Form>
		</div>
    );
  }
  }