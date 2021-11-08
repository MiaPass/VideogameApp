import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Cards from "../Cards/Cards";

import { getAllGames, getGenres, setPage } from "../../actions/actions";

import Nav from "../Nav/Nav";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";

import "./Home.css";

import image from "../../media/img/pock.jpg";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getGenres());
  }, [dispatch]);

  const { filteredGames, page } = useSelector((state) => state);

  /* -------------------- PAGINATION -------------------- */

  const itemXPage = 15;

  const handlePage = (num) => {
    if (page + num < 1 || page + num > filteredGames.length / itemXPage) return;
    dispatch(setPage(page + num));
  };

  return (
    <div style={{ backgroundImage: `url(${image})` }} className="container">
      <div className="both">
        {/* -------------- SEARCH -------------- */}

        <div className="search">
          <Nav />
        </div>

        {/* -------------- PAGES -------------- */}

        <div className="pagination">
          <label>
            <button
              className="button"
              onClick={() => {
                handlePage(-1);
              }}
            >
              ◄
            </button>

            <button className="button">{page}</button>

            <button
              className="button"
              onClick={() => {
                handlePage(+1);
              }}
            >
              ►
            </button>
          </label>
        </div>
      </div>

      {/* -------------- CREATE -------------- */}

      <div className="something">
        <label className="create">
          <Link className="url" to={`/Create`}>
            Create Game
          </Link>
        </label>
      </div>

      {/* -------------------- ORDER -------------------- */}

      <div className="filtersort">
        <div className="sort">
          <Sort />
        </div>

        {/* -------------------- FILTER -------------------- */}

        <div className="filter">
          <Filter />
        </div>
      </div>

      {/* -------------- GAMES -------------- */}

      <div className="games">
        {filteredGames.length ? (
          <Cards />
        ) : (
          <img
            src="https://igrygame.org/images/loading-game-en.gif"
            alt="LOADING"
            className="img"
          />
        )}
      </div>
    </div>
  );
}
