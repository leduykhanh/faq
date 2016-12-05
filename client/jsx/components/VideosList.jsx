import VideoItem  from './VideoItem.jsx';
import VideoStore  from '../stores/VideoStore.jsx';
import LoginStore  from '../stores/LoginStore.jsx';
import { Input, Row, Col, Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import FaqServices from '../services/FaqServices.jsx';
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import LazyLoad from 'react-lazy-load';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
export default class VideoList extends React.Component {

 constructor() {
        super();

        this.state = {
            videosList:[]
        };
    }
  componentWillMount() {
        this.setState({
            videosList: VideoStore.videosList,
        }); 
		VideoStore.addChangeListener(this._onVideoStoreUpdateListener.bind(this));
    }
  _onVideoStoreUpdateListener() {
        this.setState({
            videosList: VideoStore.videosList,
        }); 
		
    }
  fetchMoreVideos(){
	//FaqServices.loadVideosList(LoginStore.sessionId,this.state.videosList.length,4);
  }
  render() {
      console.log(this.state.videosList);
    return (
	  <div>
          <div>
              <Button className="btn btn-default">Add new faq</Button>
          </div>
		<div className='margin-top row'>
            <BootstrapTable data={ this.state.videosList }>
                <TableHeaderColumn dataField='_id' isKey>Category ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name' filter={ { type: 'TextFilter', delay: 1000 } }>Faq Name</TableHeaderColumn>
                <TableHeaderColumn dataField='description'>Faq Description</TableHeaderColumn>
                <TableHeaderColumn >Action</TableHeaderColumn>
            </BootstrapTable>

		</div>
		<div>
			<LazyLoad
				height={300}
				onContentVisible={this.fetchMoreVideos.bind(this)}
				>
				<div>Fetching more FAQs...</div>
			</LazyLoad>
		</div>
	 </div>
    );
  }
}
