import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {

    login: (sessionId) =>{
        var actionType="LOGIN";
        AppDispatcher.dispatch({
            actionType: actionType,
            sessionId: sessionId,
        });
    },
	logout: () =>{
        var actionType="LOGOUT";
        AppDispatcher.dispatch({
            actionType: actionType,
        });
    },
	}