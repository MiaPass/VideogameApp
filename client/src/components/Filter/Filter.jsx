import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterByOwned, filterByGenre } from "../../actions/actions";

import "./Filter.css";

export default function Filter() {
  const dispatch = useDispatch();

  const { genres } = useSelector((state) => state);

  /* -------------------- FILTER -------------------- */

  /* -------------- BY DB/API -------------- */

  const handleSelectFilterByOwned = (e) => {
    e.preventDefault();
    dispatch(filterByOwned(e.target.value));
  };

  /* -------------- BY GENRE -------------- */

  const handleSelectFilterByGenre = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
  };

  return (
    <div className="Filter">
      <ul>
        <p className="p"> Filter </p>
      </ul>
      <label className="FilterLabel">
        {/* -------------- GENRE -------------- */}

        <ul>
          <select onChange={(e) => handleSelectFilterByGenre(e)}>
            <option value="Default">Genres</option>
            {genres.map((g) => (
              <option key={g.name} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
        </ul>

        {/* -------------- OWNED -------------- */}

        <ul>
          <select onChange={(e) => handleSelectFilterByOwned(e)}>
            <option value="Default">DB or API</option>
            <option value="DB">Created</option>
            <option value="API">API</option>
          </select>
        </ul>
      </label>
    </div>
  );
}
