import VideoItem  from './VideoItem.jsx';
import LoginStore  from '../stores/LoginStore.jsx';
import VideoStore  from '../stores/VideoStore.jsx';
import FaqServices  from '../services/FaqServices.jsx';
import { Input, Row, Col, Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';
import React from 'react';
import RecommendedVideosList from './RecommendedVideosList.jsx';
import { LinkContainer } from 'react-router-bootstrap';
export default class VideoDetail extends React.Component {

 constructor() {
        super();
        this.state = {
            videosList:[],
			videoItem:null,
			showModal: false
        };
    }
  componentWillMount() {
	  var queryParams = (this.props.location.query);
	  if(LoginStore.isLoggedIn()){
		FaqServices.loadVideoDetail(LoginStore.sessionId,queryParams.videoId);
		FaqServices.loadVideosList(LoginStore.sessionId);
		}
	   VideoStore.addChangeListener(this._onVideoDetailListener.bind(this));
    }
  _onVideoDetailListener() {
		console.log("VideoStore.videoDetail",VideoStore.videoDetail);
		this.setState({videoItem:VideoStore.videoDetail});
		
    }
   closeModal() {
    this.setState({ showModal: false });
	}
	
	showModal() {
    this.setState({ showModal: true });
	}
  render() {
    var testData = {username:'ali',password:'password'};
    var itemToRender = <LoginForm data={testData}  />;
	if(LoginStore.isLoggedIn()){
		itemToRender = (this.state.videoItem?
		(<Row className="margin-top">
		  <Col md={9} xs={12} sm={12} lg={9} >
			<VideoItem controls={true} type="detail" showModal={this.showModal.bind(this)} width={600} height={500} editing={true} video={this.state.videoItem} />
		  </Col>
		  <Col md={3} xs={12} sm={12} lg={3} > <RecommendedVideosList /></Col>
		 </Row>)
			:<span>Loading</span>)
	}
    return (
		<div className='full-width left panel-border'>
			<LinkContainer to={'/'}>
				<Button>Back</Button>
			</LinkContainer>
			{itemToRender}
			<Modal show={this.state.showModal} onHide={this.closeModal}>
			  <Modal.Body>
				Thanks for your ratings :)
			  </Modal.Body>

			  <Modal.Footer>
				<Button onClick={this.closeModal.bind(this)}>Close</Button>
			  </Modal.Footer>

			</Modal>
		</div>
    );
  }
}
