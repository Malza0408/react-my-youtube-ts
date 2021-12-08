import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import create from "./redux/create";

const store = create();

const setup = () => {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe("App", () => {
  it("renders App", () => {
    const element = setup();
    expect(element).toMatchSnapshot();
  });

  it("Youtube title 이 화면에 표시된다.", () => {
    setup();
    const title = screen.getByText(/youtube/i);
    expect(title).toBeInTheDocument();
  });

  it("PlaceHolder의 값은 '검색' 이다.", () => {
    setup();
    const placeholder = screen.getByPlaceholderText(/검색/i);
    expect(placeholder).toBeInTheDocument();
  });

  it("로그인 text 가 화면에 표시된다.", () => {
    setup();
    const search = screen.getByText(/로그인/i);
    expect(search).toBeInTheDocument();
  });
});
