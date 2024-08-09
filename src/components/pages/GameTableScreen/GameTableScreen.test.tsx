import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import GameTableScreen from "./GameTableScreen";
import "@testing-library/jest-dom";

// Configura el mock store
const mockStore = configureMockStore(thunk);
const store = mockStore({
  game: {
    poolCards: [{ id: "1", str: "A", value: 1 }],
    state: "revealed_cards",
    players: [
      { id: "1", name: "Laura", rol: ["viwer"], voted: false },
      {
        id: "3",
        name: "Carlos",
        rol: ["player"],
        voted: { id: "3", str: "5", value: 5 },
      },
      {
        id: "100",
        name: "User 1",
        voted: false,
        rolCurrentUser: ["owner"],
      },
    ],
    results: { count: [{ id: "3", str: "5", value: 5 }], avarage: 5 },
  },
  user: {
    id: "100",
    name: "User 1",
    voted: false,
    rolCurrentUser: ["owner"],
  },
});

// Mocks para useModal
const mockToggleModalUserForm = jest.fn();
const mockToggleModalLink = jest.fn();
jest.mock("../../../hooks/useModal", () => () => [
  false,
  mockToggleModalUserForm,
]);

describe("GameTableScreen", () => {
  test("should render the components correctly", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <GameTableScreen />
        </MemoryRouter>
      </Provider>
    );

    const tableAndPlayers = document.querySelector(".game-table-screen");

    expect(tableAndPlayers).toBeInTheDocument();
  });
});
