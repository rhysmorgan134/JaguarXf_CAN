
import store from "./store";
import {CURRENT_PAGE, LEAVE_PAGE} from "./actions/types";

const checkPage = (pageTitle) => {
    const activePage = store.getState().appDetails.currentPage
    if(pageTitle !== activePage) {
        store.dispatch({type: LEAVE_PAGE, payload: activePage})
        store.dispatch({type: CURRENT_PAGE, payload: pageTitle})
    }
}

export default checkPage;