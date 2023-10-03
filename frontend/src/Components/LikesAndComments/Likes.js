import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Likes = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div>
      {liked ? (
        <FavoriteIcon onClick={toggleLike} style={{ cursor: 'pointer', color: 'red' }} />
      ) : (
        <FavoriteBorderIcon onClick={toggleLike} style={{ cursor: 'pointer', color: 'gray' }} />
      )}
    </div>
  );
};
