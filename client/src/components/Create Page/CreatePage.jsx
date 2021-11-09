import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import { getGenres, getPlatforms, createGame } from "../../actions/actions";

import "./CreatePage.css";

export default function CreatePage() {
  const dispatch = useDispatch();

  const { genres, platforms } = useSelector((state) => state);

  const [active, setActive] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    platforms: [],
    released: "",
    rating: "",
    img: "",
    image: "",
    genres: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      alert("Name cannot be empty");
    } else if (form.genres === []) {
      alert("Select a genre");
    } else if (form.platforms === []) {
      alert("Select a platform");
    } else if (!form.description) {
      alert("Description cannot be empty");
    } else {
      dispatch(createGame(form));
      alert("Game created!");
      Redirect("/home");
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectGenres = (e) => {
    e.preventDefault();
    setActive(!active);
    let allGenres = form.genres;
    let selectedG = e.target.value;
    if (!allGenres.includes(selectedG)) {
      allGenres.push(selectedG);
    } else {
      let pos = allGenres.indexOf(selectedG);
      allGenres.splice(pos, 1);
    }
    console.log(allGenres);
  };

  const handleSelectPlatforms = (e) => {
    e.preventDefault();
    setActive(!active);
    let allPlatforms = form.platforms;
    let selectedP = e.target.value;
    if (!allPlatforms.includes(selectedP)) {
      allPlatforms.push(selectedP);
    } else {
      let pos = allPlatforms.indexOf(selectedP);
      allPlatforms.splice(pos, 1);
    }
    console.log(allPlatforms);
  };

  return (
    <div className="allPage">
      <div className="allinfo">
        <h2>Create your Game!</h2>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <h3>Name*:</h3>
          <input
            name="name"
            type="text"
            placeholder=" Name..."
            value={form.name}
            onChange={(e) => handleInput(e)}
            required
          />
          <h3>Description*:</h3>
          <textarea
            name="description"
            type="text"
            placeholder=" Description..."
            value={form.description}
            onChange={(e) => handleInput(e)}
            required
          />
          <h3>Released*:</h3>
          <input
            name="released"
            type="date"
            placeholder=" Released..."
            value={form.released}
            onChange={(e) => handleInput(e)}
          />
          <h3>Rating*:</h3>
          <input
            name="rating"
            placeholder=" 0 "
            type="number"
            min="0"
            max="5"
            step="0.5"
            onChange={(e) => handleInput(e)}
            value={form.rating}
          />
          <label className="Image">
            <h3>Image*:</h3>
            <p>Upload from local:</p>
            <input
              name="image"
              type="file"
              value={form.image}
              onChange={(e) => handleInput(e)}
            />
            <p>Or from web:</p>
            <input
              name="img"
              type="text"
              value={form.img}
              onChange={(e) => handleInput(e)}
            />
          </label>

          <h4>{form.genres.join(", ")}</h4>
          <h3>Genres*:</h3>
          <div className="Genres">
            {genres.map((g) => (
              <ul key={g.id}>
                <button
                  key={g.id}
                  value={g.name}
                  className="buttons"
                  onClick={(e) => handleSelectGenres(e)}
                >
                  {g.name}
                </button>
              </ul>
            ))}
          </div>
          <h4>{form.platforms.join(", ")}</h4>
          <h3>Platforms*:</h3>
          <div className="Platforms">
            {platforms.map((p) => (
              <ul key={p.id}>
                <button
                  key={p.id}
                  value={p.name}
                  className="buttons"
                  onClick={(e) => handleSelectPlatforms(e)}
                >
                  {p.name}
                </button>
              </ul>
            ))}
          </div>
          <hr />
          <button className="buttons" type="submit">
            Save
          </button>
          <label />
          <Link className="links" to={`/home`}>
            <button className="buttons">Home</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
