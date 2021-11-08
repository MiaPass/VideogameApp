import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../actions/actions";

import "./Nav.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setText(e.target.value);
  }

  function handleClear(e) {
    e.preventDefault();
    setText("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchByName(text));
    setText("");
  }

  return (
    <div>
      <form action="">
        <label className="SearchBar">
          <input
            className="input"
            type="text"
            placeholder=" Search..."
            value={text}
            onChange={(e) => handleInput(e)}
          />

          <button
            className="ClearButton"
            value="default"
            onClick={(e) => handleClear(e)}
          >
            X
          </button>
        </label>

        <button
          className="SearchButton"
          type="Submit"
          onClick={(e) =>
            e.target.value !== "default" || e.target.value !== ""
              ? handleSubmit(e)
              : alert()
          }
        >
          Search
        </button>
      </form>
    </div>
  );
}
