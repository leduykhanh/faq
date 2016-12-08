import VideoItem  from './VideoItem.jsx';
import FaqsList  from './FaqsList.jsx';
import VideoStore  from '../stores/VideoStore.jsx';
import { Col} from 'react-bootstrap';
import React from 'react';
export default class RecommendedVideoList extends FaqsList {

 constructor() {
        super();
		console.log(this.state);
    }
  componentWillMount() {
		var randPos = Math.floor(Math.random() * (VideoStore.faqsList.length-3));
        this.setState({
            faqsList: VideoStore.faqsList.slice(randPos,randPos+3),
        }); 
		VideoStore.addChangeListener(this._onVideoStoreUpdateListener.bind(this));
    }
  _onVideoStoreUpdateListener() {
        this.setState({
            faqsList: VideoStore.faqsList,
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
			{this.state.faqsList ? this.state.faqsList.map(function (item, i) {
				return <Col key={i} xs={6} md={12} sm={6}> 
							<VideoItem width={200} height={200} editing={false} video={item} />
						</Col>;
				}):{}}
		</div>
	  </div>
    );
  }
}
