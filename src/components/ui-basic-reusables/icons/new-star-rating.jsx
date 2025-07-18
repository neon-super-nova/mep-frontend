import { Star, StarHalf } from "lucide-react";


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
          strokeWidth={1}
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
          strokeWidth={1}
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
          strokeWidth={1}
          size={28}
          width={24}
          height={24}
        />
      );
    }
  }

  return (
    <div className="star-rating" style={{ position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          className="star-outline-layer"
          style={{ display: "flex", flexDirection: "row" }}
        >
          {[...Array(starCount)].map((_, i) => (
            <Star
              key={i}
              fill="var(--star-coloring)"
              stroke="var(--minor-accent-color-1)"
              strokeWidth={1}
              size={28}
              width={24}
              height={24}
            />
          ))}
        </div>
        {/* Top layer: filled/half stars */}
        <div
          className="star-fill-layer"
          style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {stars}
        </div>
      </div>
    </div>
  );
}

export default NewStarRating;
