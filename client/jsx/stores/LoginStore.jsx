import React from 'react';
import cookie from 'react-cookie';
import BaseStore from './BaseStore.jsx'

class LoginStore extends BaseStore {

    constructor() {
        super();
		this.subscribe(() => this._registerToActions.bind(this));
        this._user = null;
        this._last_login = null;
		this._sessionId = null;
    }
    _registerToActions(action) {
        switch (action.actionType) {
            case "LOGIN":
				this._sessionId = action.sessionId;
				this.emitChange();
				break;
			case "LOGOUT":
				this._sessionId = null;
				this.emitChange();
				break;
				}
		}

    get user() {
        return this._user;
    }
	
	get sessionId(){
		return this._sessionId;
	}
    isLoggedIn() {
		if(this._sessionId==null)
		{
			this._sessionId = cookie.load('video-rate',{path:'/'});
			}
		return cookie.load('video-rate',{path:'/'})
        //return this._sessionId;
    }
}

export default new LoginStore();
