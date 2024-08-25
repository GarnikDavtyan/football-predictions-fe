import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { paths } from '../../../constants';

const StyledCard = styled(Card)({
  maxWidth: 345,
  minWidth: 200,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.61)",
  '&:hover': {
    cursor: 'pointer',
  }
});

const StyledCardMedia = styled(CardMedia)({
  margin: "20px",
  height: 140,
  width: "70%",
  backgroundSize: "contain"
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  '&:hover': {
    transform: "scale(0.9)",
    transition: ".3s linear",
    boxShadow: "0 4px 10px 0 rgba(132, 138, 145, 0.77)",
    position: "relative"
  }
});

export default function LeagueCard({ league }) {
  return (
    <StyledLink to={paths.main + '/' + league.slug}>
      <StyledCard>
        <StyledCardMedia
          image={league.logo}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {league.name}
          </Typography>
        </CardContent>
      </StyledCard>
    </StyledLink>
  );
}
