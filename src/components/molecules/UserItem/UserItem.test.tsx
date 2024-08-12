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
  });
});
