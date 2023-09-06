import { FC } from "react";
import { Card, Badge } from "react-bootstrap";
import { IBookProps } from "../types";
import { useNavigate } from "react-router-dom";

export const Book: FC<IBookProps> = ({ result }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book/${result.id}`);
  };

  return (
    <Card border="primary" onClick={handleCardClick}>
      <Card.Img variant="top" src={result.volumeInfo.imageLinks?.thumbnail} />
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
  );
};
