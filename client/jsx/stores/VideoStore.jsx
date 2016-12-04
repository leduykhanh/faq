import React from 'react';
import cookie from 'react-cookie';
import BaseStore from './BaseStore.jsx'

class VideoStore extends BaseStore  {

    constructor() {
		super();
        this.subscribe(() => this._registerToActions.bind(this));
		var v = {
			_id : "5775d296fab257f410ce633f",
			name : "[1] Google Cardboard Assembly",
			description : "Google Cardboard Assembly Step by Step Instructions [HD]",
			url : "videos/Google_Cardboard_Assembly.mp4",
			ratings : [ 
				4, 
				5, 
				5, 
				5, 
				3, 
				5, 
				4, 
				5
			]
		};
        this._videosList = [];
		this._videoDetail = null;
    }
	_registerToActions(action) {
        switch (action.actionType) {
            case "LOADLIST":
				this._videosList = this._videosList.concat(action.list);
				this.emitChange();
				break;
			case "LOADDETAIL":
				this._videoDetail = action.data;
				this.emitChange();
				break;
				}
		}
				
	get videosList() {
        return this._videosList;
    }
	get videoDetail() {
        return this._videoDetail;
    }
	updateVideosList(l){
		this._videosList = l;
		//console.log(this._videosList);
	}
}

export default new VideoStore();
