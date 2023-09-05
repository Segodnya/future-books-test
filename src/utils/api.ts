import axios from "axios";
import { API_KEY, BASE_URL, MAX_RESULTS } from "./constants";
import { IQuery } from "../types";

export async function getBooks({
  searchTerm,
  category = "",
  page = 0,
  sort = "relevance",
}: IQuery) {
  const startIndex = MAX_RESULTS * page;
  const response = await axios.get(
    `${BASE_URL}?q=${searchTerm}+subject:${category}&key=${API_KEY}&maxResults=${MAX_RESULTS}&startIndex=${startIndex}&orderBy=${sort}`
  );
  return response.data;
}
