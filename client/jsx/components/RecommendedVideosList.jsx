import VideoItem  from './VideoItem.jsx';
import VideosList  from './VideosList.jsx';
import VideoStore  from '../stores/VideoStore.jsx';
import { Input, Row, Col, Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';
export default class RecommendedVideoList extends VideosList {

 constructor() {
        super();
		console.log(this.state);
    }
  componentWillMount() {
		var randPos = Math.floor(Math.random() * (VideoStore.videosList.length-3));
        this.setState({
            videosList: VideoStore.videosList.slice(randPos,randPos+3),
        }); 
		VideoStore.addChangeListener(this._onVideoStoreUpdateListener.bind(this));
    }
  _onVideoStoreUpdateListener() {
        this.setState({
            videosList: VideoStore.videosList,
        }); 
		
    }	
  render() {
    return (
	  <div>
		<div className="header">
            Recommended Videos
        </div>
		<hr />
		<div className='clearfix row'>
			{this.state.videosList ? this.state.videosList.map(function (item, i) {
				return <Col key={i} xs={6} md={12} sm={6}> 
							<VideoItem width={200} height={200} editing={false} video={item} />
						</Col>;
				}):{}}
		</div>
	  </div>
    );
  }
}
