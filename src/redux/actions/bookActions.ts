import { IBook } from "../../types";

export const setSearchTerm = (searchTerm: string) => ({
  type: "SET_SEARCH_TERM",
  payload: searchTerm,
});

export const setSort = (sort: string) => ({
  type: "SET_SORT",
  payload: sort,
});

export const setCategory = (category: string) => ({
  type: "SET_CATEGORY",
  payload: category,
});

export const setSearchResults = (searchResults: IBook[]) => ({
  type: "SET_SEARCH_RESULTS",
  payload: searchResults,
});

export const setPageNumber = (pageNumber: number) => ({
  type: "SET_PAGE_NUMBER",
  payload: pageNumber,
});

export const setIsLoading = (isLoading: boolean) => ({
  type: "SET_IS_LOADING",
  payload: isLoading,
});

export const setTotalItems = (totalItems: number) => ({
  type: "SET_TOTAL_ITEMS",
  payload: totalItems,
});
