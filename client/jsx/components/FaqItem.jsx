import React from 'react';
import {FormControl} from 'react-bootstrap';
import {NumberPicker, DropdownList, SelectList} from "react-widgets";
import VideoStore  from '../stores/VideoStore.jsx';
export default class FaqItem extends React.Component {

    constructor() {
        super();

        this.state = {
            item: null
        };
    }
    render(){
        const dropDown = VideoStore.categories;
        return(
            <div>
                <div className="form-group">
                    <label className="col-xs-6">Category:</label>
                    <div className="col-xs-6">
                        <DropdownList onChange="" data={dropDown} textField="name" valueField="_id" defaultValue=""></DropdownList>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-xs-6">Question:</label>
                    <div className="col-xs-6">
                        <FormControl></FormControl>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-xs-6">Answer:</label>
                    <div className="col-xs-6">
                        <FormControl></FormControl>
                    </div>
                </div>
            </div>
        )
    }
}