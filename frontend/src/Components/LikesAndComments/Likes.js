import React, { useState, useEffect } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useParams } from "react-router-dom";

export const Likes = ({likescount}) => {

  const [count, setCount] = useState(0);
  const params = useParams();

  useEffect(() => {
    setCount(likescount);
  }, [likescount]);

  const handleThumbUpClick = () => {
    setCount(count + 1);
  };

  const handleThumbDownClick = () => {
    if(count>0){
      setCount(count - 1);
    }
  };

  useEffect(() => {
    updateBlog();
  }, [count]);

  const updateBlog = async () => {
      const result = await fetch(
        `http://localhost:3000/updateblog/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({'likes': count}), 
        }
      );
      if (result.ok) {
        const data = await result.json();
      } 
  };
  

  return (
    <div className='like-btn-container'>
      <div className='likes-btn-svg'>

      <ThumbUpIcon onClick={handleThumbUpClick} style={{ cursor: 'pointer' }} />
      <div className='likes-count'>{count} Likes</div>
      <ThumbDownIcon onClick={handleThumbDownClick} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
};
