import axios from "axios";
import {
  GET_ALL_GAMES,
  GET_DETAILS,
  GET_GENRES,
  GET_PLATFORMS,
  SEARCH,
  SET_DEFAULT,
  RESET_DETAILS,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  FILTER_BY_OWNED,
  FILTER_BY_GENRE,
  SET_PAGE,
  POST_GAME,
} from "./constans";

/*-------------- GET --------------*/

export function getAllGames() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/videogames/all")
      .then((res) => {
        dispatch({ type: GET_ALL_GAMES, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        alert("Ups! Something went wrong...");
      });
  };
}

export function getDetails(id) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/videogame?id=${id}`)
      .then((res) => {
        dispatch({ type: GET_DETAILS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        alert("Ups! Something went wrong...");
      });
  };
}

export function getGenres() {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/genres`)
      .then((res) => {
        dispatch({ type: GET_GENRES, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        alert("Ups! Something went wrong...");
      });
  };
}

export function getPlatforms() {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/platforms`)
      .then((res) => {
        dispatch({ type: GET_PLATFORMS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        alert("Ups! Something went wrong...");
      });
  };
}

/*-------------- SEARCH --------------*/

export function searchByName(name) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/videogames?name=${name}`)
      .then((res) => {
        dispatch({ type: SEARCH, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        alert("Ups! Something went wrong...");
      });
  };
}

/*-------------- SORT --------------*/

export function orderByName(payload) {
  return function (dispatch) {
    dispatch({ type: ORDER_BY_NAME, payload: payload });
  };
}

export function orderByRating(payload) {
  return function (dispatch) {
    dispatch({ type: ORDER_BY_RATING, payload: payload });
  };
}

/*-------------- FILTER --------------*/

export function filterByOwned(payload) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY_OWNED, payload: payload });
  };
}

export function filterByGenre(payload) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY_GENRE, payload: payload });
  };
}

/*-------------- DEFAULT --------------*/

export function defaultPage(payload) {
  return function (dispatch) {
    dispatch({ type: SET_DEFAULT, payload: payload });
  };
}

/*-------------- RESET --------------*/

export function resetDetails(payload) {
  return function (dispatch) {
    dispatch({ type: RESET_DETAILS, payload: payload });
  };
}

/*-------------- PAGINATION --------------*/

export function setPage(payload) {
  return function (dispatch) {
    dispatch({ type: SET_PAGE, payload: payload });
  };
}

/*-------------- CREATE GAME --------------*/

export function createGame(form) {
  return function (dispatch) {
    return axios
      .post("http://localhost:3001/videogame", form)
      .then((res) => {
        dispatch({ type: POST_GAME, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        alert("Ups! Something went wrong...");
      });
  };
}
