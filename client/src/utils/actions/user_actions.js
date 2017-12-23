// Import dependencies
//--------------------------------------------------------
import API from "../api";

export default {
    login: (user) => {
        return (
            dispatch => API.User.login(user)
            .then(user => dispatch({
                type: "LOGIN",
                payload: user.data
            }))
            .catch(err => {throw err.response.data.message})
        )
    },

    logout: (user) => {
        return (
            dispatch => API.User.logout()
            .then(user => {
                dispatch({
                    type: "LOGOUT"
                });
                return user.data.message;
            })
            .catch(err => {throw err.response.data.message})
        )
    },

    toggleView: () =>  dispatch => dispatch({ type: "TOGGLE_VIEW" })
}