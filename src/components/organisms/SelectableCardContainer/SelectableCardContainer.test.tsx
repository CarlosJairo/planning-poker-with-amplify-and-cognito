import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import SelectableCardContainer from "./SelectableCardContainer";
import { selectCard, everyoneVoted } from "../../../reducers/game/gameSlice";
import { voteCard } from "../../../reducers/user/userSlice";
import "@testing-library/jest-dom";

// Configuración del store mock
const mockStore = configureMockStore(thunk);

describe("SelectableCardContainer", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      user: { rolCurrentUser: ["player"], id: "123" },
      game: {
        poolCards: [
          { id: "1", str: "1", value: 1 },
          { id: "2", str: "2", value: 2 },
        ],
      },
    });
  });

  test("should render SelectableCardContainer and display cards", () => {
    render(
      <Provider store={store}>
        <SelectableCardContainer poolCards={store.getState().game.poolCards} />
      </Provider>
    );

    // Verifica que el título y las cartas se muestran
    expect(screen.getByText(/Elige una carta/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });

  test("should disable cards after a card is selected", () => {
    render(
      <Provider store={store}>
        <SelectableCardContainer poolCards={store.getState().game.poolCards} />
      </Provider>
    );

    const card = screen.getByText(/1/i);

    // Simula el click en la carta
    fireEvent.click(card);

    // Verifica que se hayan despachado las acciones esperadas
    const actions = store.getActions();
    expect(actions).toContainEqual(
      selectCard({ card: { id: "1", str: "1", value: 1 }, id: "123" })
    );
    expect(actions).toContainEqual(voteCard({ id: "1", str: "1", value: 1 }));
    expect(actions).toContainEqual(everyoneVoted());
  });

  test("should render 'No hay cartas' message when no cards are available", () => {
    store = mockStore({
      user: { rolCurrentUser: ["player"], id: "123" },
      game: { poolCards: [] },
    });

    render(
      <Provider store={store}>
        <SelectableCardContainer poolCards={store.getState().game.poolCards} />
      </Provider>
    );

    // Verifica el mensaje cuando no hay cartas
    expect(screen.getByText(/No hay cartas/i)).toBeInTheDocument();
  });
});
