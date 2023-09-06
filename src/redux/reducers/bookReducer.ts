import { combineReducers } from "redux";
import { BookAction } from "../../types";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  searchTerm: "",
  searchResults: [],
  isLoading: false,
  pageNumber: 0,
  totalItems: 0,
  sort: "relevance",
  category: "",
};

function bookReducer(state = initialState, action: BookAction) {
  switch (action.type) {
    case actionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case actionTypes.SET_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case actionTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case actionTypes.SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload,
      };
    case actionTypes.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case actionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case actionTypes.SET_TOTAL_ITEMS:
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
