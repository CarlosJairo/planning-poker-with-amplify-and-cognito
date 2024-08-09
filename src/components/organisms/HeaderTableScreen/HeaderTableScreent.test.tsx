import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import HeaderTableScreen from "./HeaderTableScreen";
import { RootState } from "../../../app/store";
import gameSlice from "../../../reducers/game/gameSlice";
import userSlice from "../../../reducers/user/userSlice";

// Mock store setup
const store = configureStore({
  reducer: {
    game: gameSlice,
    user: userSlice,
  },
  preloadedState: {
    game: { gameName: "Test Game" },
    user: { name: "John Doe" },
  } as RootState,
});

describe("HeaderTableScreen", () => {
  test("renders HeaderTableScreen component", () => {
    // Mock function for toggleModalLink
    const mockToggleModalLink = jest.fn();

    render(
      <Provider store={store}>
        <HeaderTableScreen toggleModalLink={mockToggleModalLink} />
      </Provider>
    );

    // Check if the game name and user name are rendered
    const gameNameElement = screen.getByText(/Test Game/i);
    // const userNameElement = screen.getByText(/J/i);
    const userNameElement = document.querySelector(".a-user-logo");
    const inviteButton = document.querySelector(".o-header-game__invite");

    expect(gameNameElement).toBeInTheDocument();
    expect(userNameElement).toBeInTheDocument();
    expect(inviteButton).toBeInTheDocument();
  });

  test("calls toggleModalLink when invite button is clicked", () => {
    const mockToggleModalLink = jest.fn();

    render(
      <Provider store={store}>
        <HeaderTableScreen toggleModalLink={mockToggleModalLink} />
      </Provider>
    );

    const inviteButton = document.querySelector(".o-header-game__invite");
    fireEvent.click(inviteButton);

    expect(mockToggleModalLink).toHaveBeenCalledTimes(1);
  });
});
