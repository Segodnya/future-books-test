import { FC } from "react";
import { Card, Badge } from "react-bootstrap";
import { IBookProps } from "../types";
import { useNavigate } from "react-router-dom";
import "./Book.css";

export const Book: FC<IBookProps> = ({ result }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book/${result.id}`);
  };

  return (
    <Card className="book-card" border="primary" onClick={handleCardClick}>
      <Card.Img className="book-image" variant="top" src={result.volumeInfo.imageLinks?.thumbnail} />
      <Card.Body>
        <Card.Title className="book-title">{result.volumeInfo.title}</Card.Title>
        <Card.Text>
          {result.volumeInfo.authors?.length > 1 ? result.volumeInfo.authors.join(", ") : result.volumeInfo.authors}
        </Card.Text>
        <Badge>{result.volumeInfo.categories?.[0]}</Badge>
      </Card.Body>
    </Card>
  );
};
