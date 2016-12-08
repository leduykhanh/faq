import BaseServices from './BaseServices.jsx';
import Constants from '../constants/Constants.jsx';
import cookie from 'react-cookie';
import md5 from 'js-md5'
import FaqServices from './FaqServices.jsx';
import AuthActions from '../actions/AuthActions.jsx';
class AuthService extends BaseServices {

    login(username, password) {

        this.handlePost(Constants.LOGIN_URL,{
            username: username,
            password: md5(password)
        },function(response){			
            if (response.status=="success") {
				AuthActions.login(response.sessionId);
                FaqServices.loadFaqsList(response.sessionId);
				cookie.save("video-rate", response.sessionId, {maxAge: 10*365*24*3600,path:'/'});
            }
            else if(response.status=="error") {
                console.log('login unsuccessful');
                response.error.map(function(err,i){
                    //MessageActions.addError(err);
                })
            }
        });

    }
	
	logout(sessionId){
		this.handleGet(Constants.LOGOUT_URL+"?sessionId="+sessionId,{},function(response){
                if(response.status=="success"){
					cookie.remove("video-rate");
					AuthActions.logout();
                }
            });
	}
}
export default new AuthService();