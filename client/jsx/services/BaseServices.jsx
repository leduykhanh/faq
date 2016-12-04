import cookie from 'react-cookie';
import when from 'when';
import request from 'reqwest';

export default class BaseServices {

    handleJsonRequest(method,url,payload,successCallback,errorCallback,finalCallback) {
        console.log(url);
        if(payload && typeof payload == 'object'){
            payload = JSON.stringify(payload);
        }
        return when(request({
            url: url,
            method: method,
            crossOrigin: false,
            type: 'json',
            contentType:'application/json',
            headers: {
            },
            data: payload

        }).then(function(response) {
            if(response.critical_error) {
                //MessageActions.addPopupMessage(response.critical_error, "danger");
            }
            else if(response.error)
            {
                //MessageActions.addErrors(response.error, true);
				alert(response.error);
            }
            else if (response.warning){
                //MessageActions.addWarning(response.warning);
            }
            else
            {
                successCallback(response);
            }
        }).fail(function (err, msg) {

            // console.log(url+':'+msg);
            // console.log(err);
            if(!msg){
                msg=err.statusText;

                // Reroute if error message is forbidden
                if(err.statusText == "FORBIDDEN" || err.statusText == "Log in is required"){
                    cookie.remove('sessionid',{path:'/'});
                }else{
                    //MessageActions.addError(msg);
                }
            }
            
            if(errorCallback)
                errorCallback(err,msg);
        }).always(function(response){
            if(finalCallback){
                finalCallback(response)
            }
        }));
    }
    handleHtmlRequest(method,url,payload,successCallback,errorCallback,finalCallback)
    {
        payload = JSON.stringify(payload);
        return when(request({
            url: url,
            method: method,
            crossOrigin: false,
            headers: {
                'X-CSRFToken': cookie.load('csrftoken')
            },
            data: payload

        }).then(function(response) {
            // response.critical_error =
            if(response.error)
            {
                //MessageActions.addErrors(response.error,true);
				alert(response.error);
            }
            else if (response.warning){
                //MessageActions.addWarning(response.warning);
            }
            else
            {
                successCallback(response);
            }
        }).fail(function (err, msg) {
            console.log(url+':'+msg);

            //MessageActions.addError(msg);
            // window.location.href = '/app/error';
            if(errorCallback)
                errorCallback(err,msg);
        }).always(function(response){
            if(finalCallback){
                finalCallback(response)
            }
        }));
    }
    handlePost(url,payload,successCallback,errorCallback,finalCallback)
    {
        return this.handleJsonRequest('POST',url,payload,successCallback,errorCallback,finalCallback);
    }
    handlePut(url,payload,successCallback,errorCallback,finalCallback)
    {
        return this.handleJsonRequest('PUT',url,payload,successCallback,errorCallback,finalCallback);
    }
    handleGet(url,payload,successCallback,errorCallback,finalCallback)
    {
        return this.handleJsonRequest('GET',url,payload,successCallback,errorCallback,finalCallback);
    }

    handleHtmlGet(url,payload,successCallback,errorCallback,finalCallback)
    {
        return this.handleHtmlRequest('GET',url,payload,successCallback,errorCallback,finalCallback);
    }
    handleHtmlPost(url,payload,successCallback,errorCallback,finalCallback)
    {
        return this.handleHtmlRequest('POST',url,payload,successCallback,errorCallback,finalCallback);
    }
    handleDelete(url,payload,successCallback,errorCallback,finalCallback)
    {
        return this.handleJsonRequest('DELETE',url,payload,successCallback,errorCallback,finalCallback);
    }
}
