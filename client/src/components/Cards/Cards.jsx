import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

import "./Cards.css";

export default function Cards() {
  const { filteredGames, page } = useSelector((state) => state);
  const itemXPage = 15;

  return (
    <div className="Cards">
      {filteredGames
        .slice(itemXPage * page - itemXPage, itemXPage * page)
        .map((game) => {
          return (
            <Card
              key={game.id}
              id={game.id}
              name={game.name}
              image={game.image}
              genres={game.genres}
            />
          );
        })}
    </div>
  );
}
