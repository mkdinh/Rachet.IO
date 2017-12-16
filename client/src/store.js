// Import dependencies
//--------------------------------------------------------
import { createStore, applyMiddleware } from "redux";
import { createLogger as logger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./utils/reducers";

// create global redux store
//--------------------------------------------------------

// apply middlewares to redux
const midwares = applyMiddleware(thunk, logger());

// create global state
const store = createStore(reducers, midwares);

export default store;
