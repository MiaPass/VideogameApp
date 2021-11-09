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
} from "../actions/constans";

const initialState = {
  allGames: [],
  gameDetails: {},
  genres: [],
  platforms: [],
  filteredGames: [],
  sortGames: [],
  newGame: {},
  page: 1,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    /*-------------- GET --------------*/

    case GET_ALL_GAMES:
      return {
        ...state,
        allGames: payload,
        filteredGames: payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        gameDetails: payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: payload,
      };

    /*-------------- SEARCH --------------*/

    case SEARCH:
      return {
        ...state,
        filteredGames: payload,
      };

    /*-------------- SORT --------------*/

    case ORDER_BY_NAME:
      if (payload === "Asc") {
        return {
          ...state,
          sortGames: state.filteredGames.sort((a, b) => {
            return a.name.localeCompare(b.name);
          }),
        };
      }
      if (payload === "Desc") {
        return {
          ...state,
          sortGames: state.filteredGames.sort((a, b) => {
            return b.name.localeCompare(a.name);
          }),
        };
      } else {
        return {
          ...state,
          sortGames: state.allGames,
        };
      }
    case ORDER_BY_RATING:
      if (payload === "Highest to Lowest") {
        return {
          ...state,
          sortGames: state.filteredGames.sort((prev, next) => {
            return next.rating - prev.rating;
          }),
        };
      } else if (payload === "Lowest to Highest") {
        return {
          ...state,
          sortGames: state.filteredGames.sort((prev, next) => {
            return prev.rating - next.rating;
          }),
        };
      } else {
        return {
          ...state,
          sortGames: state.allGames,
        };
      }

    /*-------------- FILTER --------------*/

    case FILTER_BY_OWNED:
      if (payload === "DB") {
        return {
          ...state,
          filteredGames: state.allGames.filter((game) => {
            return typeof game.id !== "number";
          }),
        };
      }
      if (payload === "API") {
        return {
          ...state,
          filteredGames: state.allGames.filter((game) => {
            return typeof game.id === "number";
          }),
        };
      } else {
        return {
          ...state,
          filteredGames: state.allGames,
        };
      }
    case FILTER_BY_GENRE:
      if (payload !== "Default") {
        const maping = state.allGames.map((g) => {
          return { ...g, genres: g.genres.map((e) => e.name) };
        });
        const filtered = maping.filter((e) => {
          return e.genres.includes(payload);
        });
        return {
          ...state,
          filteredGames: filtered,
        };
      } else {
        return {
          ...state,
          filteredGames: state.allGames,
        };
      }

    /*-------------- RESET DETAILS --------------*/

    case RESET_DETAILS:
      return {
        ...state,
        gameDetails: {},
      };

    /*-------------- PATGINATION --------------*/

    case SET_PAGE:
      return {
        ...state,
        page: payload,
      };

    /*-------------- SET DEFAULT --------------*/

    case SET_DEFAULT:
      return {
        ...state,
        filteredGames: state.allGames,
        sortGames: [],
      };

    /*-------------- CREATE --------------*/

    case POST_GAME:
      return {
        ...state,
        filteredGames: payload,
      };

    /*-------------- DEFAULT --------------*/
    default: {
      return state;
    }
  }
}
