import { useParams, useNavigate } from "react-router-dom";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  // Fetch book details using the id from the URL parameter

  return (
    <>
      <button onClick={handleBackClick}>Back</button>
      <div>{`Book Details for ID: ${id}`}</div>;
    </>
  );
};

export default BookDetails;
