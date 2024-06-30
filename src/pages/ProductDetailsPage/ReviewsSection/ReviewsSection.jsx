import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import Rating from 'react-rating';

const ReviewsSection = ({ reviews, rating }) => {
  return (
    <div className="mt-8">
      <h3 className="title-text ">Review and Ratings </h3>
      {reviews?.length > 0 && (
        <div className="flex items-center gap-3">
          <p className="text-base">
            {' '}
            <Rating
              emptySymbol={<CiStar />}
              placeholderRating={rating}
              readonly
              fullSymbol={<FaStar className="text-yellow-500" />}
              placeholderSymbol={<FaStar className="text-yellow-500" />}
            />{' '}
            <span>({reviews && reviews?.length})</span>{' '}
          </p>
          <span className="text-primary font-semibold">
            {rating}{' '}
            {(rating > 4.8 && 'Excilent') ||
              (rating > 4 && 'Very Good') ||
              (rating < 3 && 'Good')}
          </span>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-5">
        {reviews && reviews?.length > 0 ? (
          reviews.map(review => (
            <div className="space-y-2" key={review.image}>
              <p className="text-xs">
                {' '}
                <Rating
                  emptySymbol={<CiStar />}
                  placeholderRating={rating}
                  readonly
                  fullSymbol={<FaStar className="text-yellow-500" />}
                  placeholderSymbol={<FaStar className="text-yellow-500" />}
                />{' '}
                <span>{review?.reviewer}</span>
              </p>
              <p>{review?.comment}</p>
              <img
                className="w-52 h-40"
                src={review?.imageUrl}
                alt="Review images"
              />
            </div>
          ))
        ) : (
          <p className="title-text text-center mt-8">No Review yet</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
