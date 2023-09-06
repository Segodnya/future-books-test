import React from "react";
import {
  Form,
  Button,
  Card,
  Badge,
  Col,
  Row,
  Spinner,
  Container,
} from "react-bootstrap";
import { getBooks } from "../utils/api";
import { IAppState } from "../types";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  setSearchResults,
  setIsLoading,
  setTotalItems,
} from "../redux/actions/bookActions";

const BookSearch: React.FC = () => {
  const searchTerm = useSelector((state: IAppState) => state.books.searchTerm);
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
    dispatch(setIsLoading(true));

    getBooks({ searchTerm: searchTerm })
      .then((response) => {
        dispatch(setSearchResults(response.items));
        dispatch(setTotalItems(response.totalItems));
      })
      .finally(() => dispatch(setIsLoading(false)));

    dispatch(setSearchTerm(""));
  };

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
        <Container fluid>
          <Row xs={1} sm={4} className="g-4">
            {searchResults.map((result) => (
              <Col key={result.id}>
                <Card border="primary">
                  <Card.Img
                    variant="top"
                    src={result.volumeInfo.imageLinks?.thumbnail}
                  />
                  <Card.Body>
                    <Card.Title>{result.volumeInfo.title}</Card.Title>
                    <Card.Text>
                      {result.volumeInfo.authors?.length > 1
                        ? result.volumeInfo.authors.join(", ")
                        : result.volumeInfo.authors}
                    </Card.Text>
                    <Badge>{result.volumeInfo.categories?.[0]}</Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default BookSearch;
