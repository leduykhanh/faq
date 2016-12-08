import React from 'react';
import ReactDOM from 'react-dom';
import Portal from 'react-portal';
import {Button,Modal,Accordion,Panel} from 'react-bootstrap';
import VideoStore  from '../jsx/stores/VideoStore.jsx';
import LoginStore from '../jsx/stores/LoginStore.jsx';
import FaqServices from '../jsx/services/FaqServices.jsx';
import {Menu,MainButton} from 'react-mfb';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default class App extends React.Component {
  constructor(){
      super();
      this.state = {
          showModal:false,
          sessionId : LoginStore.isLoggedIn(),
          categories:[]
      }
  }
    componentWillMount() {
        this.setState({
            categories: VideoStore.faqsList,
        });
		VideoStore.addChangeListener(this._onVideoStoreUpdateListener.bind(this));
        LoginStore.addChangeListener(this._onLoginListener.bind(this));
    }
    componentDidMount(){
        this.setState({
            categories: VideoStore.faqsList,
        });
    }

  _onVideoStoreUpdateListener() {
        this.setState({
            categories: VideoStore.categories,
        });

    }
     _onLoginListener(){
	this.setState({sessionId:LoginStore.sessionId});
  }
    close(){
        this.setState({showModal:false});
    }
    showFaq(){
        this.setState({showModal:true});
        FaqServices.loadCategoriesList();
    }
  render() {
      var effect = 'zoomin',
    pos = 'br',
    method = 'hover';
    const style = {
        bottom: 5,
        right:5,
        position:"fixed"
        };
    const button = <MuiThemeProvider>
            <FloatingActionButton style={style} onClick={this.showFaq.bind(this)} >FAQ</FloatingActionButton>
      </MuiThemeProvider>;

    return (
        <div>
            <Modal className="faq-modal" show={this.state.showModal} onHide={this.close.bind(this)} >
                <Modal.Header closeButton>
                    <Modal.Title>FAQ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                      <Accordion>
                          {this.state.categories.map(function(item,index){
                              return <Panel header={item.name} eventKey={index}>
                                  {item.description}
                                </Panel>
                          })}
                      </Accordion>
                </Modal.Body>
            </Modal>
            {button}
        </div>
    );
  }

}



ReactDOM.render(<App />, document.getElementById('react-widget'));