import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setIsLoading } from "../redux/actions/bookActions";
import { IAppState, IBook } from "../types";
import { getBook } from "../utils/api";
import { useEffect, useState } from "react";
import { Button, Card, Container, Spinner, Badge } from "react-bootstrap";
import "./BookDetails.css";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isLoading = useSelector((state: IAppState) => state.books.isLoading);
  const [book, setBook] = useState<IBook>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackClick = () => {
    navigate("/");
  };

  const fetchData = () => {
    dispatch(setIsLoading(true));
    if (id) {
      getBook(id)
        .then((response) => {
          console.log(response);
          setBook(response);
        })
        .finally(() => dispatch(setIsLoading(false)));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container style={{ padding: "20px" }}>
        <Button variant="primary" onClick={handleBackClick}>
          Back
        </Button>
      </Container>
      <Container>
        {isLoading ? (
          <Spinner />
        ) : (
          <Card className="book-details-card">
            <Card.Img className="book-details-image" variant="top" src={book?.volumeInfo.imageLinks?.thumbnail} />
            <Card.Body className="book-details-body">
              <Card.Title>{book?.volumeInfo.title}</Card.Title>
              <Card.Text>{book?.volumeInfo.authors}</Card.Text>
              {book?.volumeInfo.categories &&
                book?.volumeInfo.categories.map((category) => (
                  <Badge className="book-details-badge" key={category}>
                    {category}
                  </Badge>
                ))}
              <Card.Text style={{ marginTop: "20px" }}>{book?.volumeInfo.description}</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default BookDetails;
