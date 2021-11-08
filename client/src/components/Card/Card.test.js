import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../../reducer/reducer";

import App from "../../App";

describe("<Card/>", () => {
  test("NewGame have a properties", () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/newgame"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    component.getByText("Image");
    component.getByText("Name");
    component.getByText("Genres");
  });

  test("Home redirect to /Details", () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const button1 = component.getByText("Name");
    const button2 = component.getByText("Genres");
    fireEvent.click(button1 || button2);
  });
});
