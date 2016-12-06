import FaqItem  from './FaqItem.jsx';
import VideoStore  from '../stores/VideoStore.jsx';
import LoginStore  from '../stores/LoginStore.jsx';
import { Input, Row, Col, Badge, Button, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import FaqServices from '../services/FaqServices.jsx';
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import LazyLoad from 'react-lazy-load';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
export default class FaqList extends React.Component {

 constructor() {
        super();

        this.state = {
            faqsList:[],
            showModal:false
        };
    }
  componentWillMount() {
        this.setState({
            faqsList: VideoStore.faqsList,
        }); 
		VideoStore.addChangeListener(this._onVideoStoreUpdateListener.bind(this));
    }
  _onVideoStoreUpdateListener() {
        this.setState({
            faqsList: VideoStore.faqsList,
        }); 
		
    }
  fetchMoreVideos(){
	//FaqServices.loadfaqsList(LoginStore.sessionId,this.state.faqsList.length,4);
  }
    openNew(){
        this.setState({showModal:true});
    }
    close(){
        this.setState({showModal:false});
    }
  render() {
      console.log(this.state.faqsList);
      var showCat = function (cell, row) {
          return cell.name;
      }
    return (
	  <div>
          <div>
              <Button onClick={this.openNew.bind(this)} className="btn btn-default">Add new faq</Button>
          </div>
		<div className='margin-top row'>
            <BootstrapTable data={ this.state.faqsList }>
                <TableHeaderColumn dataField='_id' isKey>Category ID</TableHeaderColumn>
                <TableHeaderColumn dataField='question' filter={ { type: 'TextFilter', delay: 1000 } }>Question</TableHeaderColumn>
                <TableHeaderColumn dataField='answer'>Faq Description</TableHeaderColumn>
                <TableHeaderColumn dataField='category' dataFormat={showCat}>Category</TableHeaderColumn>
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
          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Add new Faq</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FaqItem />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.openNew.bind(this)} className="btn btn-default">Save</Button>
              </Modal.Footer>
            </Modal>
	 </div>
    );
  }
}
