import React, { useState } from "react";
import { Form, Button, Col, Row, Spinner, Container } from "react-bootstrap";
import { getBooks } from "../utils/api";
import { IAppState } from "../types";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  setPageNumber,
  setSearchResults,
  setIsLoading,
  setTotalItems,
  setSort,
  setCategory,
  setSearchSubmitted,
} from "../redux/actions/bookActions";
import { Book } from "./Book";
import "./BookSearch.css";

const BookSearch: React.FC = () => {
  const searchTerm = useSelector((state: IAppState) => state.books.searchTerm);
  const pageNumber = useSelector((state: IAppState) => state.books.pageNumber);
  const searchResults = useSelector((state: IAppState) => state.books.searchResults);
  const isLoading = useSelector((state: IAppState) => state.books.isLoading);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const totalItems = useSelector((state: IAppState) => state.books.totalItems);
  const sort = useSelector((state: IAppState) => state.books.sort);
  const category = useSelector((state: IAppState) => state.books.category);
  const searchSubmitted = useSelector((state: IAppState) => state.books.searchSubmitted);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    dispatch(setSort(selectedSort));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    dispatch(setCategory(selectedCategory));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    dispatch(setSearchResults([]));
    dispatch(setPageNumber(0));
    dispatch(setTotalItems(0));
    dispatch(setSearchSubmitted(true));
    fetchData();
  };

  const handleLoadMore = () => {
    dispatch(setPageNumber(pageNumber + 1));
    fetchMoreData();
  };

  const fetchData = () => {
    dispatch(setIsLoading(true));

    getBooks({
      searchTerm,
      category,
      page: pageNumber,
      sort,
    })
      .then((response) => {
        dispatch(setSearchResults([...response.items]));
        dispatch(setTotalItems(response.totalItems));
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  const fetchMoreData = () => {
    setIsFetchingMore(true);

    getBooks({
      searchTerm,
      category,
      page: pageNumber + 1,
      sort,
    })
      .then((response) => {
        dispatch(setSearchResults([...searchResults, ...response.items]));
      })
      .catch(console.log)
      .finally(() => setIsFetchingMore(false));
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit} className="form">
        <Form.Group controlId="searchForm">
          <Form.Control
            type="text"
            placeholder="Search for a book"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </Form.Group>
        <Form.Group controlId="sortSelect">
          <Form.Label>Sort By:</Form.Label>
          <Form.Select value={sort} onChange={handleSortChange}>
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="categorySelect">
          <Form.Label>Select Category:</Form.Label>
          <Form.Select value={category} onChange={handleCategoryChange}>
            <option value="">All Books</option>
            <option value="art">Art</option>
            <option value="biography">Biography</option>
            <option value="computers">Computers</option>
            <option value="history">History</option>
            <option value="medical">Medical</option>
            <option value="poetry">Poetry</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Container className="search-container">
            <Row className="search-message">
              {searchSubmitted
                ? error
                  ? "По вашему запросу ничего не найдео"
                  : `Найдено книг: ${totalItems}`
                : "Введите поисковый запрос"}
            </Row>

            <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
              {searchResults.map((result, index) => (
                <React.Fragment key={Date.now() * Math.random()}>
                  <Col>
                    <Book result={result} />
                  </Col>
                  {index === searchResults.length - 1 && isFetchingMore && (
                    <Col>
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </Col>
                  )}
                </React.Fragment>
              ))}
            </Row>
          </Container>
          <Row className="mt-3">
            {searchResults.length < totalItems && (
              <Col xs={12} className="text-center">
                {isFetchingMore ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <Button variant="primary" onClick={handleLoadMore}>
                    Load More
                  </Button>
                )}
              </Col>
            )}
          </Row>
        </>
      )}
    </div>
  );
};

export default BookSearch;
