import React from 'react';	
import VideosList from './VideosList.jsx';
import LoginForm from './LoginForm.jsx';
import LoginStore from '../stores/LoginStore.jsx';
import FaqServices from '../services/FaqServices.jsx';
import AuthenticationServices from '../services/AuthenticationServices.jsx';
import { Input, Row, Col, Image, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
export default class App extends React.Component {

  constructor(){
    super();
	this.state = {
		videosList : [],
		sessionId : LoginStore.isLoggedIn(),
	};
  }
    refresh(videosList){
		this.setState({videosList:videosList});
  }
  componentWillMount(){
	if(LoginStore.isLoggedIn()){
		FaqServices.loadVideosList(LoginStore.sessionId);
		}
	LoginStore.addChangeListener(this._onLoginListener.bind(this));
  }

  _onLoginListener(){
	this.setState({sessionId:LoginStore.sessionId});
  }
  
  logout(){
	AuthenticationServices.logout(this.state.sessionId);
  }
  render() {
	console.log("LoginStore.isLoggedIn()",LoginStore.isLoggedIn());
	var testData = {username:'ali',password:'password'};
    var itemToRender = <LoginForm data={testData} refresh={this.refresh.bind(this)} />;
	
	if(this.state.sessionId){
		itemToRender = <div>
				<div className="text-right profile row">
					<Image src="img/blank_avatar_thumbnail.jpg" className="img-circle img-responsive" />
					<Button onClick={this.logout.bind(this)} className="pull-right">Log out</Button>
				</div>
				<Row><VideosList /></Row>
				</div>;
		}
    return (
	<div>
		{itemToRender}
	</div>
    );
  }
};