import React from 'react';
import { Input, Row, Col, Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from './Rating.jsx';
import ReactPlayer from 'react-player'
export default class VideoItem extends React.Component {

	 constructor() {
			super();
			this.state = {
				
			};
		}
	 
	 
	 //To display long description in ..
	  _getDisplayValue(realValue, maxLength) {
			console.log(this.props.type);
			if (realValue.length <= maxLength || this.props.type=="detail") {
				return realValue;
			} else {
				return (
					<span>{realValue.substring(0, maxLength) + '...'}</span>
				);
			}
		}
	
	  //When start will pause the rest
	  _onStart(){
	  
	  }
	  
	  showModal() {
		this.props.showModal();
		}
	  render() {
	  console.log(this.props.video);
		return (
		  <div className="video-item">
			{this.props.video.name}
		  </div>
		);
	  }
}
