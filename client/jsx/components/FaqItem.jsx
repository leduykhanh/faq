import React from 'react';
import {FormControl,Form} from 'react-bootstrap';
import {NumberPicker, DropdownList, SelectList} from "react-widgets";
import VideoStore  from '../stores/VideoStore.jsx';
export default class FaqItem extends React.Component {

    constructor(props) {
        super();

        this.state = {
            item: props.item
        };
    }
    changeQ(val){
        var item = this.state.item;
        item.question = val.target.value;
        this.setState({item:item});
        this.props.changeCurrent(item);
    }
    changeA(val){
        var item = this.state.item;
        item.answer = val.target.value;
        this.setState({item:item});
        this.props.changeCurrent(item);
    }
     changeC(val){
        var item = this.state.item;
        item.category = val._id;
        this.setState({item:item});
        this.props.changeCurrent(item);
    }
    render(){
        const dropDown = VideoStore.categories;
        return(
            <Form horizontal>
                <div className="form-group">
                    <label className="col-xs-6">Category:</label>
                    <div className="col-xs-6">
                        <DropdownList onChange={this.changeC.bind(this)} data={dropDown} textField="name" valueField="_id" defaultValue={dropDown[0]._id}></DropdownList>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-xs-6">Question:</label>
                    <div className="col-xs-6">
                        <FormControl onChange={this.changeQ.bind(this)} value={this.state.item.question}></FormControl>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-xs-6">Answer:</label>
                    <div className="col-xs-6">
                        <FormControl onChange={this.changeA.bind(this)} value={this.state.item.answer}></FormControl>
                    </div>
                </div>
            </Form>
        )
    }
}