import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import SelectPoolCards from "./SelectPoolCards";
import { changePoolCards } from "../../../reducers/game/gameSlice";

// Configuración del store simulado sin thunk
const mockStore = configureStore();

describe("SelectPoolCards", () => {
  let store: any;

  beforeEach(() => {
    // Configuración del estado inicial del store para el test
    store = mockStore({
      game: {
        allPoolCards: {
          fibonacci: [{ id: "1", str: "1", value: 1 }],
          modifiedFibonacci: [{ id: "2", str: "2", value: 2 }],
        },
        selectedCards: [],
      },
      user: {
        rolCurrentUser: ["owner"],
      },
    });

    // Configuración de la acción esperada
    store.dispatch = jest.fn();
  });

  it("should render select element when user is owner and no cards are selected", () => {
    render(
      <Provider store={store}>
        <SelectPoolCards />
      </Provider>
    );

    // Verifica que el elemento <select> está presente
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("should dispatch changePoolCards action when selection changes", () => {
    render(
      <Provider store={store}>
        <SelectPoolCards />
      </Provider>
    );

    // Simula el cambio en el <select>
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "modifiedFibonacci" },
    });

    // Verifica que la acción changePoolCards ha sido despachada
    expect(store.dispatch).toHaveBeenCalledWith(
      changePoolCards("modifiedFibonacci")
    );
  });

  it("should not render select element if user is not owner", () => {
    store = mockStore({
      game: {
        allPoolCards: {
          fibonacci: [{ id: "1", str: "1", value: 1 }],
          modifiedFibonacci: [{ id: "2", str: "2", value: 2 }],
        },
        selectedCards: [],
      },
      user: {
        rolCurrentUser: ["player"], // Cambia el rol a algo que no sea "owner"
      },
    });

    render(
      <Provider store={store}>
        <SelectPoolCards />
      </Provider>
    );

    // Verifica que el elemento <select> no está presente
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });
});
