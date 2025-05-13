import "./star-rating.css";

function StarRating({ rating }) {
  const roundedRating = Math.round(rating * 10) / 10;

  return (
    <div className="star-rating">
      <div className="star-background">★★★★★</div>
      <div
        className="star-overlay"
        style={{ width: `${(roundedRating / 5) * 100}%` }}
      >
        ★★★★★
      </div>
    </div>
  );
}

export default StarRating;
