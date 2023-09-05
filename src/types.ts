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
