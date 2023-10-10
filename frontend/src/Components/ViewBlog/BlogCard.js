import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BlogCard() {
  const [authorData, setAuthorData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAuthors();
  }, []);

  const getAuthors = async () => {
    let result = await fetch("http://localhost:3000/getauthor");
    result = await result.json();
    setAuthorData(result);
    console.log(authorData);
  };

  const handleViewProfileClick = (authorId) => {
    navigate(`/author/profile/${authorId}`);
  };

  return (
    <div className="grid-container">
      {authorData.map((card) => (
        <Card
          key={card.id}
          sx={{ maxWidth: 345 }}
          className="grid-item blog-card"
        >
          <CardMedia
            sx={{ height: 140 }}
            image={`http://localhost:5500/backend/uploads/${card.image}`}
            title={card.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {card.fname} {card.lname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.email}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              className="view-profile-btn"
              onClick={() => handleViewProfileClick(card._id)}
            >
              Click to view profile
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
