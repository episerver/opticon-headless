import GlobalState from "@models/GlobalState";
import { ACTIONS } from "./Action";

const reducers = (state: GlobalState, action: any) => {
    switch(action.type){
        case ACTIONS.NOTIFY:
            return {
                ...state,
                notify: action.payload
            };
        case ACTIONS.UPDATE_MARKET:
            return {
                ...state,
                market: action.payload
            };
        case ACTIONS.UPDATE_CART:
            return {
                ...state,
                cart: action.payload
            };
        default:
            return state;
    }
}

export default reducers;