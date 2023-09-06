import React, { useEffect } from "react";
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
} from "../redux/actions/bookActions";
import { Book } from "./Book";

const BookSearch: React.FC = () => {
  const searchTerm = useSelector((state: IAppState) => state.books.searchTerm);
  const pageNumber = useSelector((state: IAppState) => state.books.pageNumber);
  const searchResults = useSelector(
    (state: IAppState) => state.books.searchResults
  );
  const isLoading = useSelector((state: IAppState) => state.books.isLoading);
  const totalItems = useSelector((state: IAppState) => state.books.totalItems);
  const dispatch = useDispatch();

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setPageNumber(0));
    fetchData();
  };

  const handleLoadMore = () => {
    dispatch(setPageNumber(pageNumber + 1));
  };

  const fetchData = () => {
    dispatch(setIsLoading(true));

    getBooks({ searchTerm: searchTerm, page: pageNumber })
      .then((response) => {
        dispatch(setSearchResults([...searchResults, ...response.items]));
        dispatch(setTotalItems(response.totalItems));
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  useEffect(() => {
    if (pageNumber > 0) {
      fetchData();
    }
  }, [pageNumber]);

  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="searchForm">
          <Form.Control
            type="text"
            placeholder="Search for a book"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
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
          <Container fluid>
            <Row xs={1} sm={4} className="g-4">
              {searchResults.map((result) => (
                <Col key={Date.now() * Math.random()}>
                  <Book result={result} />
                </Col>
              ))}
            </Row>
          </Container>
          <Row>
            {searchResults.length < totalItems && (
              <Button variant="primary" onClick={handleLoadMore}>
                Load More
              </Button>
            )}
          </Row>
        </>
      )}
    </div>
  );
};

export default BookSearch;
