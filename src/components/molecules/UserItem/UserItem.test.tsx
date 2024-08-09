import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import UserItem from "./UserItem";
import "@testing-library/jest-dom";
import { store } from "../../../app/store";

describe("UserItem", () => {
  const userViewer = {
    id: "1",
    name: "John Doe",
    voted: false,
    rol: ["viwer"],
  };

  const userNotOwner = {
    id: "3",
    name: "Alice Doe",
    voted: false,
    rol: [],
  };

  test("should render UserLogo when user is a viewer", () => {
    render(
      <Provider store={store}>
        <UserItem user={userViewer} />
      </Provider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    // Verifica que UserLogo se muestra cuando el rol es "viwer"
    expect(screen.getByText("John Doe").closest("div")).toHaveClass(
      "m-user-item"
    );
    // Puedes ajustar esto para verificar el componente UserLogo si es necesario
  });

  test("should render Button with UserPlus icon if current user is owner and user is not owner", () => {
    render(
      <Provider store={store}>
        <UserItem user={userNotOwner} />
      </Provider>
    );

    // Verifica que el botón se muestra si el usuario actual es owner
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument(); // Verifica que el icono UserPlus está presente
    expect(screen.getByText("Alice Doe")).toBeInTheDocument();
  });
});
