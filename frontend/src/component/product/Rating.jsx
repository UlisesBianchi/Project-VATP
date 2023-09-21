import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const Rating = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleStarClick(value)}
          style={{ cursor: 'pointer' }}
        >
          {value <= rating ? (
            <StarIcon />
          ) : value - 0.5 === rating ? (
            <StarHalfIcon />
          ) : (
            <StarBorderIcon />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;