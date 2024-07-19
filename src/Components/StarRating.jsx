import { useState } from "react";
import Star from "./Star";

const ratingContainer = {
  alignItems: "center",
  display: "flex",
  gap: ".5rem",
  flexDirection: "row",
};

const starContainer = {
  display: "flex",
  flexDirection: "row",
  gap: "4px",
};

export default function StarRating({ maxRating = 5, color, onSetRating }) {
  const textStyle = {
    fontSize: "1.25rem",
    color,
    margin: "0",
  };
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  function handleTempRating(rating) {
    setTempRating(rating);
  }

  return (
    <div style={ratingContainer}>
      <div style={starContainer}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            onTempRatingHover={() => handleTempRating(i + 1)}
            onTempRatingLeave={() => handleTempRating(0)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
}
