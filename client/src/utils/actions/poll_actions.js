//  Import API
//--------------------------------------------------------
import API from "../api";

// handle redux requests
//--------------------------------------------------------
export default {
    findAll: () => {
        return (
            dispatch => API.Poll.findAll()
            .then( db => dispatch({
                type: "GET_POLLS",
                payload: { list: db.data }
            }))
            .catch( err => console.log(err))
        )
    },

    findOne: (id) => {
        return (
            dispatch => API.Poll.findOne(id)
            .then( db => dispatch({
                type: "GET_POLL_INFO",
                payload: { cPoll: db.data }
            }))
            .catch( err => console.log(err))
        )
    },

    findActive: (id) => {
        return (
            dispatch => API.Poll.findActive()
            .then( db => dispatch({
                type: "GET_POLL_INFO",
                payload: { cPoll: db.data }
            }))
            .catch( err => console.log(err))
        )
    },

    toggleActive: (id) => {
        return (
            dispatch => API.Poll.findOne(id)
            .then( db => dispatch({
                type: "TOOGLE_ACTIVE",
                payload: { aPoll: db.data }
            }))
            .catch( err => console.log(err))
        )
    },

    createOne: (post) => {
        return (
            dispatch => API.Poll.createOne(post)
            .then( db => dispatch({
                type: "GET_POLLS",
                payload: { list: db.data }
            }))
            .catch( err => console.log(err))
        )
    },

    updateOne: (update) => {
        return (
            dispatch => API.Poll.updateOne(update)
            .then( db => dispatch({
                type: "GET_POLLS",
                payload: { list: db.data }
            }))
            .catch( err => console.log(err))
        )
    },

    deleteOne: (id) => {
        return (
            dispatch => API.Poll.deleteOne(id)
            .then( db => dispatch({
                type: "GET_POLLS",
                payload: { list: db.data }
            }))
            .catch( err => console.log(err))
        )
    },

    removeCPoll: () => dispatch => dispatch({ type: "REMOVE_CPOLL" })
    
}