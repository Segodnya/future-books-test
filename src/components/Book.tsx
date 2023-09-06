import { FC } from "react";
import { Card, Badge } from "react-bootstrap";
import { IBookProps } from "../types";

export const Book: FC<IBookProps> = ({ result }) => {
  return (
    <Card border="primary">
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
