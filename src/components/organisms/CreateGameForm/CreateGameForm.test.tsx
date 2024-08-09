import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import CreateGameForm from "./CreateGameForm";
import { setOwerRol } from "../../../reducers/user/userSlice";
import { AppDispatch } from "../../../app/store";
import "@testing-library/jest-dom";

// Configura el mock store
const mockStore = configureMockStore(thunk);
const store = mockStore({
  // Estado inicial para el slice 'user' si es necesario
});

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock de useDispatch
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("CreateGameForm", () => {
  test("should render the form with correct elements", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateGameForm />
        </MemoryRouter>
      </Provider>
    );

    // Verifica que los elementos están presentes
    expect(screen.getByLabelText(/Nombra la partida/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Crear partida/i })
    ).toBeInTheDocument();
  });

  test("should handle form input change", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateGameForm />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByLabelText(
      /Nombra la partida/i
    ) as HTMLInputElement;

    // Usa act para manejar el cambio de estado
    await act(async () => {
      fireEvent.change(input, { target: { value: "Nueva Partida" } });
    });

    expect(input.value).toBe("Nueva Partida");
  });

  test("should call dispatch and navigate on form submit", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateGameForm />
        </MemoryRouter>
      </Provider>
    );

    // Completa el formulario
    const input = screen.getByLabelText(
      /Nombra la partida/i
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, { target: { value: "Nueva Partida" } });
    });

    // Simula el envío del formulario
    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /Crear partida/i }));
    });

    // Verifica que dispatch y navigate hayan sido llamados
    expect(mockDispatch).toHaveBeenCalledWith(setOwerRol());
    expect(mockNavigate).toHaveBeenCalledWith("/game/Nueva Partida");
  });
});
