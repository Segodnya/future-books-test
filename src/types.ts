export interface IAppState {
  books: {
    searchTerm: string;
    searchResults: IBook[];
    isLoading: boolean;
    totalItems: number;
    pageNumber: number;
  };
}

export interface IQuery {
  searchTerm: string;
  category?: string;
  page?: number;
  sort?: "relevance" | "newest";
}

export interface IBook {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    categories?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

export interface IBookProps {
  result: IBook;
}

export interface ISetSearchTermAction {
  type: "SET_SEARCH_TERM";
  payload: string;
}

export interface ISetSearchResultsAction {
  type: "SET_SEARCH_RESULTS";
  payload: IBook[];
}
export interface ISetPageNumberAction {
  type: "SET_PAGE_NUMBER";
  payload: number;
}

export interface ISetIsLoadingAction {
  type: "SET_IS_LOADING";
  payload: boolean;
}
export interface ISetTotalItemsAction {
  type: "SET_TOTAL_ITEMS";
  payload: number;
}

export type BookAction =
  | ISetSearchTermAction
  | ISetPageNumberAction
  | ISetSearchResultsAction
  | ISetIsLoadingAction
  | ISetTotalItemsAction;
