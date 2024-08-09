import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import TableAndPlayers from "./TableAndPlayers";
import "@testing-library/jest-dom";

// Configuración del store mock
const mockStore = configureMockStore(thunk);

describe("TableAndPlayers", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      game: {
        players: [
          { id: "1", name: "Player 1", voted: false, rol: ["player"] },
          {
            id: "2",
            name: "Player 2",
            voted: { id: "2", str: "5", value: 5 },
            rol: ["player"],
          },
        ],
      },
      user: {
        id: "3",
        name: "Current User",
        voted: false,
        rolCurrentUser: ["viewer"],
      },
    });
  });

  test("should render TableAndPlayers and display element with class .o-table-and-players", () => {
    render(
      <Provider store={store}>
        <TableAndPlayers />
      </Provider>
    );

    // Verifica que el elemento con la clase 'o-table-and-players' está presente en el DOM
    const sectionElement = document.querySelector(".o-table-and-players");
    expect(sectionElement).toBeInTheDocument();
  });
});
