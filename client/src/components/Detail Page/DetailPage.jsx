import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, resetDetails } from "../../actions/actions";
import { Link } from "react-router-dom";

import "./DetailPage.css";

export default function DetailPage(props) {
  const dispatch = useDispatch();

  const { gameDetails } = useSelector((state) => state);

  const {
    match: { params },
  } = props;

  console.log(params.id);

  useEffect(() => {
    dispatch(getDetails(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="grey">
      <img className="img2" src={gameDetails.image} alt="Not found Img" />
      <div className="Info">
        <h3 className="PROBLEMS_WHIT_GRID">{gameDetails.name}</h3>
        <div className="PROBLEMS_WHIT_GRID_2">
          <h3>Rating: {gameDetails.rating}</h3>
          <h3>Description: </h3>
          <h5> {gameDetails.description}</h5>

          <h3>
            Released:
            {gameDetails.released}
          </h3>

          <h3>
            Genres:
            <h5>
              {gameDetails.genres !== undefined
                ? gameDetails.genres.map((g) => g.name + ", ")
                : "None found"}
            </h5>
          </h3>

          {!typeof gameDetails.id === "number" ? (
            <label>
              <h3>Platforms:</h3>
              <h5>
                {gameDetails.platforms !== undefined
                  ? gameDetails.platforms.map((p) => p.split(" ").join(", "))
                  : "None found"}
              </h5>
            </label>
          ) : (
            <label>
              <h3>
                Platforms:
                <h5>
                  {gameDetails.platforms !== undefined
                    ? gameDetails.platforms.join(", ")
                    : "None found"}
                </h5>
              </h3>
            </label>
          )}
          <Link
            className="links"
            onClick={(e) => dispatch(resetDetails(e))}
            to={`/home`}
          >
            <button className="button">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
