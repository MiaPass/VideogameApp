import React from "react";
import { Link } from "react-router-dom";

import "./Card.css";

export default function Card(game) {
  let genres = game.genres.map((g) => g.name);

  return (
    <div className="Card">
      <img src={game.image} alt="Not found Img" title="image" />

      <Link className="url" to={`/Detail/${game.id}`}>
        <div className="BottomHalf">
          <div className="info">
            <h4 title="name"> {game.name} </h4>
            <p title="genres">
              {game.genres !== undefined ? genres.join(", ") : "Empty"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
