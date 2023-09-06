import { IBook } from "../../types";
import * as actionTypes from "./actionTypes";

export const setSearchTerm = (searchTerm: string) => ({
  type: actionTypes.SET_SEARCH_TERM,
  payload: searchTerm,
});

export const setSort = (sort: string) => ({
  type: actionTypes.SET_SORT,
  payload: sort,
});

export const setCategory = (category: string) => ({
  type: actionTypes.SET_CATEGORY,
  payload: category,
});

export const setSearchResults = (searchResults: IBook[]) => ({
  type: actionTypes.SET_SEARCH_RESULTS,
  payload: searchResults,
});

export const setPageNumber = (pageNumber: number) => ({
  type: actionTypes.SET_PAGE_NUMBER,
  payload: pageNumber,
});

export const setIsLoading = (isLoading: boolean) => ({
  type: actionTypes.SET_IS_LOADING,
  payload: isLoading,
});

export const setTotalItems = (totalItems: number) => ({
  type: actionTypes.SET_TOTAL_ITEMS,
  payload: totalItems,
});
