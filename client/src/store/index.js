import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { stateReducer as state } from "./state/stateReducer";

export const store = createStore(state, applyMiddleware(thunk));
