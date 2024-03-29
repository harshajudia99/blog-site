import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Likes } from "../LikesAndComments/Likes";
import Comments from "../LikesAndComments/Comments";
import { ViewComments } from "../LikesAndComments/ViewComments";

export const ViewBlog = () => {
  const [blogData, setBlogData] = useState([]);
  const params = useParams();

  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    console.log(params.id);
    let result = await fetch(`http://localhost:3000/getblogdata/${params.id}`);
    result = await result.json();
    setBlogData(result);
  };

  return (
    <div>
      <div className="view-blog">
        <h1 className="view-blog-title">{blogData.title}</h1>
        <div className="view-blog-description">{blogData.description}</div>
        <div className="view-blog-author">Author: {blogData.name}</div>
      </div>
      <div className="likes-comments">
      <Likes postId={blogData._id} likescount={blogData.likes}/>
      <Comments/>
      </div>
      <ViewComments comments={blogData.comments}/>
    </div>
  );
};
