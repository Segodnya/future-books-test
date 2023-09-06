import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setIsLoading } from "../redux/actions/bookActions";
import { IAppState, IBook } from "../types";
import { getBook } from "../utils/api";
import { useEffect, useState } from "react";
import { Button, Card, Container, Spinner, Badge } from "react-bootstrap";

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
      <Container>
        <Button variant="primary" onClick={handleBackClick}>
          Back
        </Button>
      </Container>
      <Container>
        {isLoading ? (
          <Spinner />
        ) : (
          <Card>
            <Card.Img
              variant="top"
              src={book?.volumeInfo.imageLinks?.thumbnail}
            />
            <Card.Body>
              <Card.Title>{book?.volumeInfo.title}</Card.Title>
              <Card.Text>{book?.volumeInfo.authors}</Card.Text>
              {book?.volumeInfo.categories &&
              book?.volumeInfo.categories.length > 1 ? (
                book?.volumeInfo.categories.map((category) => (
                  <Badge key={category}>{category}</Badge>
                ))
              ) : (
                <Badge>{book?.volumeInfo.categories?.[0]}</Badge>
              )}
              <Card.Text>{book?.volumeInfo.description}</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default BookDetails;
