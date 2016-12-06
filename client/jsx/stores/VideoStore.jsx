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
        this._faqsList = [];
		this._categories = [];
		this._videoDetail = null;
    }
	_registerToActions(action) {
        switch (action.actionType) {
            case "LOADLIST":
				this._faqsList = this._faqsList.concat(action.data);
				this.emitChange();
				break;
			case "LOADDETAIL":
				this._videoDetail = action.data;
				this.emitChange();
				break;
			case "LOADCATEGORIES":
				this._categories = action.list;
				this.emitChange();
				break;
				}
		}
	get categories(){
		return this._categories;
	}
	get faqsList() {
        return this._faqsList;
    }
	get videoDetail() {
        return this._videoDetail;
    }
	updateVideosList(l){
		this._faqsList = l;
		//console.log(this._faqsList);
	}
}

export default new VideoStore();
