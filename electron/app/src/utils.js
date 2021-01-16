
import store from "./store";
import {CURRENT_PAGE, LEAVE_PAGE} from "./actions/types";

const checkPage = (pageTitle) => {
    console.log("state", store.getState())
    const activePage = store.getState().appDetails.currentPage
    console.log("checking page", pageTitle, activePage)
    if(pageTitle !== activePage) {
        console.log("setting page as diff: ", pageTitle, activePage)
        store.dispatch({type: LEAVE_PAGE, payload: activePage})
        store.dispatch({type: CURRENT_PAGE, payload: pageTitle})
    }
}

export default checkPage;