import { useLoaderData } from 'react-router-dom';
import Container from '../../../components/Container/Container';
import ReviewForm from '../../../components/ReviewForm/ReviewForm';

const AddReviewPages = () => {
  const product = useLoaderData();

  return (
    <Container>
      <h3 className="title-text my-5">
        Add Your <span className="text-primary">Review</span>
      </h3>
      <ReviewForm product={product} productId={product?._id} />
    </Container>
  );
};

export default AddReviewPages;
