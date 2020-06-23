import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { UserProvider } from "../../Contexts/UserContext";
import { BrowserRouter } from "react-router-dom";

// screen est un objet qui apres un render, permet d'avoir accés à toutes les fonctions de react testing library pr acceder au composant rendu, et à ses fonctions.
//

const userValue = {
  isAdmin: undefined,
  isLogged: false,
  setIsAdmin: jest.fn(),
  setIsLogged: jest.fn(),
  setUser: jest.fn(),
  user: undefined,
};

describe("render header when the user isn't logged", () => {
  it("should display the app name", () => {
    const appName = "Social Jokes";
    render(
      <BrowserRouter>
        <UserProvider value={userValue}>
          <Header />
        </UserProvider>
      </BrowserRouter>
    );
    expect(screen.getByText(appName)).toBeInTheDocument();
  });

  it("should display Login & Register links", () => {
    render(
      <BrowserRouter>
        <UserProvider value={userValue}>
          <Header />
        </UserProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole("link", { name: /Login/i }));
    expect(screen.getByRole("link", { name: /Register/i }));
  });
});

describe("render header when the user IS logged", () => {
  const userLoggedValue = {
    ...userValue,
    isAdmin: false,
    isLogged: true,
    user: {
      pseudonyme: "testing",
    },
  };

  it("should display the user's pseudonyme", () => {
    render(
      <BrowserRouter>
        <UserProvider value={userLoggedValue}>
          <Header />
        </UserProvider>
      </BrowserRouter>
    );
    expect(screen.getByText(/testing/)).toBeInTheDocument();
  });

  it("should display a profile Link", () => {
    render(
      <BrowserRouter>
        <UserProvider value={userLoggedValue}>
          <Header />
        </UserProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole("link", { name: /mon profil/ }));
  });

  it("should log-out the user when clicked on sign-out", () => {
    render(
      <BrowserRouter>
        <UserProvider value={userLoggedValue}>
          <Header />
        </UserProvider>
      </BrowserRouter>
    );
    const signoutSpan = screen.getByText(/Sign-out/);
    fireEvent.click(signoutSpan);
    expect(screen.getByText(/testing/)).not.toBeInTheDocument();
  });
});
