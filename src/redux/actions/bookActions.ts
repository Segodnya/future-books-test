import { IBook } from "../../types";

export const setSearchTerm = (searchTerm: string) => ({
  type: "SET_SEARCH_TERM",
  payload: searchTerm,
});

export const setSearchResults = (searchResults: IBook[]) => ({
  type: "SET_SEARCH_RESULTS",
  payload: searchResults,
});

export const setIsLoading = (isLoading: boolean) => ({
  type: "SET_IS_LOADING",
  payload: isLoading,
});
export const setTotalItems = (totalItems: number) => ({
  type: "SET_TOTAL_ITEMS",
  payload: totalItems,
});
