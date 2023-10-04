import React from "react";

export const ViewComments = ({ comments }) => {
  console.log(comments);

  return (
    <div>
      <div className="comment-container">
        <div className="comment-title">Comments . . .</div>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-box">
              <div className="comment-name">{comment.authorName}</div>
              <div className="comment-comment">{comment.comment}</div>
            </div>
          ))
        ) : (
          <div>No comments available</div>
        )}
      </div>
    </div>
  );
};
