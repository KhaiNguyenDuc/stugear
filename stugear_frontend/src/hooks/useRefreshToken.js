import axios from "axios";
import {BASE_API_URL} from "../utils/Constant.js"

const AUTH_URL = BASE_API_URL + '/auth';

const useRefreshToken = () => {
    return (
        axios.post(AUTH_URL + '/refresh', 
            {
                user_id : localStorage.getItem("user_id"),
                refresh_token: localStorage.getItem("refresh_token"),
                token: localStorage.getItem("access_token")
            }
        )
        .then(response => {
            
            return response?.data?.data
        })
        .catch(error => error?.response)
    );

};

export default useRefreshToken;
