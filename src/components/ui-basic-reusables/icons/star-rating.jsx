import "./star-rating.css";

function StarRating({ rating }) {
  const starCount = 5;
  const letterSpacing = 0.2; // in rem
  const roundedRating = Math.round(rating * 10) / 10;
  const overlayWidth = `calc(${(roundedRating / starCount) * 100}% - ${
    (roundedRating - 1) * letterSpacing
  }rem)`;

  return (
    <div className="star-rating">
      <span className="star-layout">★★★★★</span> {/* LAYOUT CONTAINER */}
      <div className="star-layer star-background-bottom">★★★★★</div>
      <div className="star-layer star-background-top">★★★★★</div>
      <div className="star-layer star-overlay" style={{ width: overlayWidth }}>
        ★★★★★
      </div>
    </div>
  );
}

export default StarRating;
