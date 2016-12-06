import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {

    loadList: (list) =>{
        var actionType="LOADCATEGORIES";
        AppDispatcher.dispatch({
            actionType: actionType,
            list: list,
        });
    },
	loadVideoDetail: (data) =>{
        var actionType="LOADDETAIL";
        AppDispatcher.dispatch({
            actionType: actionType,
            data: data,
        });
    },
    loadFaqList : (data) =>{
        var actionType="LOADLIST";
        AppDispatcher.dispatch({
            actionType: actionType,
            data: data,
        });
    }
	}