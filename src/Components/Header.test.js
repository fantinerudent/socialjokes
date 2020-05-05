import React from "react";
import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom";
import Header from "./Header";

it("renders", () => {
    const { asFragment } = render(<Header/>);
    expect(asFragment()).toMatchSnapshot();
});
