import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../../reducer/reducer";

import App from "../../App";

describe("<Home/>", () => {
  test("Home render with Nav, Filter, Sort and Cards", () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    component.container.querySelector("Nav");
    component.container.querySelector("Filter");
    component.container.querySelector("Cards");
    component.container.querySelector("Sort");
  });

  test("Home redirect to /Create", () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const button = component.getByText("Create");
    fireEvent.click(button);
  });
});
