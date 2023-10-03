import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { AuthorPost } from "./AuthorPost";

export default function AuthorProfile() {
  const params = useParams();
  const [authorData, setAuthorData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAuthor();
  }, []);

  const getAuthor = async () => {
    let result = await fetch(`http://localhost:3000/get/${params.id}`);
    result = await result.json();
    setAuthorData(result);
  };

  if (authorData === null) {
    return <div>Loading...</div>;
  }

  return (
  <div>

    <div className="author-profile-blog-card">
      <Card key={authorData.id} sx={{ maxWidth: 345 }} className="blog-card">
        <CardMedia
          sx={{ height: 140 }}
          image={`http://localhost:5500/backend/uploads/${authorData.image}`}
          title={authorData.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {authorData.fname} {authorData.lname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mobile: {authorData.mobile}
          </Typography>
        </CardContent>
      </Card>

    </div>
    <AuthorPost name={`${authorData.fname} ${authorData.lname}`}/>
  </div>
  );
}
