import React from 'react';
import {FormControl} from 'react-bootstrap';
export default class VideoList extends React.Component {

    constructor() {
        super();

        this.state = {
            item: null
        };
    }
    render(){
        return(
            <div>
                <div className="form-group">
                    <label className="col-xs-6">Category:</label>
                    <div className="col-xs-6">
                        <FormControl></FormControl>
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