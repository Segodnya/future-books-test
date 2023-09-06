import { combineReducers } from "redux";
import { BookAction } from "../../types";

const initialState = {
  searchTerm: "",
  searchResults: [],
  isLoading: false,
  totalItems: 0,
};

function bookReducer(state = initialState, action: BookAction) {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_TOTAL_ITEMS":
      return {
        ...state,
        totalItems: action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({
  books: bookReducer,
});
