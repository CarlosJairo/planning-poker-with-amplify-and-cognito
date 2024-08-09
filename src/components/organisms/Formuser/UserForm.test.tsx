import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import UserForm from "./FormUser";
import "@testing-library/jest-dom";

// Configura el mock store sin thunk
const mockStore = configureMockStore();
const store = mockStore({
  user: { rolCurrentUser: ["player"] },
});

// Mock de useDispatch
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) =>
    selector({ user: { rolCurrentUser: ["player"] } }),
}));

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("UserForm", () => {
  test("should render the form with correct elements", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserForm toggleModalUserForm={() => {}} />
        </MemoryRouter>
      </Provider>
    );

    // Verifica que los elementos están presentes
    expect(screen.getByLabelText(/Tu nombre/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Continuar/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Jugador/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Espectador/i)).toBeInTheDocument();
  });

  test("should handle form input change and radio button selection", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserForm toggleModalUserForm={() => {}} />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByLabelText(/Tu nombre/i) as HTMLInputElement;
    const radioPlayer = screen.getByLabelText(/Jugador/i) as HTMLInputElement;
    const radioViewer = screen.getByLabelText(
      /Espectador/i
    ) as HTMLInputElement;

    // Usa act para manejar el cambio de estado
    await act(async () => {
      fireEvent.change(input, { target: { value: "Carlos" } });
    });

    // Verifica que el valor del input cambió
    expect(input.value).toBe("Carlos");

    // Cambia la selección del radio button
    await act(async () => {
      fireEvent.click(radioViewer);
    });

    expect(radioViewer.checked).toBe(true);
    expect(radioPlayer.checked).toBe(false);
  });
});
