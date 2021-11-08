import React from "react";
import { useDispatch } from "react-redux";

import "./Sort.css";

import { orderByName, orderByRating } from "../../actions/actions";

export default function Sort() {
  const dispatch = useDispatch();

  /* -------------------- ORDER -------------------- */

  /* -------------- BY NAME -------------- */

  const handleSelectOrderByName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  };

  /* -------------- BY RATING -------------- */

  const handleSelectOrderByRating = (e) => {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
  };

  return (
    <div className="Sort">
      <ul>
        <p className="p"> Sort </p>
      </ul>
      <label>
        {/* -------------- NAME -------------- */}
        <ul>
          <select onChange={(e) => handleSelectOrderByName(e)}>
            <option value="Default">Name</option>
            <option value="Asc">A - Z</option>
            <option value="Desc">Z - A</option>
          </select>
        </ul>
        {/* -------------- RATING -------------- */}
        <ul>
          <select onChange={(e) => handleSelectOrderByRating(e)}>
            <option value="Default">Rating</option>
            <option value="Highest to Lowest">Highest</option>
            <option value="Lowest to Highest">Lowest</option>
          </select>
        </ul>
      </label>
    </div>
  );
}
