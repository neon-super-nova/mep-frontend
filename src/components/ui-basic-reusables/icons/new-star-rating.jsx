import { Star, StarHalf } from "lucide-react";
import "./new-star-rating.css";

function NewStarRating({ rating }) {
  const starCount = 5;
  const stars = [];
  for (let i = 0; i < starCount; i++) {
    if (rating >= i + 1) {
      stars.push(
        <Star
          key={i}
          fill="var(--minor-accent-color-1)"
          stroke="var(--minor-accent-color-1)"
          strokeWidth={1.75}
          size={28}
          width={24}
          height={24}
        />
      );
    } else if (rating > i) {
      stars.push(
        <StarHalf
          key={i}
          fill="var(--minor-accent-color-1)"
          stroke="var(--minor-accent-color-1)"
          strokeWidth={1.75}
          size={28}
          width={24}
          height={24}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          fill="var(--star-coloring)"
          stroke="var(--minor-accent-color-1)"
          strokeWidth={1.75}
          size={28}
          width={24}
          height={24}
        />
      );
    }
  }

  return (
    <div className="star-rating">
      <div className="star-sub-rating">
        <div className="star-outline-layer">
        
          {[...Array(starCount)].map((_, i) => (
            <Star
              key={i}
              fill="var(--star-coloring)"
              stroke="var(--minor-accent-color-1)"
              strokeWidth={1.75}
              size={28}
              width={24}
              height={24}
            />
          ))}
        </div>
        <div
          className="star-fill-layer"
         
        >
          {stars}
        </div>
      </div>
    </div>
  );
}

export default NewStarRating;
